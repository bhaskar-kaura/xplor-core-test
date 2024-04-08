import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { WalletService } from './wallet.service';
// import { CreateWalletDto } from './dto/create-wallet.dto';
// import { UpdateWalletDto } from './dto/update-wallet.dto';
import { CreateWalletDto, GetUserWalletFilesQueryDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerFileUploadConfig } from '../config/multer/multer-file.config';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('/:walletId')
  getWallet(@Param() walletId: string) {
    return this.walletService.getWalletDetails(walletId);
  }

  @Post('uploadFile')
  @UseInterceptors(FileInterceptor('file', multerFileUploadConfig))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    return this.walletService.uploadFile(file, body);
  }

  @Get()
  getUserWalletFiles(@Query() getUserWalletFilesQueryDto: GetUserWalletFilesQueryDto) {
    return this.walletService.findUserWalletFiles(getUserWalletFilesQueryDto);
  }

  @Post()
  createWallet(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.createWallet(createWalletDto);
  }
}
