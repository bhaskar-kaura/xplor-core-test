// src/user/user.service.ts
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { OtpDto, PhoneNumberDto } from './dto/phone-number.dto';
import { TwilioService } from '../twilio/twilio.service';
import { Persona } from './interfaces/user-details.interface';
import { ResponseUtilsService } from '../common/utils/response-utils.service';
import { CustomMessage } from '../common/enums/message';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private twilioClient: TwilioService;
  private globalOtp: string;
  private responseUtilsService: ResponseUtilsService;
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    this.twilioClient = new TwilioService();
    this.globalOtp = Math.floor(1000 + Math.random() * 9000) as unknown as string;
    this.responseUtilsService = new ResponseUtilsService();
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const createdUser = await this.userModel.create(createUserDto);
      return createdUser;
    } catch (error) {
      this.logger.error('Error creating user:', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAll() {
    try {
      const users = await this.userModel.find().exec();
      return users;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to fetch all users');
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      this.logger.error('Error fetching user by ID:', error);
      throw new Error('Failed to fetch user by ID');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
      if (!updatedUser) {
        throw new Error('User not found');
      }

      return updatedUser;
    } catch (error) {
      this.logger.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  }

  async remove(id: string) {
    try {
      const result = await this.userModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new Error('User not found');
      }

      return result;
    } catch (error) {
      this.logger.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  }

  async sendOtp(phoneNumber: PhoneNumberDto): Promise<string> {
    const otp = this.globalOtp;
    this.logger.log('phoneNumber:', phoneNumber);
    // const result=await this.twilioClient.sendOtpMobile({
    //   phoneNumber: phoneNumber as unknown as string,
    //   otp: otp
    // })
    return otp;
  }
  async verifyOtp(otp: OtpDto, phoneNumber: PhoneNumberDto, persona?: Persona): Promise<User | boolean> {
    if (otp.otp == this.globalOtp) {
      const isUserAlreadyExist = await this.userModel.findOne({ 'userDetails.phoneNumber': phoneNumber.phoneNumber });

      if (isUserAlreadyExist) {
        const result = this.responseUtilsService.getSuccessResponse(
          { userId: isUserAlreadyExist._id },
          CustomMessage.LOGGED_IN,
        );
        return result;
      }

      const data = await this.userModel.create({
        persona: persona,
        userDetails: {
          phoneNumber: phoneNumber.phoneNumber,
        },
      });
      const result = this.responseUtilsService.getSuccessResponse({ userId: data._id }, CustomMessage.CREATED);
      return result;
    } else return false;
  }
}
