import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

export enum VendorCategory {
  PHOTOGRAPHER = 'PHOTOGRAPHER',
  DJ = 'DJ',
  VENUE = 'VENUE',
  OFFICIANT = 'OFFICIANT',
  CATERER = 'CATERER',
  FLORIST = 'FLORIST',
}

registerEnumType(VendorCategory, { name: 'VendorCategory' });

@ObjectType()
export class SocialAccounts {
  @Field({ nullable: true })
  instagram?: string;

  @Field({ nullable: true })
  facebook?: string;

  @Field({ nullable: true })
  tiktok?: string;

  @Field({ nullable: true })
  youtube?: string;

  @Field({ nullable: true })
  website?: string;
}

@Schema({ _id: false })
@ObjectType()
export class VendorLocation {
  @Prop({ required: true })
  @Field()
  city: string;

  @Prop({ required: true })
  @Field()
  state: string;

  @Prop()
  @Field({ nullable: true })
  zip?: string;

  @Prop()
  @Field({ nullable: true })
  lat?: number;

  @Prop()
  @Field({ nullable: true })
  lng?: number;
}

@Schema({ timestamps: true })
@ObjectType()
export class Vendor {
  @Field(() => ID)
  id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true, enum: VendorCategory })
  @Field(() => VendorCategory)
  category: VendorCategory;

  @Prop({ type: VendorLocation, required: true })
  @Field(() => VendorLocation)
  location: VendorLocation;

  @Prop()
  @Field({ nullable: true })
  googlePlaceId?: string;

  @Prop()
  @Field({ nullable: true })
  logoUrl?: string;

  @Prop()
  @Field({ nullable: true })
  website?: string;

  @Prop({ type: SocialAccounts })
  @Field(() => SocialAccounts, { nullable: true })
  socialAccounts?: SocialAccounts;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type VendorDocument = Vendor & Document;
export const VendorSchema = SchemaFactory.createForClass(Vendor);
