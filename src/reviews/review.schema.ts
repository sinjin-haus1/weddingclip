import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { Vendor } from '../vendors/vendor.schema';

@Schema({ timestamps: true })
@ObjectType()
export class Review {
  @Field(() => ID)
  id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Vendor.name, required: true })
  @Field(() => ID)
  vendorId: string;

  @Prop({ required: true })
  @Field()
  reviewerName: string;

  @Prop({ required: true, min: 1, max: 5 })
  @Field(() => Int)
  rating: number;

  @Prop({ required: true })
  @Field()
  text: string;

  @Prop({ required: true })
  @Field()
  date: Date;

  @Prop({ default: null })
  @Field(() => Float, { nullable: true })
  sentimentScore?: number;

  @Prop({ default: false })
  @Field()
  usedInVideo: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type ReviewDocument = Review & Document;
export const ReviewSchema = SchemaFactory.createForClass(Review);
