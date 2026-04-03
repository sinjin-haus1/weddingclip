import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

export enum SocialPlatform {
  TIKTOK = 'TIKTOK',
  INSTAGRAM = 'INSTAGRAM',
  YOUTUBE = 'YOUTUBE',
}

@Schema({ timestamps: true })
@ObjectType()
export class SocialAccount {
  @Field(() => ID)
  id: string;

  @Prop({ required: true })
  @Field(() => ID)
  vendorId: string;

  @Prop({ required: true, enum: SocialPlatform })
  @Field(() => SocialPlatform)
  platform: SocialPlatform;

  @Prop({ required: true })
  @Field()
  accessToken: string;

  @Prop()
  @Field({ nullable: true })
  refreshToken?: string;

  @Prop()
  @Field({ nullable: true })
  expiresAt?: Date;

  @Prop()
  @Field({ nullable: true })
  accountName?: string;

  @Prop()
  @Field({ nullable: true })
  accountId?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type SocialAccountDocument = SocialAccount & Document;
export const SocialAccountSchema = SchemaFactory.createForClass(SocialAccount);
