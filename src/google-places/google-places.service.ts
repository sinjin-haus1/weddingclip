import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { VendorCategory } from '../vendors/vendor.schema';

export interface GooglePlaceResult {
  placeId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip?: string;
  lat: number;
  lng: number;
  rating?: number;
  reviewCount?: number;
  photos?: string[];
  website?: string;
  phone?: string;
  category: VendorCategory;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}

export interface GooglePlaceReview {
  authorName: string;
  rating: number;
  text: string;
  time: string;
  profilePhotoUrl?: string;
}

export interface DiscoverVendorsResult {
  vendors: GooglePlaceResult[];
  nextPageToken?: string;
  totalResults: number;
}

@Injectable()
export class GooglePlacesService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://maps.googleapis.com/maps/api/place';

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('GOOGLE_PLACES_API_KEY', '');
  }

  /**
   * Discover wedding vendors by location and category using Google Places Text Search
   */
  async discoverVendors(
    location: string, // e.g., "Los Angeles, CA"
    category: VendorCategory,
    radius: number = 25000, // meters (max 50000)
    keyword?: string,
    pageToken?: string,
  ): Promise<DiscoverVendorsResult> {
    const categoryKeyword = this.getCategoryKeyword(category);
    const query = `${categoryKeyword} wedding ${location}`;

    const params: Record<string, string> = {
      query,
      key: this.apiKey,
    };

    if (pageToken) {
      params.pagetoken = pageToken;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/textsearch/json`, { params });

      if (response.data.status !== 'OK' && response.data.status !== 'ZERO_RESULTS') {
        console.error('Google Places API error:', response.data.status, response.data);
        return { vendors: [], totalResults: 0 };
      }

      const vendors: GooglePlaceResult[] = (response.data.results || []).map(
        (place: GooglePlace.GeocodingResult) => this.mapPlaceToVendor(place, category),
      );

      return {
        vendors,
        nextPageToken: response.data.next_page_token,
        totalResults: vendors.length,
      };
    } catch (error) {
      console.error('Failed to discover vendors:', error);
      return { vendors: [], totalResults: 0 };
    }
  }

  /**
   * Get detailed place info including reviews
   */
  async getPlaceDetails(placeId: string): Promise<{ place: GooglePlaceResult; reviews: GooglePlaceReview[] } | null> {
    try {
      const detailsResponse = await axios.get(`${this.baseUrl}/details/json`, {
        params: {
          place_id: placeId,
          fields: 'place_id,name,formatted_address,geometry,rating,user_ratings_total,photos,website,formatted_phone_number,reviews',
          key: this.apiKey,
        },
      });

      if (detailsResponse.data.status !== 'OK') {
        console.error('Google Places Details API error:', detailsResponse.data.status);
        return null;
      }

      const place = detailsResponse.data.result;
      const mappedPlace = this.mapPlaceDetailsToVendor(place);

      const reviews: GooglePlaceReview[] = (place.reviews || []).map((r: GooglePlace.Review) => ({
        authorName: r.author_name,
        rating: r.rating,
        text: r.text,
        time: r.time,
        profilePhotoUrl: r.profile_photo_url,
      }));

      return { place: mappedPlace, reviews };
    } catch (error) {
      console.error('Failed to get place details:', error);
      return null;
    }
  }

  /**
   * Get reviews for a specific place
   */
  async getPlaceReviews(placeId: string): Promise<GooglePlaceReview[]> {
    const details = await this.getPlaceDetails(placeId);
    return details?.reviews || [];
  }

  /**
   * Search nearby wedding vendors
   */
  async searchNearby(
    lat: number,
    lng: number,
    category: VendorCategory,
    radius: number = 25000,
  ): Promise<DiscoverVendorsResult> {
    const categoryKeyword = this.getCategoryKeyword(category);
    const keyword = `${categoryKeyword} wedding vendor`;

    try {
      const response = await axios.get(`${this.baseUrl}/nearbysearch/json`, {
        params: {
          location: `${lat},${lng}`,
          radius,
          keyword,
          type: 'store',
          key: this.apiKey,
        },
      });

      if (response.data.status !== 'OK' && response.data.status !== 'ZERO_RESULTS') {
        console.error('Google Places Nearby API error:', response.data.status);
        return { vendors: [], totalResults: 0 };
      }

      const vendors: GooglePlaceResult[] = (response.data.results || []).map(
        (place: GooglePlace.GeocodingResult) => this.mapPlaceToVendor(place, category),
      );

      return { vendors, totalResults: vendors.length };
    } catch (error) {
      console.error('Failed to search nearby:', error);
      return { vendors: [], totalResults: 0 };
    }
  }

  private mapPlaceToVendor(place: GooglePlace.GeocodingResult, category: VendorCategory): GooglePlaceResult {
    // Parse address components
    const address = place.formatted_address || '';
    const parts = address.split(',').map((p: string) => p.trim());
    const city = parts.length > 1 ? parts[parts.length - 2] : parts[0];
    const stateZip = parts.length > 1 ? parts[parts.length - 1] : '';
    const stateMatch = stateZip.match(/^([A-Z]{2})\s*(.*)?$/);
    const state = stateMatch ? stateMatch[1] : '';
    const zip = stateMatch && stateMatch[2] ? stateMatch[2].trim() : undefined;

    // Get photo URLs
    const photos = (place.photos || [])
      .slice(0, 3)
      .map((photo: GooglePlace.Photo) =>
        `${this.baseUrl}/photo?maxwidth=400&photo_reference=${photo.photo_reference}&key=${this.apiKey}`,
      );

    return {
      placeId: place.place_id,
      name: place.name,
      address,
      city,
      state,
      zip,
      lat: place.geometry?.location?.lat || 0,
      lng: place.geometry?.location?.lng || 0,
      rating: place.rating,
      reviewCount: place.user_ratings_total,
      photos,
      website: place.website,
      phone: place.formatted_phone_number,
      category,
      raw: place,
    };
  }

  private mapPlaceDetailsToVendor(place: GooglePlace.PlaceDetailsResult): GooglePlaceResult {
    const address = place.formatted_address || '';
    const parts = address.split(',').map((p: string) => p.trim());
    const city = parts.length > 1 ? parts[parts.length - 2] : parts[0];
    const stateZip = parts.length > 1 ? parts[parts.length - 1] : '';
    const stateMatch = stateZip.match(/^([A-Z]{2})\s*(.*)?$/);
    const state = stateMatch ? stateMatch[1] : '';
    const zip = stateMatch && stateMatch[2] ? stateMatch[2].trim() : undefined;

    const photos = (place.photos || [])
      .slice(0, 3)
      .map((photo: GooglePlace.Photo) =>
        `${this.baseUrl}/photo?maxwidth=400&photo_reference=${photo.photo_reference}&key=${this.apiKey}`,
      );

    return {
      placeId: place.place_id,
      name: place.name,
      address,
      city,
      state,
      zip,
      lat: place.geometry?.location?.lat || 0,
      lng: place.geometry?.location?.lng || 0,
      rating: place.rating,
      reviewCount: place.user_ratings_total,
      photos,
      website: place.website,
      phone: place.formatted_phone_number,
      category: VendorCategory.PHOTOGRAPHER, // Will be determined by the caller
      raw: place,
    };
  }

  private getCategoryKeyword(category: VendorCategory): string {
    const keywords: Record<VendorCategory, string> = {
      [VendorCategory.PHOTOGRAPHER]: 'photographer',
      [VendorCategory.DJ]: 'DJ',
      [VendorCategory.VENUE]: 'wedding venue',
      [VendorCategory.OFFICIANT]: 'wedding officiant',
      [VendorCategory.CATERER]: 'caterer',
      [VendorCategory.FLORIST]: 'florist',
    };
    return keywords[category] || 'wedding vendor';
  }
}

// Type definitions for Google Places API responses
declare namespace GooglePlace {
  interface GeocodingResult {
    place_id: string;
    name: string;
    formatted_address?: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    rating?: number;
    user_ratings_total?: number;
    photos?: Photo[];
    website?: string;
    formatted_phone_number?: string;
  }

  interface PlaceDetailsResult extends GeocodingResult {
    reviews?: Review[];
  }

  interface Photo {
    photo_reference: string;
    height: number;
    width: number;
  }

  interface Review {
    author_name: string;
    rating: number;
    text: string;
    time: string;
    profile_photo_url?: string;
  }
}
