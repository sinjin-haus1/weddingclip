import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { Review, ReviewDocument } from './review.schema';
import { VendorsService } from '../vendors/vendors.service';
import { CreateReviewInput } from './reviews.dto';

interface GooglePlaceReview {
  author_name: string;
  rating: number;
  text: string;
  time: string;
}

interface GooglePlacesResponse {
  result?: {
    reviews?: GooglePlaceReview[];
  };
  status?: string;
}

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    private vendorsService: VendorsService,
    private configService: ConfigService,
  ) {}

  async findByVendor(vendorId: string): Promise<Review[]> {
    return this.reviewModel.find({ vendorId }).exec();
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.reviewModel.findById(id).exec();
    if (!review) {
      throw new NotFoundException(`Review with id "${id}" not found`);
    }
    return review;
  }

  async fetchGoogleReviews(vendorId: string): Promise<Review[]> {
    const vendor = await this.vendorsService.findOne(vendorId);
    if (!vendor.googlePlaceId) {
      throw new NotFoundException(`Vendor "${vendorId}" has no googlePlaceId configured`);
    }

    const apiKey = this.configService.get<string>('GOOGLE_PLACES_API_KEY');
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${vendor.googlePlaceId}&fields=reviews&key=${apiKey}`;

    let googleReviews: GooglePlaceReview[] = [];
    try {
      const response = await axios.get<GooglePlacesResponse>(url);
      if (response.data.status === 'OK' && response.data.result?.reviews) {
        googleReviews = response.data.result.reviews;
      }
    } catch (err) {
      console.error('Failed to fetch Google Reviews:', err);
      // Return existing reviews if API fails
    }

    const savedReviews: Review[] = [];
    for (const gr of googleReviews) {
      const existing = await this.reviewModel.findOne({
        vendorId,
        reviewerName: gr.author_name,
        date: new Date(Number(gr.time) * 1000),
      });
      if (!existing) {
        const created = await this.reviewModel.create({
          vendorId,
          reviewerName: gr.author_name,
          rating: gr.rating,
          text: gr.text,
          date: new Date(Number(gr.time) * 1000),
          sentimentScore: null,
          usedInVideo: false,
        });
        savedReviews.push(created);
      }
    }

    return savedReviews;
  }

  async create(input: CreateReviewInput): Promise<Review> {
    const created = await this.reviewModel.create({
      ...input,
      usedInVideo: false,
    });
    return created;
  }

  async markUsed(id: string, usedInVideo: boolean): Promise<Review> {
    const updated = await this.reviewModel.findByIdAndUpdate(
      id,
      { usedInVideo },
      { new: true },
    );
    if (!updated) {
      throw new NotFoundException(`Review with id "${id}" not found`);
    }
    return updated;
  }

  async getUnusedByVendor(vendorId: string): Promise<Review[]> {
    return this.reviewModel.find({ vendorId, usedInVideo: false }).exec();
  }
}
