import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Vendor, VendorCategory } from './vendor.schema';
import { VendorsService } from './vendors.service';
import { CreateVendorInput, UpdateVendorInput } from './vendors.dto';

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

  @Mutation(() => Vendor)
  async createVendor(@Args('input') input: CreateVendorInput): Promise<Vendor> {
    return this.vendorsService.create(input);
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
}
