import { IsOptional } from 'class-validator';

export class VerifyOtpDto {
  @IsOptional()
  key: string;

  @IsOptional()
  otp: string;
}
