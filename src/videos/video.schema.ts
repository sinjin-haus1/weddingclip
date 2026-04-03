import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ObjectType, Field, ID, Int, registerEnumType } from '@nestjs/graphql';
import { Review } from '../reviews/review.schema';

export enum VideoStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

registerEnumType(VideoStatus, { name: 'VideoStatus' });

export enum TemplateStyle {
  ELEGANT = 'ELEGANT',
  RUSTIC = 'RUSTIC',
  MODERN = 'MODERN',
  CLASSIC = 'CLASSIC',
  FLORAL = 'FLORAL',
}

registerEnumType(TemplateStyle, { name: 'TemplateStyle' });

@Schema({ timestamps: true })
@ObjectType()
export class SocialPostUrl {
  @Prop({ required: true })
  @Field()
  platform: string;

  @Prop({ required: true })
  @Field()
  url: string;

  @Prop({ required: true })
  @Field()
  postedAt: Date;

  @Prop()
  @Field({ nullable: true })
  postId?: string;
}

@Schema()
@ObjectType()
export class Video {
  @Field(() => ID)
  id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  @Field(() => ID)
  vendorId: string;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Review.name, default: [] })
  @Field(() => [ID])
  reviewIds: string[];

  @Prop({ required: true, enum: VideoStatus, default: VideoStatus.PENDING })
  @Field(() => VideoStatus)
  status: VideoStatus;

  @Prop()
  @Field({ nullable: true })
  outputUrl?: string;

  @Prop({ enum: TemplateStyle, default: TemplateStyle.ELEGANT })
  @Field(() => TemplateStyle)
  templateStyle: TemplateStyle;

  @Prop({ default: 15 })
  @Field(() => Int)
  duration: number;

  @Prop({ type: [SocialPostUrl], default: [] })
  @Field(() => [SocialPostUrl])
  socialPostUrls: SocialPostUrl[];

  @Prop()
  @Field({ nullable: true })
  error?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type VideoDocument = Video & Document;
export const VideoSchema = SchemaFactory.createForClass(Video);
