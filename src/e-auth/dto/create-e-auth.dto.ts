import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEAuthDto {
  @IsNotEmpty()
  @IsString()
  provider: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  scope?: string;

  @IsOptional()
  @IsString()
  access_token?: string;

  @IsOptional()
  @IsString()
  expires_in?: string;

  @IsOptional()
  @IsString()
  token_type?: string;
}
