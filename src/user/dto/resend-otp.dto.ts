import { IsOptional } from 'class-validator';

export class ResendOtpDto {
  @IsOptional()
  key: string;
}
