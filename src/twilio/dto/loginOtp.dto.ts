import { IsNotEmpty, IsOptional } from 'class-validator';
// import { UserType } from '../../utils/enums/enums';

export class LoginOtp {
  // @IsEnum(UserType)
  @IsOptional()
  phoneNumber?: string;

  @IsNotEmpty()
  otp: string;
}
