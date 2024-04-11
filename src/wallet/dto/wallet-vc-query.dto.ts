import { IsOptional } from 'class-validator';

export class WalletVcQueryDto {
  @IsOptional()
  walletId: string;

  @IsOptional()
  category?: string;

  @IsOptional()
  searchQuery?: string;

  @IsOptional()
  tags?: string[];

  @IsOptional()
  page: number;

  @IsOptional()
  pageSize: number;
}
