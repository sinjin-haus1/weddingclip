import { InputType, Field, ID, Int, Float } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString, IsNumber, IsDateString, IsBoolean, Min, Max } from 'class-validator';

@InputType()
export class CreateReviewInput {
  @Field(() => ID)
  @IsString()
  vendorId: string;

  @Field()
  @IsString()
  reviewerName: string;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @Field()
  @IsString()
  text: string;

  @Field()
  @IsDateString()
  date: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  sentimentScore?: number;
}
