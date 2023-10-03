import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(registerUserDto);
    return createdUser.save();
  }

  async create(
    userId: string,
    createUserDto: CreateUserDto,
  ): Promise<UserDocument> {
    return this.userModel
      .findByIdAndUpdate(userId, createUserDto,{ new: true })
      .exec();
  }
  
  // async create(createUserDto: CreateUserDto): Promise<UserDocument> {
  //   const createdUser = new this.userModel(createUserDto);
  //   return createdUser.save();
  // }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findById(userId: string): Promise<UserDocument> {
    return this.userModel.findById(userId, '-password -__v -refreshToken');
  }

  async findByUsername(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username }, '-__v -refreshToken').exec();
  }

  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.userModel
      .findByIdAndUpdate(userId, updateUserDto,{ new: true })
      .exec();
  }

  async remove(userId: string): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(userId).exec();
  }
}