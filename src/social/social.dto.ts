import { InputType, Field, ID } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString, IsDateString } from 'class-validator';
import { SocialPlatform } from './social-account.schema';

@InputType()
export class ConnectSocialInput {
  @Field(() => ID)
  @IsString()
  vendorId: string;

  @Field(() => SocialPlatform)
  @IsEnum(SocialPlatform)
  platform: SocialPlatform;

  @Field()
  @IsString()
  accessToken: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  refreshToken?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  accountName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  accountId?: string;
}
