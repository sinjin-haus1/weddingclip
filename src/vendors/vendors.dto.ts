import { InputType, Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { VendorCategory } from './vendor.schema';

@InputType()
export class VendorLocationInput {
  @Field()
  @IsString()
  city: string;

  @Field()
  @IsString()
  state: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  zip?: string;

  @Field({ nullable: true })
  @IsOptional()
  lat?: number;

  @Field({ nullable: true })
  @IsOptional()
  lng?: number;
}

@InputType()
export class SocialAccountsInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  instagram?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  facebook?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  tiktok?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  youtube?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  website?: string;
}

@InputType()
export class CreateVendorInput {
  @Field()
  @IsString()
  name: string;

  @Field(() => VendorCategory)
  @IsEnum(VendorCategory)
  category: VendorCategory;

  @Field(() => VendorLocationInput)
  @ValidateNested()
  @Type(() => VendorLocationInput)
  location: VendorLocationInput;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  googlePlaceId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  website?: string;

  @Field(() => SocialAccountsInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => SocialAccountsInput)
  socialAccounts?: SocialAccountsInput;
}

@InputType()
export class UpdateVendorInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field(() => VendorCategory, { nullable: true })
  @IsOptional()
  @IsEnum(VendorCategory)
  category?: VendorCategory;

  @Field(() => VendorLocationInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => VendorLocationInput)
  location?: VendorLocationInput;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  googlePlaceId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  website?: string;

  @Field(() => SocialAccountsInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => SocialAccountsInput)
  socialAccounts?: SocialAccountsInput;
}

@InputType()
export class DiscoverVendorsInput {
  @Field()
  @IsString()
  location: string; // e.g., "Los Angeles, CA"

  @Field(() => VendorCategory)
  @IsEnum(VendorCategory)
  category: VendorCategory;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  radius?: number; // meters, max 50000

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  keyword?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  pageToken?: string;
}

@ObjectType()
export class GooglePlaceVendor {
  @Field()
  placeId: string;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field({ nullable: true })
  zip?: string;

  @Field(() => Int)
  lat: number;

  @Field(() => Int)
  lng: number;

  @Field(() => Int, { nullable: true })
  rating?: number;

  @Field(() => Int, { nullable: true })
  reviewCount?: number;

  @Field(() => [String], { nullable: true })
  photos?: string[];

  @Field({ nullable: true })
  website?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field(() => VendorCategory)
  category: VendorCategory;
}

@ObjectType()
export class DiscoverVendorsResult {
  @Field(() => [GooglePlaceVendor])
  vendors: GooglePlaceVendor[];

  @Field({ nullable: true })
  nextPageToken?: string;

  @Field(() => Int)
  totalResults: number;
}
