import { IsOptional, IsString } from 'class-validator';

export class WalletQueryDto {
  @IsOptional()
  @IsString()
  readonly userId: string;

  @IsOptional()
  @IsString()
  readonly walletId: string;
}
