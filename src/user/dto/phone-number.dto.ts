import { IsNotEmpty, IsPhoneNumber, IsString, MaxLength } from 'class-validator';

export class PhoneNumberDto {
  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString({ message: 'Phone number must be a string' })
  @IsPhoneNumber()
  phoneNumber: string;
}

export class OtpDto {
  @IsNotEmpty({ message: 'Otp is required' })
  @IsString({ message: 'Otp must be a string' })
  @MaxLength(4, { message: 'Otp must be of 4 digit' })
  otp: string;
}
