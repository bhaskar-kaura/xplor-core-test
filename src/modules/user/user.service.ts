// Import necessary decorators and components from NestJS
import { Injectable, Logger } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { HttpService } from '@nestjs/axios';
import { PhoneNumberDto } from './dto/phone-number.dto';
import { GetUrl } from '../../common/utils';
import {
  AssignRoleDto,
  CreateDevicePreferenceDto,
  CreateLanguageDto,
  CreateMPinDto,
  CreateUserDto,
  QueryOtpTypeDto,
  UpdateDevicePreferenceDto,
  VerifyOtpDto,
} from './dto';
import { USER_ERROR_MESSAGES } from '../../common/constants/error-message';
import { ResetMpinDto } from './dto/reset-mpin.dto';
import { ConfigService } from '@nestjs/config';
import { CreateWalletDto } from '../wallet/dto';
import { TranslateService } from '../../common/utils/translate/translate.service';
import { GetDeviceService } from '../../common/utils/getDevice/get-device';
import { DeviceIdDto } from '../../common/utils/dto/device-dto';
import { KeysForTitleAndDes } from '../../common/constants/keys-to-translate/translate';
import { GetUserService } from '../../common/utils/getUser/get-user';
import { IUserProfile } from 'Core-nest-backend/src/common/interfaces';
// import { filterArrayOfObjects } from '../../common/utils/filter-array/filter-array';
// import { DOMAINS } from '../../common/constants/domains/domains';
// import { CATEGORIES } from '../../common/constants/categories/categories';
// import { extractKeys } from '../../common/utils/extract-keys/extract-keys';

