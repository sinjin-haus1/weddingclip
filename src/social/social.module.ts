import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SocialAccount, SocialAccountSchema } from './social-account.schema';
import { SocialService } from './social.service';
import { SocialResolver } from './social.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SocialAccount.name, schema: SocialAccountSchema },
    ]),
  ],
  providers: [SocialService, SocialResolver],
  exports: [SocialService],
})
export class SocialModule {}
