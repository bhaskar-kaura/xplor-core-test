import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { WalletService } from './wallet.service';
// import { CreateWalletDto } from './dto/create-wallet.dto';
// import { UpdateWalletDto } from './dto/update-wallet.dto';
import { CreateWalletDto, WalletQueryDto, WalletVcQueryDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerFileUploadConfig } from '../config/multer/multer-file.config';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('uploadFile')
  @UseInterceptors(FileInterceptor('file', multerFileUploadConfig))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    return this.walletService.uploadFile(file, body);
  }

  @Get('vc')
  getWalletVcs(@Query() walletVcQueryDto: WalletVcQueryDto) {
    return this.walletService.getWalletVcs(walletVcQueryDto);
  }
  @Get()
  getWallet(@Query() walletQueryDto: WalletQueryDto) {
    return this.walletService.getWalletDetails(walletQueryDto);
  }
  @Post()
  createWallet(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.createWallet(createWalletDto);
  }
  @Delete()
  deleteWallet(@Param() walletId: string) {
    return this.walletService.deleteWallet(walletId);
  }
}
