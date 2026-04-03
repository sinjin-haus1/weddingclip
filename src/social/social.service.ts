import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { SocialAccount, SocialAccountDocument, SocialPlatform } from './social-account.schema';
import { ConnectSocialInput } from './social.dto';

export interface SocialPostResult {
  url: string;
  postId: string;
}

@Injectable()
export class SocialService {
  constructor(
    @InjectModel(SocialAccount.name)
    private socialAccountModel: Model<SocialAccountDocument>,
    private configService: ConfigService,
  ) {}

  async findByVendor(vendorId: string): Promise<SocialAccount[]> {
    return this.socialAccountModel.find({ vendorId }).exec();
  }

  async findOne(id: string): Promise<SocialAccount> {
    const account = await this.socialAccountModel.findById(id).exec();
    if (!account) {
      throw new NotFoundException(`SocialAccount with id "${id}" not found`);
    }
    return account;
  }

  async connect(input: ConnectSocialInput): Promise<SocialAccount> {
    // In production, this would initiate OAuth 2.0 flow with each platform
    // For TikTok: https://developers.tiktok.com/doc/tiktok-api-oauth2/
    // For Instagram: Facebook Graph API / Instagram Graph API
    // For YouTube: Google OAuth 2.0

    const connected = await this.socialAccountModel.create({
      vendorId: input.vendorId,
      platform: input.platform,
      accessToken: input.accessToken,
      refreshToken: input.refreshToken,
      expiresAt: input.expiresAt ? new Date(input.expiresAt) : undefined,
      accountName: input.accountName,
      accountId: input.accountId,
    });
    return connected;
  }

  async disconnect(id: string): Promise<boolean> {
    const result = await this.socialAccountModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`SocialAccount with id "${id}" not found`);
    }
    return true;
  }

  async refreshToken(id: string): Promise<SocialAccount> {
    const account = await this.findOne(id);

    let newAccessToken = account.accessToken;
    const refreshToken = account.refreshToken;

    if (refreshToken) {
      try {
        // Platform-specific token refresh logic
        switch (account.platform) {
          case SocialPlatform.TIKTOK: {
            const clientKey = this.configService.get<string>('TIKTOK_CLIENT_KEY');
            const clientSecret = this.configService.get<string>('TIKTOK_CLIENT_SECRET');
            const resp = await axios.post(
              'https://open.tiktokapis.com/v2/oauth/token/',
              new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_key: clientKey ?? '',
                client_secret: clientSecret ?? '',
              }),
              { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
            );
            newAccessToken = resp.data.access_token;
            break;
          }
          case SocialPlatform.INSTAGRAM: {
            const resp = await axios.get(
              `https://graph.instagram.com/refresh_access_token?grant_type=refresh_token&access_token=${refreshToken}`,
            );
            newAccessToken = resp.data.access_token;
            break;
          }
          case SocialPlatform.YOUTUBE: {
            // Google token refresh via refresh_token grant
            const clientSecret = this.configService.get<string>('YOUTUBE_CLIENT_SECRET');
            const resp = await axios.post(
              'https://oauth2.googleapis.com/token',
              new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: this.configService.get<string>('YOUTUBE_CLIENT_KEY') ?? '',
                client_secret: clientSecret ?? '',
              }),
            );
            newAccessToken = resp.data.access_token;
            break;
          }
        }
      } catch (err) {
        console.error('Token refresh failed:', err);
      }
    }

    account.accessToken = newAccessToken;
    if (account.expiresAt) {
      // Extend expiry by 2 hours as a rough estimate
      account.expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
    }
    return account.save();
  }

  async postVideo(
    accountId: string,
    videoUrl: string,
    platform: SocialPlatform,
  ): Promise<SocialPostResult> {
    const account = await this.findOne(accountId);

    // Platform-specific video posting implementation
    // This is a placeholder - real implementation would use each platform's API
    switch (platform) {
      case SocialPlatform.TIKTOK:
        return this.postToTikTok(account, videoUrl);
      case SocialPlatform.INSTAGRAM:
        return this.postToInstagram(account, videoUrl);
      case SocialPlatform.YOUTUBE:
        return this.postToYouTube(account, videoUrl);
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  private async postToTikTok(
    account: SocialAccountDocument,
    videoUrl: string,
  ): Promise<SocialPostResult> {
    // TikTok Video Upload API
    // POST https://open.tiktokapis.com/v2/post/publish/
    console.log(`Posting to TikTok with token: ${account.accessToken.substring(0, 10)}...`);
    // Placeholder response
    return {
      url: `https://tiktok.com/@${account.accountName}/video/placeholder`,
      postId: `tt_${Date.now()}`,
    };
  }

  private async postToInstagram(
    account: SocialAccountDocument,
    videoUrl: string,
  ): Promise<SocialPostResult> {
    // Instagram Graph API video upload
    // POST https://graph.instagram.com/{ig-user-id}/media
    console.log(`Posting to Instagram with token: ${account.accessToken.substring(0, 10)}...`);
    return {
      url: `https://instagram.com/p/placeholder`,
      postId: `ig_${Date.now()}`,
    };
  }

  private async postToYouTube(
    account: SocialAccountDocument,
    videoUrl: string,
  ): Promise<SocialPostResult> {
    // YouTube Data API v3
    // POST https://www.googleapis.com/upload/youtube/v3/videos
    console.log(`Posting to YouTube with token: ${account.accessToken.substring(0, 10)}...`);
    return {
      url: `https://youtube.com/watch?v=placeholder`,
      postId: `yt_${Date.now()}`,
    };
  }
}
