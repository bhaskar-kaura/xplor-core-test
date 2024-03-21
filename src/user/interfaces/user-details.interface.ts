import { AuthMethod } from '../enums/auth-method.enum';
import { ApiProperty } from '@nestjs/swagger';
// Assuming these are your interfaces in user-details.interface.ts
export interface UserDetails {
  given_name: string;
  preferred_username: string;
  email: string;
  birthdate: string;
  phone_number: string;
  user_sso_id: string;
  pan_number: string;
  driving_licence: string;
  masked_aadhaar: string;
}

export interface Persona {
  interest?: string[];
  choice?: string[];
}

export interface EAuth {
  method: AuthMethod;
  verified: boolean;
  token: {
    access_token?: string;
    expires_in?: number;
    token_type?: string;
    scope?: string;
    consent_valid_till?: number;
    id_token?: string;
  };
}

// Corresponding classes
export class UserDetailsClass implements UserDetails {
  given_name: string;
  preferred_username: string;
  email: string;
  birthdate: string;
  phone_number: string;
  user_sso_id: string;
  pan_number: string;
  driving_licence: string;
  masked_aadhaar: string;
}

export class PersonaClass implements Persona {
  @ApiProperty({ example: ['interest1', 'interest2'], type: [String] })
  interest?: string[];
  @ApiProperty({ example: ['choice1', 'choice2'], type: [String] })
  choice?: string[];
}

export class EAuthClass implements EAuth {
  method: AuthMethod;
  verified: boolean;
  token: {
    access_token?: string;
    expires_in?: number;
    token_type?: string;
    scope?: string;
    consent_valid_till?: number;
    id_token?: string;
  };
}
