import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Video, VideoStatus } from './video.schema';
import { VideosService } from './videos.service';
import { GenerateVideoInput, PostToSocialInput } from './videos.dto';

@Resolver(() => Video)
export class VideosResolver {
  constructor(private readonly videosService: VideosService) {}

  @Query(() => [Video], { name: 'videos' })
  async findAll(
    @Args('vendorId', { type: () => ID, nullable: true }) vendorId?: string,
    @Args('status', { type: () => VideoStatus, nullable: true }) status?: VideoStatus,
  ): Promise<Video[]> {
    return this.videosService.findAll(vendorId, status);
  }

  @Query(() => Video, { name: 'video' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<Video> {
    return this.videosService.findOne(id);
  }

  @Mutation(() => Video)
  async generateVideo(@Args('input') input: GenerateVideoInput): Promise<Video> {
    return this.videosService.generateVideo(input);
  }

  @Mutation(() => Video)
  async postToSocial(
    @Args('videoId', { type: () => ID }) videoId: string,
    @Args('input') input: PostToSocialInput,
  ): Promise<Video> {
    return this.videosService.postToSocial(videoId, input);
  }
}
