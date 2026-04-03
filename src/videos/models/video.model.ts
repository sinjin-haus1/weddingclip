import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field, ID, Int, registerEnumType } from '@nestjs/graphql';
import { Review } from '../../reviews/models/review.model';

export enum VideoStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum TemplateStyle {
  ELEGANT = 'elegant',       // Soft cream/rose gold, cursive font
  RUSTIC = 'rustic',         // Kraft paper aesthetic, warm tones
  MODERN_MINIMAL = 'modern_minimal',  // Clean white, sans-serif
  ROMANTIC = 'romantic',     // Soft pink, floral accents
  CLASSIC = 'classic',       // Black/gold, timeless feel
}

registerEnumType(VideoStatus, { name: 'VideoStatus' });
registerEnumType(TemplateStyle, { name: 'TemplateStyle' });

@Schema()
@ObjectType()
export class SocialPostUrl {
  @Field()
  platform: string;

  @Field({ nullable: true })
  postId?: string;

  @Field({ nullable: true })
  postUrl?: string;

  @Field()
  success: boolean;

  @Field({ nullable: true })
  error?: string;
}

@Schema({ timestamps: true })
@ObjectType()
export class Video {
  @Field(() => ID)
  _id: string;

  @Prop({ type: Types.ObjectId, ref: 'Vendor', required: true })
  @Field(() => ID)
  vendorId: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Review' }] })
  @Field(() => [ID])
  reviewIds: string[];

  @Prop({ enum: VideoStatus, default: VideoStatus.PENDING })
  @Field(() => VideoStatus)
  status: VideoStatus;

  @Prop()
  @Field({ nullable: true })
  outputUrl?: string;

  @Prop({ enum: TemplateStyle, default: TemplateStyle.ELEGANT })
  @Field(() => TemplateStyle)
  templateStyle: TemplateStyle;

  @Prop({ default: 30 })
  @Field(() => Int)
  duration: number;

  @Prop()
  @Field(() => [SocialPostUrl], { nullable: true })
  socialPostUrls?: SocialPostUrl[];

  @Prop()
  @Field({ nullable: true })
  errorMessage?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type VideoDocument = Video & Document;
export const VideoSchema = SchemaFactory.createForClass(Video);
