// Import necessary decorators and components from NestJS
import { Injectable, Logger } from '@nestjs/common';
import { PhoneNumberDto } from './dto/phone-number.dto';
import { GetUrl } from '../../common/utils';
import { HttpService } from '@nestjs/axios';
import { AssignRoleDto, CreateMPinDto, ResendOtpDto, VerifyOtpDto } from './dto';

// Define the UserService with necessary methods for user operations
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly getUrl: GetUrl, private readonly httpService: HttpService) {}

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
      throw error?.response?.data;
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
      throw error?.response?.data;
    }
  }
  // Method to find roles
  async findRoles(token: string) {
    try {
      return (await this.httpService.axiosRef.get(this.getUrl.getRolesUrl, { headers: { Authorization: token } })).data;
    } catch (error) {
      this.logger.error('Failed to fetch roles', error);
      throw error?.response?.data;
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
      throw error?.response?.data;
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
      throw error?.response?.data;
    }
  }

  // Method to send OTP
  async sendOtp(phoneNumber: PhoneNumberDto): Promise<string> {
    try {
      const otp = (
        await this.httpService.axiosRef.post(this.getUrl.getUserSendOtpUrl, {
          phoneNumber: phoneNumber.phoneNumber.replaceAll(' ', ''),
        })
      ).data;
      return otp;
    } catch (error) {
      this.logger.error('Failed to sendOtp', error);
      throw error?.response?.data;
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

  // Method to validate token
  async validateToken(token: string) {
    try {
      return (
        await this.httpService.axiosRef.get(this.getUrl.verifyUserTokenUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).data;
    } catch (error) {
      this.logger.error('Failed to Validate Token', error);
      throw error?.response?.data;
    }
  }

  // Method to create MPIN
  async createMPin(token: string, mPin: CreateMPinDto) {
    try {
      return (
        await this.httpService.axiosRef.post(this.getUrl.createUserMPinUrl, mPin, {
          headers: { Authorization: token },
        })
      ).data;
    } catch (error) {
      this.logger.error('Failed to create mPin', error);
      throw error?.response?.data;
    }
  }

  // Method to verify MPIN
  async verifyMPin(token: string, mPin: CreateMPinDto) {
    try {
      return (
        await this.httpService.axiosRef.put(this.getUrl.verifyUserMPinUrl, mPin, { headers: { Authorization: token } })
      ).data;
    } catch (error) {
      this.logger.error('Failed to verify mPin', error);
      throw error?.response?.data;
    }
  }
}
