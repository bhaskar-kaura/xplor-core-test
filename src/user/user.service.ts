// src/user/user.service.ts
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { PhoneNumberDto } from './dto/phone-number.dto';
import { ResponseUtilsService } from '../common/utils/response-utils.service';
import { GetUrl } from '../common/utils';
import { HttpService } from '@nestjs/axios';
import { AssignRoleDto, ResendOtpDto, VerifyOtpDto } from './dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private globalOtp: string;
  private responseUtilsService: ResponseUtilsService;
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly getUrl: GetUrl,
    private readonly httpService: HttpService,
  ) {
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

  async findOne(token: string) {
    try {
      return (
        await this.httpService.axiosRef.get(this.getUrl.getUserProfileUrl, {
          headers: {
            Authorization: token,
          },
        })
      ).data;
    } catch (error) {
      this.logger.error('Failed to fetch userDetails', error);
      return error?.response?.data;
    }
  }
  async getUserJourney(token: string) {
    try {
      return (
        await this.httpService.axiosRef.get(this.getUrl.getUserJourneyUrl, {
          headers: {
            Authorization: token,
          },
        })
      ).data;
    } catch (error) {
      this.logger.error('Failed to fetch userDetails', error);
      throw error?.response?.data;
    }
  }
  async findRoles(token: string) {
    try {
      return (await this.httpService.axiosRef.get(this.getUrl.getRolesUrl, { headers: { Authorization: token } })).data;
    } catch (error) {
      this.logger.error('Failed to fetch roles', error);
      throw error?.response?.data;
    }
  }
  async assignRole(assignRoleDto: AssignRoleDto, token: string) {
    try {
      return (
        await this.httpService.axiosRef.patch(this.getUrl.assignUserRoleUrl, assignRoleDto, {
          headers: {
            Authorization: token,
          },
        })
      ).data;
    } catch (error) {
      this.logger.error('Failed to assign role to user', error);
      throw error?.response?.data;
    }
  }
  async updateUserKyc(token: string) {
    try {
      const user = (
        await this.httpService.axiosRef.patch(
          this.getUrl.updateUserKycUrl,
          {
            lastName: 'Doe',
            firstName: 'John',
            address: '123 Main St',
            email: 'john.doe@example.com',
            gender: 'Male',
            provider: {
              id: 'provider123',
              name: 'Provider Name',
            },
          },
          {
            headers: {
              Authorization: token,
            },
          },
        )
      ).data;
      return user;
    } catch (error) {
      this.logger.error('Failed to update user kyc', error);
      throw error?.response?.data;
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
    try {
      const otp = (await this.httpService.axiosRef.post(this.getUrl.getUserSendOtpUrl, phoneNumber)).data;
      return otp;
    } catch (error) {
      this.logger.error('Failed to sendOtp', error);
      throw error.response.data;
    }
  }
  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<User | any> {
    try {
      return (await this.httpService.axiosRef.post(this.getUrl.getUserVerifyOtpUrl, verifyOtpDto)).data;
    } catch (error) {
      this.logger.error('Failed to verifyOtp', error);
      throw error.response.data;
    }
  }

  async resendOtp(resendOtp: ResendOtpDto) {
    try {
      const otp = (await this.httpService.axiosRef.post(this.getUrl.getUserResendOtpUrl, resendOtp)).data;
      return otp;
    } catch (error) {
      this.logger.error('Failed to resendOtp', error);
      throw error.response.data;
    }
  }
}
