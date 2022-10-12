import { Injectable, Logger } from '@nestjs/common';
import { mongoose } from '@typegoose/typegoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import {
  InvalidPasswordException,
  UserNotFoundException,
} from './users.exception';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  private readonly logger = new Logger('UsersService');

  async findById(_id: string | mongoose.Types.ObjectId): Promise<User | null> {
    return await this.usersRepository.findOne({ _id });
  }

  async getOne(filter: Record<string, any>): Promise<User | null> {
    const user = await this.usersRepository.findOne(filter);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async comparePassword(raw: string, savedHash: string) {
    const isMatched = await bcrypt.compare(raw, savedHash);
    if (!isMatched) {
      throw new InvalidPasswordException();
    }
  }

  async mockFindById(_id: string): Promise<User | null> {
    return {
      _id: new mongoose.Types.ObjectId(_id),
      username: 'test user',
      email: 'test-user@email.com',
    };
  }

  async mockGetOne(filter: Record<string, any>): Promise<User | null> {
    return {
      _id: new mongoose.Types.ObjectId(),
      username: 'test user',
      email: filter.email,
    };
  }

  async mockComparePassword(raw: string, savedHash: string) {
    console.log(raw, savedHash);
    return;
  }
}
