import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { SocialAccount } from './social-account.schema';
import { SocialService } from './social.service';
import { ConnectSocialInput } from './social.dto';

@Resolver(() => SocialAccount)
export class SocialResolver {
  constructor(private readonly socialService: SocialService) {}

  @Query(() => [SocialAccount], { name: 'socialAccounts' })
  async findByVendor(
    @Args('vendorId', { type: () => ID }) vendorId: string,
  ): Promise<SocialAccount[]> {
    return this.socialService.findByVendor(vendorId);
  }

  @Query(() => SocialAccount, { name: 'socialAccount' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<SocialAccount> {
    return this.socialService.findOne(id);
  }

  @Mutation(() => SocialAccount)
  async connectSocialAccount(
    @Args('input') input: ConnectSocialInput,
  ): Promise<SocialAccount> {
    return this.socialService.connect(input);
  }

  @Mutation(() => Boolean)
  async disconnectSocialAccount(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.socialService.disconnect(id);
  }

  @Mutation(() => SocialAccount)
  async refreshSocialToken(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<SocialAccount> {
    return this.socialService.refreshToken(id);
  }
}
