import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { Vendor, VendorCategory } from './vendor.schema';
import { VendorsService } from './vendors.service';
import {
  CreateVendorInput,
  UpdateVendorInput,
  DiscoverVendorsInput,
  DiscoverVendorsResult,
  GooglePlaceVendor,
} from './vendors.dto';
import { GooglePlaceResult } from '../google-places/google-places.service';

@Resolver(() => Vendor)
export class VendorsResolver {
  constructor(private readonly vendorsService: VendorsService) {}

  @Query(() => [Vendor], { name: 'vendors' })
  async findAll(
    @Args('category', { type: () => VendorCategory, nullable: true })
    category?: VendorCategory,
  ): Promise<Vendor[]> {
    return this.vendorsService.findAll(category);
  }

  @Query(() => Vendor, { name: 'vendor' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<Vendor> {
    return this.vendorsService.findOne(id);
  }

  @Query(() => DiscoverVendorsResult, { name: 'discoverVendors' })
  async discoverVendors(
    @Args('input') input: DiscoverVendorsInput,
  ): Promise<DiscoverVendorsResult> {
    const result = await this.vendorsService.discoverVendors(
      input.location,
      input.category,
      input.radius,
      input.keyword,
      input.pageToken,
    );
    return {
      vendors: result.vendors.map((v) => this.mapGooglePlaceToDto(v)),
      nextPageToken: result.nextPageToken,
      totalResults: result.totalResults,
    };
  }

  @Query(() => DiscoverVendorsResult, { name: 'searchNearbyVendors' })
  async searchNearbyVendors(
    @Args('lat', { type: () => Int }) lat: number,
    @Args('lng', { type: () => Int }) lng: number,
    @Args('category', { type: () => VendorCategory }) category: VendorCategory,
    @Args('radius', { type: () => Int, nullable: true }) radius?: number,
  ): Promise<DiscoverVendorsResult> {
    const result = await this.vendorsService.searchNearby(lat, lng, category, radius);
    return {
      vendors: result.vendors.map((v) => this.mapGooglePlaceToDto(v)),
      nextPageToken: undefined,
      totalResults: result.totalResults,
    };
  }

  @Mutation(() => Vendor)
  async createVendor(@Args('input') input: CreateVendorInput): Promise<Vendor> {
    return this.vendorsService.create(input);
  }

  @Mutation(() => Vendor)
  async importVendorFromGooglePlace(
    @Args('placeId') placeId: string,
    @Args('category', { type: () => VendorCategory }) category: VendorCategory,
  ): Promise<Vendor> {
    const details = await this.vendorsService['googlePlacesService'].getPlaceDetails(placeId);
    if (!details) {
      throw new Error(`Could not find Google Place with ID: ${placeId}`);
    }
    const place = { ...details.place, category };
    return this.vendorsService.importFromGooglePlace(place);
  }

  @Mutation(() => Vendor)
  async updateVendor(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateVendorInput,
  ): Promise<Vendor> {
    return this.vendorsService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteVendor(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.vendorsService.remove(id);
  }

  private mapGooglePlaceToDto(place: GooglePlaceResult): GooglePlaceVendor {
    return {
      placeId: place.placeId,
      name: place.name,
      address: place.address,
      city: place.city,
      state: place.state,
      zip: place.zip,
      lat: place.lat,
      lng: place.lng,
      rating: place.rating,
      reviewCount: place.reviewCount,
      photos: place.photos,
      website: place.website,
      phone: place.phone,
      category: place.category,
    };
  }
}
