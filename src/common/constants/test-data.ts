export const mockedProviders = {
  success: true,
  data: [
    {
      code: 'digilocker',
      iconLink: 'https://example.com/icon1.png',
      title: 'Provider 1',
      subTitle: 'Sub Title 1',
      redirectUrl:
        'https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize?client_id=digilocker.DIGILOCKER_CLIENT_ID.1234&response_type=code&redirect_uri=https://27d9-115-240-127-98.ngrok-free.app/&state=4c303ce6-f2c8-4fd1-bc5e-01731864137b&dl_flow=signup&scope=openid&amr=all&purpose=kyc',
    },
    {
      code: 'googleAuth',
      iconLink: 'https://example.com/icon2.png',
      title: 'Provider 2',
      subTitle: 'Sub Title 2',
      redirectUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?client_id=176374181215-48abfaqar3inr5i9acpbp9qplesp76ib.apps.googleusercontent.com&redirect_uri=https://27d9-115-240-127-98.ngrok-free.app/&scope=openid profile email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/drive&response_type=code',
    },
  ],
};
export const mockedUserDetails = {
  tokenDetails: {
    access_token: 'bc125c212a4b03a9a188a858be5a163f379e878a',
    expires_in: 3600,
    token_type: 'Bearer',
    scope: 'openid files.issueddocs partners.PANCR partners.DRVLC',
    consent_valid_till: 1684731048,
    id_token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjVmOWRkNjI3ZDRlNDVlNmM5OGViZGJkOWU5YmIxMzI0In0.eyJpc3MiOiJodHRwczpcL1wvYXBpLmRpZ2l0YWxsb2NrZXIuZ292LmluIiwic3ViIjoiYWppdC5kbCIsImF1ZCI6IkFCQ0RFRkdIIiwiaWF0IjoxNjU0MTQ1OTc1LCJleHAiOjE2NTQyMzIzNzUsImF1dGhfdGltZSI6MTY1NDE0NTk3NSwiZ2l2ZW5fbmFtZSI6IkFqaXQgS3VtYXIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhaml0LmRsIiwiZW1haWwiOiJhaml0Lmt1bWFyQGRpZ2lsb2NrZXIuZ2l2LmluIiwiYmlydGhkYXRlIjoiMDFcLzAxXC8xOTkwIiwicGhvbmVfbnVtYmVyIjoiOTg3NjU0MzIxMCIsImp0aSI6IjNmZmQ5OGQzLTAzMjEtNDQxYS1iMmVhLTE4YTY2ZDU1YWEwYiIsInVzZXJfc3NvX2lkIjoiREwtOTNmMzM5MGMtNmQ5Mi0xMWU5LWE4NWUtOTQ1N2E1NjQ1MDY5IiwicGFuX251bWJlciI6IkFCQ0RLMTIzMkciLCJkcml2aW5nX2xpY2VuY2UiOiJETDAxMjAyMjAwMDAwMDAxIiwibWFza2VkX2FhZGhhYXIiOiJ4eHh4eHh4MTIzNCJ9.ZNfwZpf4ws7btEHxpRV9sOTRDR1g4CpnQEJi3VXLbdYrvDEwLyGpnQ8uQ9g1cq_mTmv11K2scaRd16Cg9AKBl51FVuXW4_WJC7CmIOz4Ys9YJf_m4NU3v4mVaDDOjLV6RHX9G6uHtS9Llemek-8yIE4rjcjUabq0vlC5JkclAcYcRY7pTGm0BKRQU4OSktKFcR_X5b7dnwU08qJkpeCsL9B72gbCAdxLK8ZQp6npjX0BZU8ocieRaARS_5MjpAJVkNAwgUQ0rv_nwh15jG9P9bjGmVVn6djlBZ_PWJbLcxtfJEUFSeMupv',
    refresh_token: 'a47ab18c593703e4f83a274694db7422a8cfcb8f',
  },
  userDetails: {
    given_name: 'Ajit Kumar',
    preferred_username: 'ajit.dl',
    email: 'ajit.kumar@digilocker.giv.in',
    birthdate: '01/01/1990',
    phone_number: '9876543210',
    user_sso_id: 'DL-93f3390c-6d92-11e9-a85e-9457a5645069',
    pan_number: 'ABCDK1232G',
    driving_licence: 'DL01202200000001',
    masked_aadhaar: 'xxxxxxx1234',
    digilockerid: '123e4567-e89b-12d3-a456-426655440000',
    verified: true,
  },
};
