import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './video.schema';
import { VideosService } from './videos.service';
import { VideosResolver } from './videos.resolver';
import { SocialModule } from '../social/social.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { VendorsModule } from '../vendors/vendors.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    SocialModule,
    ReviewsModule,
    VendorsModule,
  ],
  providers: [VideosService, VideosResolver],
  exports: [VideosService],
})
export class VideosModule {}
