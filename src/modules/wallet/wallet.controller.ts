import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto, WalletQueryDto, WalletVcQueryDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerFileUploadConfig } from '../../config/multer/multer-file.config';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  // Endpoint to upload a file to the wallet
  @Post('uploadFile')
  @UseInterceptors(FileInterceptor('file', multerFileUploadConfig))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    return this.walletService.uploadFile(file, body);
  }

  // Endpoint to get wallet verifiable credentials (VCs)
  @Get('vc')
  getWalletVcs(@Query() walletVcQueryDto: WalletVcQueryDto) {
    return this.walletService.getWalletVcs(walletVcQueryDto);
  }

  // Endpoint to get wallet details
  @Get()
  getWallet(@Query() walletQueryDto: WalletQueryDto) {
    return this.walletService.getWalletDetails(walletQueryDto);
  }

  // Endpoint to create a new wallet
  @Post()
  createWallet(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.createWallet(createWalletDto);
  }

  // Endpoint to delete a wallet
  @Delete()
  deleteWallet(@Param() walletId: string) {
    return this.walletService.deleteWallet(walletId);
  }
}
