import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GetUrl extends ConfigService {
  eAuthUrl = this.get('eAuthUri');
  vcUrl = this.get('vcUrl');
  userServiceUrl = this.get('userServiceUrl');

  /**
   * Returns the URL for fetching providers from the eAuth service.
   * @returns The constructed URL for fetching providers.
   */
  getProvidersUrl = this.eAuthUrl + '/api/v1/providers';

  /**
   * Returns the URL for fetching user details from the eAuth service for a given provider.
   * @param provider - The name of the provider.
   * @returns The constructed URL for fetching user details.
   */
  getUserInfoUrl = (provider: string) => this.eAuthUrl + '/api/v1/' + provider + '/get-user-details';

  /**
   * Returns the URL for fetching user access token from the eAuth service for a given provider.
   * @param provider - The name of the provider.
   * @returns The constructed URL for fetching user access token.
   */
  getUserAccessTokenUrl = (porvider: string) => this.eAuthUrl + '/api/v1/' + porvider + '/get-access-token';

  /**
   * Returns the URL for fetching user wallet files from the verification service.
   * @returns The constructed URL for fetching user wallet files.
   */
  getUserWalletFilesUrl = this.vcUrl + '/api/v1/wallet/files';

  /**
   * Returns the URL for accessing the user's wallet in the verification service.
   * @returns The constructed URL for accessing the user's wallet.
   */
  getVcWalletUrl = this.vcUrl + '/api/v1/wallet';

  getVcWalletFileUploadUrl = this.vcUrl + '/api/v1/wallet/files';

  getUserSendOtpUrl = this.userServiceUrl + '/api/v1/auth/send-otp';
  getUserVerifyOtpUrl = this.userServiceUrl + '/api/v1/auth/verify-otp';
  getUserProfileUrl = this.userServiceUrl + '/api/v1/user';
  getRolesUrl = this.userServiceUrl + '/api/v1/role';
  assignUserRoleUrl = this.userServiceUrl + '/api/v1/user/role';
  updateUserKycUrl = this.userServiceUrl + '/api/v1/user/kyc';
  getUserJourneyUrl = this.userServiceUrl + '/api/v1/user/journey';
}
