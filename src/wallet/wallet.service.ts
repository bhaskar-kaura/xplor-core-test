import { Injectable, Logger } from '@nestjs/common';
// import { CreateWalletDto } from './dto/create-wallet.dto';
// import { UpdateWalletDto } from './dto/update-wallet.dto';

import { HttpService } from '@nestjs/axios';
import { GetUrl, ResponseUtilsService } from '../common/utils';
import { CreateWalletDto, GetUserWalletFilesQueryDto } from './dto';
import { CustomMessage } from '../common/enums/message';

@Injectable()
export class WalletService {
  private readonly logger: Logger;
  constructor(
    private readonly httpService: HttpService,
    private readonly getUrl: GetUrl,
    private responseUtilsService: ResponseUtilsService,
  ) {
    this.logger = new Logger(WalletService.name);
  }
  async createWallet(createWalletDto: CreateWalletDto) {
    try {
      const walletData = (await this.httpService.axiosRef.post(this.getUrl.getWalletUrl, createWalletDto)).data;
      return this.responseUtilsService.getSuccessResponse(walletData, CustomMessage.OK);
    } catch (error) {
      this.logger.error('Error creating wallet', error);
      throw error;
    }
  }
  async getWalletDetails(walletId: string) {
    try {
      const walletData = (await this.httpService.axiosRef.get(this.getUrl.getWalletUrl + '/' + walletId)).data;

      return this.responseUtilsService.getSuccessResponse(walletData, CustomMessage.OK);
    } catch (error) {
      this.logger.error(`Error fetching wallet details for walletId: ${walletId}`, error);
      throw error;
    }
  }

  async findUserWalletFiles(getUserWalletFilesQueryDto: GetUserWalletFilesQueryDto) {
    try {
      const walletFilesData = (
        await this.httpService.axiosRef.get(this.getUrl.getUserWalletFilesUrl, {
          params: getUserWalletFilesQueryDto,
        })
      ).data;
      return this.responseUtilsService.getSuccessResponse(walletFilesData, CustomMessage.OK);
    } catch (error) {
      this.logger.error('Error fetching user wallet files', error);
      throw error;
    }
  }
  async uploadFile(file: Express.Multer.File, body: any) {
    try {
      // Prepare the form data
      const fileBuffer = file.buffer;
      const blob = new Blob([fileBuffer], { type: file.mimetype });

      const formData = new FormData();
      formData.append('file', blob, body.fileName);
      formData.append('userId', body.userId);
      formData.append('fileType', body.fileType);
      for (const tag of body.fileTags) {
        formData.append('fileTags', tag);
      }

      formData.append('fileName', body.fileName);
      formData.append('metadata', JSON.stringify(body.metadata));

      // Make the POST request
      const response = (
        await this.httpService.axiosRef.post(this.getUrl.getVcWalletFileUploadUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      ).data;

      return this.responseUtilsService.getSuccessResponse(response.data, CustomMessage.OK);
    } catch (error) {
      this.logger.error('Error uploading file', error);
      throw error;
    }
  }
}
