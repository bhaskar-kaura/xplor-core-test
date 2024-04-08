import { IsString } from 'class-validator';

export class ResendOtpDto {
  @IsString()
  key: string;
}
