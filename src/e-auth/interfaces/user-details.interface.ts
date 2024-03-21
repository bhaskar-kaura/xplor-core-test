interface ITokenDetails {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  consent_valid_till: number;
  id_token: string;
  refresh_token: string;
}

interface IUserDetails {
  given_name: string;
  preferred_username: string;
  email: string;
  birthdate: string;
  phone_number: string;
  user_sso_id: string;
  pan_number: string;
  driving_licence: string;
  masked_aadhaar: string;
  digilockerid: string;
  verified: boolean;
}

export interface ITokenAndUserDetails {
  tokenDetails: ITokenDetails;
  userDetails: IUserDetails;
}
