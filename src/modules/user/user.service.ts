// Import necessary decorators and components from NestJS
import { Injectable, Logger } from '@nestjs/common';
import { PhoneNumberDto } from './dto/phone-number.dto';
import { ResponseUtilsService } from '../../common/utils/response-utils.service';
import { GetUrl } from '../../common/utils';
import { HttpService } from '@nestjs/axios';
import { AssignRoleDto, ResendOtpDto, VerifyOtpDto } from './dto';

// Define the UserService with necessary methods for user operations
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private globalOtp: string;
  private responseUtilsService: ResponseUtilsService;
  constructor(private readonly getUrl: GetUrl, private readonly httpService: HttpService) {
    this.globalOtp = Math.floor(1000 + Math.random() * 9000) as unknown as string;
    this.responseUtilsService = new ResponseUtilsService();
  }

  // Method to find a user by token
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
  // Method to get user journey
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
      return error?.response?.data;
    }
  }
  // Method to find roles
  async findRoles(token: string) {
    try {
      return (await this.httpService.axiosRef.get(this.getUrl.getRolesUrl, { headers: { Authorization: token } })).data;
    } catch (error) {
      this.logger.error('Failed to fetch roles', error);
      return error?.response?.data;
    }
  }
  // Method to assign role to a user
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
      return error?.response?.data;
    }
  }
  // Method to update user KYC
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
      return error?.response?.data;
    }
  }

  // Method to send OTP
  async sendOtp(phoneNumber: PhoneNumberDto): Promise<string> {
    try {
      const otp = (await this.httpService.axiosRef.post(this.getUrl.getUserSendOtpUrl, phoneNumber)).data;
      return otp;
    } catch (error) {
      this.logger.error('Failed to sendOtp', error);
      return error.response.data;
    }
  }
  // Method to verify OTP
  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<any> {
    try {
      return (await this.httpService.axiosRef.post(this.getUrl.getUserVerifyOtpUrl, verifyOtpDto)).data;
    } catch (error) {
      this.logger.error('Failed to verifyOtp', error);
      return error.response.data;
    }
  }

  // Method to resend OTP
  async resendOtp(resendOtp: ResendOtpDto) {
    try {
      const otp = (await this.httpService.axiosRef.post(this.getUrl.getUserResendOtpUrl, resendOtp)).data;
      return otp;
    } catch (error) {
      this.logger.error('Failed to resendOtp', error);
      return error.response.data;
    }
  }
}
