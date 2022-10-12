import { Injectable } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User)
    protected readonly userModel: Model<UserDocument>,
  ) {}

  async findOne(
    filterQuery: FilterQuery<UserDocument>,
    projection?: Record<string, unknown>,
  ): Promise<UserDocument | null> {
    return this.userModel.findOne(filterQuery, {
      __v: 0,
      ...projection,
    });
  }

  async find(
    filterQuery: FilterQuery<UserDocument>,
  ): Promise<UserDocument[] | null> {
    return this.userModel.find(filterQuery).sort({ createdAt: -1 });
  }

  async findAll(
    filterQuery: FilterQuery<UserDocument>,
    sorters: FilterQuery<UserDocument> = {},
  ): Promise<UserDocument[]> {
    return await this.userModel.find(filterQuery).sort(sorters);
  }

  async create(data: any): Promise<UserDocument> {
    const user = new this.userModel(data);
    return user.save();
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<UserDocument>,
    updateQuery: UpdateQuery<unknown>,
  ): Promise<UserDocument | null> {
    return this.userModel.findOneAndUpdate(filterQuery, updateQuery, {
      new: true,
    });
  }

  async deleteMany(filterQuery: FilterQuery<UserDocument>): Promise<number> {
    const deleteResult = await this.userModel.deleteMany(filterQuery);
    return deleteResult.deletedCount;
  }

  async aggregate(pipeline: any): Promise<Record<string, any> | null> {
    return this.userModel.aggregate(pipeline);
  }
}
