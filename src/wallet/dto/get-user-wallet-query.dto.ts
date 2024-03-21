import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetUserWalletFilesQueryDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsOptional()
  page: string;

  @IsOptional()
  pageSize: string;
}
