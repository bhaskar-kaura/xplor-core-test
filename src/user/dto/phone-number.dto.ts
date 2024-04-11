import { IsOptional } from 'class-validator';

export class PhoneNumberDto {
  @IsOptional()
  phoneNumber: string;
}

export class OtpDto {
  @IsOptional()
  otp: string;
}