// Define the UserService with necessary methods for user operations
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private readonly serverDefaultLanguage: string;
  constructor(
    private readonly getUrl: GetUrl,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly getDeviceService: GetDeviceService,
    private readonly translateService: TranslateService,
    private readonly getUserService: GetUserService,
  ) {
    this.serverDefaultLanguage = this.configService.get('serverDefaultLanguage');
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
      )?.data;
    } catch (error) {
      this.logger.error(USER_ERROR_MESSAGES.GET_USER_DETAILS, error);
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
      )?.data;
    } catch (error) {
      this.logger.error(USER_ERROR_MESSAGES.GET_USER_JOURNEY, error);
      throw error?.response?.data;
    }
  }
  // Method to find roles
  async findRoles(deviceIdDto: DeviceIdDto) {
    try {
      const deviceInfo = await this.getDeviceService.getDevicePreferenceById(deviceIdDto.deviceId);
      const targetLanguageCode = deviceInfo?.languageCode || this.serverDefaultLanguage;
      const roles = (await this.httpService.axiosRef.get(this.getUrl.getRolesUrl))?.data;
      const translatedResponse = await this.translateService.translateArrayWithKeysToLanguage(
        roles?.data,
        KeysForTitleAndDes,
        targetLanguageCode,
      );
      Object.assign(roles.data, translatedResponse);
      return roles;
    } catch (error) {
      this.logger.error(USER_ERROR_MESSAGES.GET_USER_ROLES, error);
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
      )?.data;
    } catch (error) {
      this.logger.error(USER_ERROR_MESSAGES.ASSIGN_USER_ROLE, error);
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
            lastName: faker.person.lastName(),
            firstName: faker.person.firstName(),
            address: faker.location.streetAddress(),
            email: faker.internet.email(),
            gender: faker.person.gender(),
            provider: {
              id: faker.string.uuid(),
              name: faker.person.jobArea(),
            },
          },
          {
            headers: {
              Authorization: token,
            },
          },
        )
      )?.data;
      return user;
    } catch (error) {
      this.logger.error(USER_ERROR_MESSAGES.UPDATE_USER_KYC, error);
      throw error?.response?.data;
    }
  }

  // Method to send OTP
  async sendOtp(phoneNumber: PhoneNumberDto): Promise<string> {
    try {
      const deviceInfo = await this.getDeviceService.getDevicePreferenceById(phoneNumber.deviceId);
      const targetLanguageCode = deviceInfo?.languageCode || this.serverDefaultLanguage;
      phoneNumber.targetLanguageCode = targetLanguageCode;
      const otp = (
        await this.httpService.axiosRef.post(this.getUrl.getUserSendOtpUrl, {
          phoneNumber: phoneNumber.phoneNumber.replaceAll(' ', ''),
        })
      )?.data;
      return otp;
    } catch (error: any) {
      this.logger.error(USER_ERROR_MESSAGES.SEND_OTP, error);
      error.response.data.targetLanguageCode = phoneNumber.targetLanguageCode;
      throw error?.response?.data;
    }
  }

  async sendMpinOtp(token: string) {
    let targetLanguageCode: string = this.serverDefaultLanguage;
    try {
      const user: IUserProfile = await this.getUserService.getUserByToken(token);
      targetLanguageCode = user.languagePreference;
      return (
        await this.httpService.axiosRef.put(
          this.getUrl.getUserSendMpinOtpUrl,
          {},
          { headers: { Authorization: token } },
        )
      )?.data;
    } catch (error) {
      this.logger.error(USER_ERROR_MESSAGES.SEND_OTP, error);
      error.response.data.targetLanguageCode = targetLanguageCode;
      throw error?.response?.data;
    }
  }
  // Method to verify OTP
  async verifyOtp(token: string, queryOtpTypeDto: QueryOtpTypeDto, verifyOtpDto: VerifyOtpDto): Promise<any> {
    let targetLanguageCode: string = this.serverDefaultLanguage;
    try {
      if (verifyOtpDto.deviceId) {
        const deviceInfo = await this.getDeviceService.getDevicePreferenceById(verifyOtpDto.deviceId);
        targetLanguageCode = deviceInfo?.languageCode || this.serverDefaultLanguage;
      } else {
        const user: IUserProfile = await this.getUserService.getUserByToken(token);

        targetLanguageCode = user.languagePreference;
      }

      return (
        await this.httpService.axiosRef.post(this.getUrl.getUserVerifyOtpUrl, verifyOtpDto, {
          params: queryOtpTypeDto,
          headers: { Authorization: token },
        })
      )?.data;
    } catch (error) {
      this.logger.error(USER_ERROR_MESSAGES.VERIFY_OTP, error);
      error.response.data.targetLanguageCode = targetLanguageCode;
      throw error.response.data;
    }
  }

  async resetMpin(token: string, resetMpinDto: ResetMpinDto) {
    let targetLanguageCode: string = this.serverDefaultLanguage;
    try {
      const user: IUserProfile = await this.getUserService.getUserByToken(token);
      targetLanguageCode = user.languagePreference;
      return (
        await this.httpService.axiosRef.put(this.getUrl.getUserResetMpinUrl, resetMpinDto, {
          headers: { Authorization: token },
        })
      )?.data;
    } catch (error) {
      this.logger.error(USER_ERROR_MESSAGES.UPDATER_USER_MPIN, error);
      error.response.data.targetLanguageCode = targetLanguageCode;
      throw error?.response?.data;
    }
  }
  // // Method to resend OTP
  // async resendOtp(resendOtp: ResendOtpDto) {
  //   try {
  //     const otp = (await this.httpService.axiosRef.post(this.getUrl.getUserResendOtpUrl, resendOtp))?.data;
  //     return otp;
  //   } catch (error) {
  //     this.logger.error(USER_ERROR_MESSAGES.RESEND_OTP, error);
  //     throw error.response.data;
  //   }
  // }

  // Method to validate token
  async validateToken(token: string) {
    try {
      return (
        await this.httpService.axiosRef.get(this.getUrl.verifyUserTokenUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )?.data;
    } catch (error) {
      this.logger.error(USER_ERROR_MESSAGES.VERIFY_TOKEN, error);
      throw error?.response?.data;
    }
  }

  // Method to create MPIN
  async createMPin(token: string, mPin: CreateMPinDto) {
    let targetLanguageCode: string = this.serverDefaultLanguage;
    const user: IUserProfile = await this.getUserService.getUserByToken(token);
    targetLanguageCode = user.languagePreference;
    try {
      return (
        await this.httpService.axiosRef.post(this.getUrl.createUserMPinUrl, mPin, {
          headers: { Authorization: token },
        })
      )?.data;
    } catch (error) {
      this.logger.error(USER_ERROR_MESSAGES.CREATE_USER_MPIN, error);
      error.response.data.targetLanguageCode = targetLanguageCode;
      throw error?.response?.data;
    }
  }

  // Method to verify MPIN
  async verifyMPin(token: string, mPin: CreateMPinDto) {
    let targetLanguageCode: string = this.serverDefaultLanguage;
    try {
      const user: IUserProfile = await this.getUserService.getUserByToken(token);
      targetLanguageCode = user.languagePreference;
      return (
        await this.httpService.axiosRef.put(this.getUrl.verifyUserMPinUrl, mPin, { headers: { Authorization: token } })
      )?.data;
    } catch (error) {
      this.logger.error(USER_ERROR_MESSAGES.VERIFY_USER_MPIN, error);
      error.response.data.targetLanguageCode = targetLanguageCode;
      throw error?.response?.data;
    }
  }

  async getAccessToken(token: string) {
    try {
      return (
        await this.httpService.axiosRef.get(this.getUrl.refreshUserTokenUrl, {
          headers: { Authorization: token },
        })
      )?.data;
    } catch (error) {
      this.logger.error(USER_ERROR_MESSAGES.VERIFY_TOKEN, error);
      throw error?.response?.data;
    }
  }

  async logoutUser(token: string) {
    try {
      return (
        await this.httpService.axiosRef.put(
          this.getUrl.logOutUserUrl,
          {},
          {
            headers: { Authorization: token },
          },
        )
      )?.data;
    } catch (error) {
      throw error?.response?.data;
    }
  }

  // Method to create user profile for the implementer
  async createUser(token: string, userId: string, user: CreateUserDto) {
    try {
      const roles = (
        await this.httpService.axiosRef.get(this.getUrl.getRolesUrl, { headers: { Authorization: token } })
      )?.data?.data;
      const role = roles.map((element: any) => {
        if (element.type === user.role) return element;
      });
      const roleId = role[0]?._id;
      const userDataForWallet = new CreateWalletDto(user.kyc.firstName + ' ' + user.kyc.lastName, user.kyc.email, '');
      const newWallet = (
        await this.httpService.axiosRef.post(
          this.getUrl.getWalletUrl,
          { userId: userId, ...userDataForWallet },
          {
            headers: { Authorization: token },
          },
        )
      )?.data?.data;
      const walletId = newWallet?._id;

      const updatedUser = (
        await this.httpService.axiosRef.patch(
          this.getUrl.getUserProfileUrl,
          { wallet: walletId, role: roleId, kyc: user.kyc }, //need to create the inerface
          {
            headers: { Authorization: token },
          },
        )
      )?.data;
      return updatedUser;
      // return (await this.httpService.axiosRef.post(this.getUrl.createUserUrl, user))?.data;
    } catch (error) {
      this.logger.error(USER_ERROR_MESSAGES.CREATE_USER, error);
      throw error?.response?.data;
    }
  }

  async updateUserLanguagePreference(token: string, createLanguageDto: CreateLanguageDto) {
    try {
      return (
        await this.httpService.axiosRef.patch(this.getUrl.updateUserLanguagePreferenceUrl, createLanguageDto, {
          headers: { Authorization: token },
        })
      )?.data;
    } catch (error) {
      this.logger.error(USER_ERROR_MESSAGES.UPDATE_USER_LANGUAGE_PREFERENCE, error);
      throw error?.response?.data;
    }
  }

  async createDevicePreference(createDevicePreference: CreateDevicePreferenceDto) {
    try {
      return (await this.httpService.axiosRef.post(this.getUrl.getDevicePreferenceUrl, createDevicePreference))?.data;
    } catch (error) {
      this.logger.error(USER_ERROR_MESSAGES.CREATE_DEVICE_PREFERENCE, error);
      error.response.data.targetLanguageCode = createDevicePreference.languageCode;
      throw error?.response?.data;
    }
  }
  async updateDevicePreference(updateDevicePreferenceDto: UpdateDevicePreferenceDto) {
    try {
      return (await this.httpService.axiosRef.patch(this.getUrl.getDevicePreferenceUrl, updateDevicePreferenceDto))
        ?.data;
    } catch (error) {
      this.logger.error(USER_ERROR_MESSAGES.UPDATE_DEVICE_PREFERENCE, error);
      throw error?.response?.data;
    }
  }

  async getDevicePreferenceById(deviceId: string) {
    try {
      const response = (await this.httpService.axiosRef.get(this.getUrl.getDevicePreferenceUrl + `/${deviceId}`))?.data;
      // const domains = response?.data?.domains;
      // const categories = response?.data?.categories;
      // const filteredDomains = filterArrayOfObjects(DOMAINS, domains);
      // const filteredCategories = filterArrayOfObjects(CATEGORIES, categories);
      // console.log('domains', filterArrayOfObjects(DOMAINS, domains));
      // console.log('categories', filterArrayOfObjects(CATEGORIES, categories));
      // response.data.domains = await Promise.all(
      //   filteredDomains.map(async (value: any) => {
      //     const y: any = extractKeys(value, ['title']);
      //     console.log('response.data.languageCode', response.data.languageCode);
      //     console.log('this.serverDefaultLanguage', this.serverDefaultLanguage);
      //     console.log('y', y);
      //     const x = await this.translationService.translateLanguage({
      //       to_ln: response.data.languageCode,
      //       from_ln: this.serverDefaultLanguage,
      //       text: y,
      //     });
      //     console.log('x', await x);
      //     return x;
      //   }),
      // );
      // response.data.categories = filteredCategories;
      return response;
    } catch (error) {
      this.logger.error(USER_ERROR_MESSAGES.GET_DEVICE_PREFERENCE, error);
      throw error?.response?.data;
    }
  }
}
