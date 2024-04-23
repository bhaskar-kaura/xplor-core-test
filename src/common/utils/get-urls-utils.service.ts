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

  // URL to share a VC with another user.
  getShareVcUrl = this.walletUrl + Endpoints.walletVcShareUrl;

  // URL to update the sharing status of a VC.
  updateSharedVcUrl = this.walletUrl + Endpoints.updateWalletVcSharedRequestUrl;

  // URL to fetch a list of shared VC requests.
  getVcSharedRequestsListUrl = this.walletUrl + Endpoints.walletVcSharedRequestsListUrl;

  // URL to update the status of a shared VC.
  updateSharedVcStatusUrl = this.walletUrl + Endpoints.updateSharedVcStatusUrl;

  // URL to fetch VC from the wallet service.
  getWalletVcUrl = this.walletUrl + Endpoints.getWalletVcUrl;

  // URL to fetch single VC from the wallet service.
  getWaletSingleVcUrl = this.walletUrl + Endpoints.getWalletSingleVcUrl;

  // URL to send OTP via user service.
  getUserSendOtpUrl = this.userServiceUrl + Endpoints.userSendOtpUrl;

  // URL to verify OTP via user service.
  getUserVerifyOtpUrl = this.userServiceUrl + Endpoints.userVerifyOtpUrl;

  // URL to resend OTP via user service.
  getUserResendOtpUrl = this.userServiceUrl + Endpoints.userResendOtpUrl;

  // URL to fetch user profile from user service.
  getUserProfileUrl = this.userServiceUrl + Endpoints.userProfileUrl;

  // URL to verify token from user service.
  verifyUserTokenUrl = this.userServiceUrl + Endpoints.verifyTokenUrl;

  // URL to create user MPIN via user service.
  createUserMPinUrl = this.userServiceUrl + Endpoints.createUserMPinUrl;

  // URL to verify user MPIN via user service.
  verifyUserMPinUrl = this.userServiceUrl + Endpoints.verifyUserMPinUrl;

  // URL to refresh user token via user service.
  refreshUserTokenUrl = this.userServiceUrl + Endpoints.refreshUserTokenUrl;

  logOutUserUrl = this.userServiceUrl + Endpoints.logOutUserUrl;

  // URL to fetch roles from user service.
  getRolesUrl = this.userServiceUrl + Endpoints.rolesUrl;

  // URL to assign a user role in user service.
  assignUserRoleUrl = this.userServiceUrl + Endpoints.assignUserRoleUrl;

  // URL to update user KYC information via user service.
  updateUserKycUrl = this.userServiceUrl + Endpoints.updateUserKycUrl;

  // URL to fetch user journey details via user service.
  getUserJourneyUrl = this.userServiceUrl + Endpoints.userJourneyUrl;
}
