import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';

@Schema()
@ObjectType()
export class Review {
  @Field(() => ID)
  _id: string;

  @Prop({ type: Types.ObjectId, ref: 'Vendor', required: true })
  @Field(() => ID)
  vendorId: string;

  @Prop()
  @Field({ nullable: true })
  reviewerName?: string;

  @Prop({ required: true })
  @Field(() => Int)
  rating: number;

  @Prop({ required: true })
  @Field()
  text: string;

  @Prop()
  @Field({ nullable: true })
  reviewDate?: Date;

  @Prop()
  @Field({ nullable: true })
  googleReviewId?: string;

  @Prop({ default: 0.0 })
  @Field(() => Float)
  sentimentScore: number;

  @Prop({ default: false })
  @Field()
  usedInVideo: boolean;

  @Field()
  createdAt: Date;
}

export type ReviewDocument = Review & Document;
export const ReviewSchema = SchemaFactory.createForClass(Review);
