import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vendor, VendorDocument, VendorCategory, VendorLocation } from './vendor.schema';
import { CreateVendorInput, UpdateVendorInput } from './vendors.dto';
import { GooglePlacesService, GooglePlaceResult, DiscoverVendorsResult } from '../google-places/google-places.service';

@Injectable()
export class VendorsService {
  constructor(
    @InjectModel(Vendor.name) private vendorModel: Model<VendorDocument>,
    private googlePlacesService: GooglePlacesService,
  ) {}

  async findAll(category?: VendorCategory): Promise<Vendor[]> {
    const filter = category ? { category } : {};
    return this.vendorModel.find(filter).exec();
  }

  async findOne(id: string): Promise<Vendor> {
    const vendor = await this.vendorModel.findById(id).exec();
    if (!vendor) {
      throw new NotFoundException(`Vendor with id "${id}" not found`);
    }
    return vendor;
  }

  async findByGooglePlaceId(googlePlaceId: string): Promise<Vendor | null> {
    return this.vendorModel.findOne({ googlePlaceId }).exec();
  }

  async create(input: CreateVendorInput): Promise<Vendor> {
    const created = new this.vendorModel(input);
    return created.save();
  }

  async update(id: string, input: UpdateVendorInput): Promise<Vendor> {
    const updated = await this.vendorModel.findByIdAndUpdate(id, input, { new: true }).exec();
    if (!updated) {
      throw new NotFoundException(`Vendor with id "${id}" not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.vendorModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Vendor with id "${id}" not found`);
    }
    return true;
  }

  /**
   * Discover wedding vendors from Google Places API
   */
  async discoverVendors(
    location: string,
    category: VendorCategory,
    radius?: number,
    keyword?: string,
    pageToken?: string,
  ): Promise<DiscoverVendorsResult> {
    return this.googlePlacesService.discoverVendors(location, category, radius, keyword, pageToken);
  }

  /**
   * Import a vendor from Google Places into our database
   */
  async importFromGooglePlace(place: GooglePlaceResult): Promise<Vendor> {
    // Check if vendor already exists
    const existing = await this.findByGooglePlaceId(place.placeId);
    if (existing) {
      // Update existing vendor
      return this.update(existing.id, {
        name: place.name,
        location: {
          city: place.city,
          state: place.state,
          zip: place.zip,
          lat: place.lat,
          lng: place.lng,
        } as VendorLocation,
        logoUrl: place.photos?.[0],
        website: place.website,
      });
    }

    // Create new vendor
    return this.create({
      name: place.name,
      category: place.category,
      googlePlaceId: place.placeId,
      location: {
        city: place.city,
        state: place.state,
        zip: place.zip,
        lat: place.lat,
        lng: place.lng,
      },
      logoUrl: place.photos?.[0],
      website: place.website,
      socialAccounts: {
        website: place.website,
      },
    });
  }

  /**
   * Search nearby vendors
   */
  async searchNearby(
    lat: number,
    lng: number,
    category: VendorCategory,
    radius?: number,
  ): Promise<DiscoverVendorsResult> {
    return this.googlePlacesService.searchNearby(lat, lng, category, radius);
  }
}
