import { InputType, Field, ID, Int, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';
import { TemplateStyle } from './video.schema';

export enum SocialPlatform {
  TIKTOK = 'TIKTOK',
  INSTAGRAM = 'INSTAGRAM',
  YOUTUBE = 'YOUTUBE',
}

registerEnumType(SocialPlatform, { name: 'SocialPlatform' });

@InputType()
export class GenerateVideoInput {
  @Field(() => ID)
  @IsString()
  vendorId: string;

  @Field(() => ID)
  @IsString()
  reviewId: string;

  @Field(() => TemplateStyle, { nullable: true })
  @IsOptional()
  @IsEnum(TemplateStyle)
  templateStyle?: TemplateStyle;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(15)
  @Max(30)
  duration?: number;
}

@InputType()
export class PostToSocialInput {
  @Field(() => ID)
  @IsString()
  accountId: string;

  @Field(() => SocialPlatform)
  @IsEnum(SocialPlatform)
  platform: SocialPlatform;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  caption?: string;
}
