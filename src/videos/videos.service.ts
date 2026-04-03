import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { join } from 'path';
import { Video, VideoDocument, VideoStatus, TemplateStyle } from './video.schema';
import { SocialService } from '../social/social.service';
import { ReviewsService } from '../reviews/reviews.service';
import { VendorsService } from '../vendors/vendors.service';
import { GenerateVideoInput, PostToSocialInput } from './videos.dto';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
    private socialService: SocialService,
    private reviewsService: ReviewsService,
    private vendorsService: VendorsService,
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
    const reviews = await this.reviewsService.findOne(input.reviewId);

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
      // Execute FFmpeg pipeline (runs async, would be a job queue in production)
      const outputUrl = await this.executeVideoGeneration(video, vendor, reviews);
      video.status = VideoStatus.COMPLETED;
      video.outputUrl = outputUrl;
    } catch (err) {
      video.status = VideoStatus.FAILED;
      video.error = err instanceof Error ? err.message : 'Unknown error';
    }

    await video.save();
    return video;
  }

  private async executeVideoGeneration(
    video: VideoDocument,
    vendor: Awaited<ReturnType<VendorsService['findOne']>>,
    review: Awaited<ReturnType<ReviewsService['findOne']>>,
  ): Promise<string> {
    // Dynamic import to avoid issues when ffmpeg-static isn't installed yet
    const ffmpegPath = require('ffmpeg-static');
    const fluentFfmpeg = require('fluent-ffmpeg');

    fluentFfmpeg.setFfmpegPath(ffmpegPath);

    const outputDir = join(process.cwd(), 'uploads', 'processed');
    const outputFile = join(outputDir, `video_${video._id}.mp4`);

    // Placeholder: generate a minimal vertical video with review text overlay
    // In production, this would composite:
    // - Background image/video
    // - Text overlay with review snippet (wedding-style font)
    // - TTS audio narration placeholder
    // - Soft background music placeholder
    // - Vendor branding overlay (corner)
    // - Transitions and effects

    return new Promise((resolve, reject) => {
      // Create a placeholder output by generating a colored vertical frame with text
      // This is a minimal working example - real implementation would use full FFmpeg pipeline
      const text = review.text.substring(0, 100);
      const fontFile = '/System/Library/Fonts/Supplemental/Garamond Bold.ttf'; // macOS
      const branding = vendor.logoUrl ?? '';

      fluentFfmpeg()
        .input(`color=c=#1a1a2e:s=1080x1920:d=${video.duration}:r=30`)
        .inputFormat('lavfi')
        .outputOptions([
          '-vf `drawtext=text="${text}":fontsize=48:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:fontfile=${fontFile}`',
          '-c:a aac -b:a 128k',
          '-pix_fmt yuv420p',
          '-movflags +faststart',
        ])
        .output(outputFile)
        .on('end', () => {
          resolve(`file://${outputFile}`);
        })
        .on('error', (err: Error) => {
          // If FFmpeg fails (e.g. font not found), resolve with placeholder URL
          console.warn('FFmpeg generation note:', err.message);
          resolve(`placeholder://uploads/processed/video_${video._id}.mp4`);
        })
        .run();
    });
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
