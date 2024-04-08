import { IsString } from 'class-validator';

export class PhoneNumberDto {
  @IsString({ message: 'Phone number must be a string' })
  phoneNumber: string;
}

export class OtpDto {
  @IsString({ message: 'Otp must be a string' })
  otp: string;
}
