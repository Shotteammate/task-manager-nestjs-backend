import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteOne } from './interface/mongooseDeleteOne.interface';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find({});
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id });
  }

  async update(id: string, payload: UpdateUserDto): Promise<User> {
    const options = { new: true };
    return await this.userModel.findOneAndUpdate({ _id: id }, payload, options);
  }

  // typescrip interface 'DeleteOne' is used to prevent 'Promise<Object>' situation
  // which cause 'typescript Don't use `Object` as a type.'
  async delete(id: string): Promise<DeleteOne> {
    return await this.userModel.deleteOne({ _id: id });
  }
}
