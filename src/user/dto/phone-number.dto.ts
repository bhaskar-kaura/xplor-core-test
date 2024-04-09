import { IsNotEmpty, IsString } from 'class-validator';

export class PhoneNumberDto {
  @IsNotEmpty()
  phoneNumber: string;
}

export class OtpDto {
  @IsString({ message: 'Otp must be a string' })
  otp: string;
}
