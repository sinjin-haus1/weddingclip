import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

export enum VendorCategory {
  PHOTOGRAPHER = 'photographer',
  VIDEOGRAPHER = 'videographer',
  DJ = 'dj',
  VENUE = 'venue',
  OFFICIANT = 'officiant',
  CATERER = 'caterer',
  FLORIST = 'florist',
  HAIR_MAKEUP = 'hair_makeup',
  RENTALS = 'rentals',
  PLANNER = 'planner',
}

registerEnumType(VendorCategory, { name: 'VendorCategory' });

@ObjectType()
export class SocialAccounts {
  @Field(() => String, { nullable: true })
  tiktok?: string;

  @Field(() => String, { nullable: true })
  instagram?: string;

  @Field(() => String, { nullable: true })
  youtube?: string;
}

@Schema({ timestamps: true })
@ObjectType()
export class Vendor {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true, enum: VendorCategory })
  @Field(() => VendorCategory)
  category: VendorCategory;

  @Prop({ required: true })
  @Field()
  location: string;

  @Prop()
  @Field({ nullable: true })
  googlePlaceId?: string;

  @Prop()
  @Field({ nullable: true })
  logoUrl?: string;

  @Prop()
  @Field({ nullable: true })
  website?: string;

  @Field(() => SocialAccounts, { nullable: true })
  socialAccounts?: SocialAccounts;

  @Prop({ default: true })
  @Field()
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type VendorDocument = Vendor & Document;
export const VendorSchema = SchemaFactory.createForClass(Vendor);
