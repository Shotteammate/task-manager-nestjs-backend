import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MongoDeleteOne } from './interface/mongooseDeleteOne.interface';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { UserCredentialsResponse } from './interface/userCredentialsResponse.interface';

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

  // typescrip interface 'MongoDeleteOne' is used to prevent 'Promise<Object>' situation
  // which cause 'typescript Don't use `Object` as a type.'
  async delete(id: string): Promise<MongoDeleteOne> {
    return await this.userModel.deleteOne({ _id: id });
  }

  async findOneByCredentails(
    email: string,
    password: string,
  ): Promise<UserCredentialsResponse> {
    const user = await this.userModel.findOne({ email });

    if (user) {
      const isValidPassword = await this.isPasswordMatch(
        password,
        user.password,
      );

      if (isValidPassword) {
        return {
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            age: user.age,
          },
        };
      }
    }
    return null;
  }

  async isPasswordMatch(
    incomingPassword: string,
    hash: string,
  ): Promise<boolean> {
    const result = await bcrypt.compare(incomingPassword, hash);
    return result;
  }

  //TODO: generateAuthToken
}
