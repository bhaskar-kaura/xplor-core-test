import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateEAuthDto } from './dto/create-e-auth.dto';
import { GetUrl } from '../../common/utils/get-urls-utils.service';
import { IProvider } from './interfaces/provider.interface';
import { ResponseUtilsService } from '../../common/utils/response-utils.service';
import { ITokenAndUserDetails } from './interfaces';
import { CustomMessage } from '../../common/enums/message';
import { CallBackQueryDto } from '../app/dto/callback-query.dto';
import { IBasicUserDetails, ICreateKycDto } from '../app/interface/userDetails';

// Define the EAuthService with necessary methods
@Injectable()
export class EAuthService {
  private readonly logger: Logger;
  constructor(
    private readonly httpService: HttpService,
    private readonly getUrl: GetUrl,
    private responseUtilsService: ResponseUtilsService,
  ) {
    this.logger = new Logger(EAuthService.name);
  }
  // Method to get user details
  async getUser(createEAuthDto: CreateEAuthDto) {
    try {
      const userDetails: ITokenAndUserDetails = (
        await this.httpService.axiosRef.get(this.getUrl.getUserInfoUrl(createEAuthDto.provider), {
          params: { code: createEAuthDto.code },
        })
      ).data;
      return this.responseUtilsService.getSuccessResponse(userDetails, CustomMessage.OK);
    } catch (error) {
      this.logger.error('Failed to fetch userDetails', error);
      throw error;
    }
  }

  // Method to get list of providers
  async getProviders(token: string) {
    try {
      const responseData: IProvider[] = (
        await this.httpService.axiosRef.get(this.getUrl.getProvidersUrl, {
          headers: {
            Authorization: token,
          },
        })
      ).data;
      const providerData = this.responseUtilsService.getSuccessResponse(responseData, CustomMessage.OK);

      return providerData;
    } catch (error) {
      this.logger.error('Failed to fetch providers', error);
      throw error;
    }
  }

  async getAccessToken(provider: string) {
    try {
      const accessToken: string = (await this.httpService.axiosRef.get(this.getUrl.getUserAccessTokenUrl(provider)))
        .data;
      return this.responseUtilsService.getSuccessResponse(accessToken, CustomMessage.OK);
    } catch (error) {
      this.logger.error('Failed to fetch accessToken', error);
      throw error;
    }
  }
  // Method to get access token
  // Method to update user on callback
  async updateUserOnCallBack(callBackQueryDto: CallBackQueryDto): Promise<any> {
    try {
      const userDetails: IBasicUserDetails = (
        await this.httpService.axiosRef.get(this.getUrl.getUserInfoUrl(callBackQueryDto.provider), {
          params: callBackQueryDto,
        })
      ).data;
      const userName = userDetails.given_name.split(' ');
      const kycUserDetails: ICreateKycDto = {
        lastName: userName[userName.length - 1], // Assuming given_name is the last name
        firstName: userName[0], // Assuming given_name is the first name
        address: JSON.stringify(userDetails.address) || '', // Using addres if available, otherwise an empty string
        gender: userDetails.gender || '', // Using gender if available, otherwise an empty string
        provider: {
          id: userDetails.user_sso_id, // Using user_sso_id as the provider id
          name: 'digilocker', // Placeholder for provider name, as it's not present in IBasicUserDetails
        },
      };

      const updatedUserKycData = await this.httpService.axiosRef.patch(this.getUrl.updateUserKycUrl, kycUserDetails, {
        headers: { Authorization: callBackQueryDto.state },
      });

      return updatedUserKycData.data;
    } catch (error) {
      this.logger.error('Failed to fetch userDetails', error);
      return error.response.data;
    }
  }
}
