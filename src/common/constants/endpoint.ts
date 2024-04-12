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
  walletWalletVcUrl: '/api/v1/wallet/vc',

  // User service URLs
  userSendOtpUrl: '/api/v1/auth/send-otp',
  userVerifyOtpUrl: '/api/v1/auth/verify-otp',
  userResendOtpUrl: '/api/v1/auth/resend-otp',
  userProfileUrl: '/api/v1/user',
  rolesUrl: '/api/v1/role',
  assignUserRoleUrl: '/api/v1/user/role',
  updateUserKycUrl: '/api/v1/user/kyc',
  userJourneyUrl: '/api/v1/user/journey',
};
