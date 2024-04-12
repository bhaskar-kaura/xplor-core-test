import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Endpoints } from '../constants/endpoint'; // Assuming 'endpoints' file path

/**
 * A service to get various URLs used across the application for eAuth, Wallet, and User services.
 */
@Injectable()
export class GetUrl extends ConfigService {
  // URLs from environment variables.
  eAuthUrl = this.get('eAuthUri');
  walletUrl = this.get('walletUrl');
  userServiceUrl = this.get('userServiceUrl');

  // URL to get list of providers from eAuth service.
  getProvidersUrl = this.eAuthUrl + Endpoints.eAuthProvidersUrl;

  /**
   * Constructs URL to get user details from eAuth service for a specific provider.
   * @param provider - The name of the eAuth provider.
   * @returns The URL to fetch user details.
   */
  getUserInfoUrl = (provider: string) => this.eAuthUrl + Endpoints.eAuthUserInfoUrl(provider);

  /**
   * Constructs URL to get user access token from eAuth service for a specific provider.
   * @param provider - The name of the eAuth provider.
   * @returns The URL to fetch user access token.
   */
  getUserAccessTokenUrl = (provider: string) => this.eAuthUrl + Endpoints.eAuthUserAccessTokenUrl(provider);

  // URL to fetch user wallet files from the wallet service.
  getUserWalletFilesUrl = this.walletUrl + Endpoints.walletUserWalletFilesUrl;

  // URL to access user's wallet in the wallet service.
  getWalletUrl = this.walletUrl + Endpoints.walletWalletUrl;

  // URL for uploading wallet files to the VC wallet service.
  getVcWalletFileUploadUrl = this.walletUrl + Endpoints.walletVcWalletFileUploadUrl;

  // URL to fetch VC from the wallet service.
  getWalletVcUrl = this.walletUrl + Endpoints.walletWalletVcUrl;

  // URL to send OTP via user service.
  getUserSendOtpUrl = this.userServiceUrl + Endpoints.userSendOtpUrl;

  // URL to verify OTP via user service.
  getUserVerifyOtpUrl = this.userServiceUrl + Endpoints.userVerifyOtpUrl;

  // URL to resend OTP via user service.
  getUserResendOtpUrl = this.userServiceUrl + Endpoints.userResendOtpUrl;

  // URL to fetch user profile from user service.
  getUserProfileUrl = this.userServiceUrl + Endpoints.userProfileUrl;

  // URL to fetch roles from user service.
  getRolesUrl = this.userServiceUrl + Endpoints.rolesUrl;

  // URL to assign a user role in user service.
  assignUserRoleUrl = this.userServiceUrl + Endpoints.assignUserRoleUrl;

  // URL to update user KYC information via user service.
  updateUserKycUrl = this.userServiceUrl + Endpoints.updateUserKycUrl;

  // URL to fetch user journey details via user service.
  getUserJourneyUrl = this.userServiceUrl + Endpoints.userJourneyUrl;
}
