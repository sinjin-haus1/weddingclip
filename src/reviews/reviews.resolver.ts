import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Review } from './review.schema';
import { ReviewsService } from './reviews.service';
import { CreateReviewInput } from './reviews.dto';

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Query(() => [Review], { name: 'reviews' })
  async findByVendor(
    @Args('vendorId', { type: () => ID }) vendorId: string,
  ): Promise<Review[]> {
    return this.reviewsService.findByVendor(vendorId);
  }

  @Query(() => Review, { name: 'review' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<Review> {
    return this.reviewsService.findOne(id);
  }

  @Mutation(() => [Review])
  async fetchGoogleReviews(
    @Args('vendorId', { type: () => ID }) vendorId: string,
  ): Promise<Review[]> {
    return this.reviewsService.fetchGoogleReviews(vendorId);
  }

  @Mutation(() => Review)
  async createReview(@Args('input') input: CreateReviewInput): Promise<Review> {
    return this.reviewsService.create(input);
  }

  @Mutation(() => Review)
  async markReviewUsed(
    @Args('id', { type: () => ID }) id: string,
    @Args('usedInVideo', { type: () => Boolean }) usedInVideo: boolean,
  ): Promise<Review> {
    return this.reviewsService.markUsed(id, usedInVideo);
  }
}
