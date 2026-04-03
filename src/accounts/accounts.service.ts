import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from './account.schema';

@Injectable()
export class AccountsService {
  constructor(@InjectModel(Account.name) private accountModel: Model<AccountDocument>) {}

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }

  async findOne(id: string): Promise<Account> {
    const account = await this.accountModel.findById(id).exec();
    if (!account) {
      throw new NotFoundException(`Account with id "${id}" not found`);
    }
    return account;
  }

  async create(data: Partial<Account>): Promise<Account> {
    const created = await this.accountModel.create(data);
    return created;
  }

  async update(id: string, data: Partial<Account>): Promise<Account> {
    const updated = await this.accountModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) {
      throw new NotFoundException(`Account with id "${id}" not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.accountModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Account with id "${id}" not found`);
    }
    return true;
  }
}
