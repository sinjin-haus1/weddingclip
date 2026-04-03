import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Schema()
@ObjectType()
export class SocialAccount {
  @Field(() => ID)
  _id: string;

  @Prop({ type: Types.ObjectId, ref: 'Vendor', required: true })
  @Field(() => ID)
  vendorId: string;

  @Prop({ required: true })
  @Field()
  platform: string; // 'tiktok' | 'instagram' | 'youtube'

  @Prop()
  @Field({ nullable: true })
  accessToken?: string;

  @Prop()
  @Field({ nullable: true })
  refreshToken?: string;

  @Prop()
  @Field({ nullable: true })
  expiresAt?: Date;

  @Prop()
  @Field({ nullable: true })
  accountName?: string;

  @Field()
  createdAt: Date;
}

export type SocialAccountDocument = SocialAccount & Document;
export const SocialAccountSchema = SchemaFactory.createForClass(SocialAccount);
