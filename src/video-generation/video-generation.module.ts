import { Module } from '@nestjs/common';
import { TtsService } from './tts.service';
import { VideoGeneratorService } from './video-generator.service';

@Module({
  providers: [TtsService, VideoGeneratorService],
  exports: [TtsService, VideoGeneratorService],
})
export class VideoGenerationModule {}
