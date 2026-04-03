import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDocument, VideoStatus, TemplateStyle } from './video.schema';
import { SocialService } from '../social/social.service';
import { ReviewsService } from '../reviews/reviews.service';
import { VendorsService } from '../vendors/vendors.service';
import { VideoGeneratorService } from '../video-generation/video-generator.service';
import { GenerateVideoInput, PostToSocialInput } from './videos.dto';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
    private socialService: SocialService,
    private reviewsService: ReviewsService,
    private vendorsService: VendorsService,
    private videoGenerator: VideoGeneratorService,
  ) {}

  async findAll(vendorId?: string, status?: VideoStatus): Promise<Video[]> {
    const filter: Record<string, unknown> = {};
    if (vendorId) filter.vendorId = vendorId;
    if (status) filter.status = status;
    return this.videoModel.find(filter).exec();
  }

  async findOne(id: string): Promise<VideoDocument> {
    const video = await this.videoModel.findById(id).exec();
    if (!video) {
      throw new NotFoundException(`Video with id "${id}" not found`);
    }
    return video;
  }

  async generateVideo(input: GenerateVideoInput): Promise<Video> {
    const vendor = await this.vendorsService.findOne(input.vendorId);
    const review = await this.reviewsService.findOne(input.reviewId);

    // Create pending video record
    const video = await this.videoModel.create({
      vendorId: input.vendorId,
      reviewIds: [input.reviewId],
      status: VideoStatus.PENDING,
      templateStyle: input.templateStyle ?? TemplateStyle.ELEGANT,
      duration: input.duration ?? 15,
      socialPostUrls: [],
    });

    // Update status to processing
    video.status = VideoStatus.PROCESSING;
    await video.save();

    try {
      // Execute the enhanced video generation pipeline with TTS and templates
      const result = await this.videoGenerator.generateVideo({
        videoId: video._id.toString(),
        reviewText: review.text,
        reviewerName: review.reviewerName,
        rating: review.rating,
        vendorName: vendor.name,
        vendorLogoUrl: vendor.logoUrl,
        templateStyle: input.templateStyle ?? TemplateStyle.ELEGANT,
        duration: input.duration ?? 15,
      });

      video.status = VideoStatus.COMPLETED;
      video.outputUrl = result.outputUrl;
      video.duration = result.duration;
    } catch (err) {
      video.status = VideoStatus.FAILED;
      video.error = err instanceof Error ? err.message : 'Unknown error';
    }

    await video.save();
    return video;
  }

  async postToSocial(
    videoId: string,
    input: PostToSocialInput,
  ): Promise<Video> {
    const video = await this.findOne(videoId);
    if (video.status !== VideoStatus.COMPLETED || !video.outputUrl) {
      throw new NotFoundException('Video must be completed before posting');
    }

    const postResult = await this.socialService.postVideo(
      input.accountId,
      video.outputUrl,
      input.platform,
    );

    const socialPost = {
      platform: input.platform,
      url: postResult.url,
      postedAt: new Date(),
      postId: postResult.postId,
    };

    video.socialPostUrls.push(socialPost as never);
    await video.save();
    return video;
  }
}
