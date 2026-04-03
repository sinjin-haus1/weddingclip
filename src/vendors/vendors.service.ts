import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vendor, VendorDocument, VendorCategory } from './vendor.schema';
import { CreateVendorInput, UpdateVendorInput } from './vendors.dto';

@Injectable()
export class VendorsService {
  constructor(@InjectModel(Vendor.name) private vendorModel: Model<VendorDocument>) {}

  async findAll(category?: VendorCategory): Promise<Vendor[]> {
    const filter = category ? { category } : {};
    return this.vendorModel.find(filter).exec();
  }

  async findOne(id: string): Promise<Vendor> {
    const vendor = await this.vendorModel.findById(id).exec();
    if (!vendor) {
      throw new NotFoundException(`Vendor with id "${id}" not found`);
    }
    return vendor;
  }

  async create(input: CreateVendorInput): Promise<Vendor> {
    const created = new this.vendorModel(input);
    return created.save();
  }

  async update(id: string, input: UpdateVendorInput): Promise<Vendor> {
    const updated = await this.vendorModel.findByIdAndUpdate(id, input, { new: true }).exec();
    if (!updated) {
      throw new NotFoundException(`Vendor with id "${id}" not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.vendorModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Vendor with id "${id}" not found`);
    }
    return true;
  }
}
