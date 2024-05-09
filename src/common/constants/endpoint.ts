/**
 * Constants for various API endpoints used throughout the application.
 */
export const Endpoints = {
  // eAuth service URLs
  eAuthProvidersUrl: '/api/v1/providers',
  eAuthUserInfoUrl: (provider: string) => `/api/v1/${provider}/get-user-details`,
  eAuthUserAccessTokenUrl: (provider: string) => `/api/v1/${provider}/get-access-token`,

  // Wallet service URLs
  walletUserWalletFilesUrl: '/api/v1/wallet/files',
  walletWalletUrl: '/api/v1/wallet',
  walletVcWalletFileUploadUrl: '/api/v1/wallet/files',
  getWalletVcUrl: '/api/v1/wallet/vc',
  getWalletSingleVcUrl: '/api/v1/wallet/vc/single',
  walletVcShareUrl: '/api/v1/wallet/vc/share',
  updateWalletVcSharedRequestUrl: '/api/v1/wallet/vc/share/requests/update',
  updateSharedVcStatusUrl: '/api/v1/wallet/vc/share/requests/status',
  walletVcSharedRequestsListUrl: '/api/v1/wallet/vc/share/requests',

  // User service URLs
  userSendOtpUrl: '/api/v1/auth/send-otp',
  userSendMpinOtpUrl: '/api/v1/auth/send-mpin-otp',
  userVerifyOtpUrl: '/api/v1/auth/verify-otp',
  userResendOtpUrl: '/api/v1/auth/resend-otp',
  verifyTokenUrl: '/api/v1/auth/verify-token',
  createUserMPinUrl: '/api/v1/auth/create-mpin',
  verifyUserMPinUrl: '/api/v1/auth/verify-mpin',
  resetMpinUrl: '/api/v1/auth/reset-mpin',
  refreshUserTokenUrl: '/api/v1/auth/refresh-token',
  logOutUserUrl: '/api/v1/auth/logout',
  userProfileUrl: '/api/v1/user',
  createUserUrl: '/api/v1/user/create',
  rolesUrl: '/api/v1/role',
  assignUserRoleUrl: '/api/v1/user/role',
  updateUserKycUrl: '/api/v1/user/kyc',
  userJourneyUrl: '/api/v1/user/journey',
  createDeviceLanguageUrl: '/api/v1/language-preference',
  getDeviceLanguageUrl: '/api/v1/language-preference',
  deleteDeviceLanguageUrl: '/api/v1/language-preference',
};
