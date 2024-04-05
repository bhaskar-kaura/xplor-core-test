import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class VerifyOtpDto {
  @IsNotEmpty({ message: 'Key is required' })
  @IsString({ message: 'Key must be a string' })
  key: string;

  @IsNotEmpty({ message: 'Otp is required' })
  @IsString({ message: 'Otp must be a string' })
  @MinLength(6, { message: 'Otp must be at least 6 characters' })
  @MaxLength(6, { message: 'Otp must be at most 6 characters' })
  otp: string;
}
