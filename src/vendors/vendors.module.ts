import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Vendor, VendorSchema } from './vendor.schema';
import { VendorsService } from './vendors.service';
import { VendorsResolver } from './vendors.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vendor.name, schema: VendorSchema }]),
  ],
  providers: [VendorsService, VendorsResolver],
  exports: [VendorsService],
})
export class VendorsModule {}
