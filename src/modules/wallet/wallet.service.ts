import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GetUrl, ResponseUtilsService } from '../../common/utils';
import { CreateWalletDto, GetUserWalletFilesQueryDto, WalletQueryDto, WalletVcQueryDto } from './dto';
import { CustomMessage } from '../../common/enums/message';

@Injectable()
export class WalletService {
  private readonly logger: Logger;

  // Constructor to inject dependencies
  constructor(
    private readonly httpService: HttpService,
    private readonly getUrl: GetUrl,
    private responseUtilsService: ResponseUtilsService,
  ) {
    this.logger = new Logger(WalletService.name);
  }

  // Method to create a new wallet
  async createWallet(createWalletDto: CreateWalletDto) {
    try {
      // Make a POST request to create a wallet
      const walletData = (await this.httpService.axiosRef.post(this.getUrl.getWalletUrl, createWalletDto)).data;
      return walletData;
    } catch (error) {
      // Log the error and return the error response
      this.logger.error('Error creating wallet', error);
      return error?.response?.data;
    }
  }

  // Method to delete a wallet
  async deleteWallet(walletId: string) {
    try {
      // Make a DELETE request to delete a wallet
      const walletData = (await this.httpService.axiosRef.delete(this.getUrl.getWalletUrl + '/' + walletId)).data;
      return walletData;
    } catch (error) {
      // Log the error and return the error response
      this.logger.error('Error deleting wallet', error);
      return error?.response?.data;
    }
  }

  // Method to get wallet details
  async getWalletDetails(walletQueryDto: WalletQueryDto) {
    try {
      // Make a GET request to fetch wallet details
      const walletData = (await this.httpService.axiosRef.get(this.getUrl.getWalletUrl, { params: walletQueryDto }))
        .data;
      return walletData;
    } catch (error) {
      // Log the error and return the error response
      this.logger.error(`Error fetching wallet details `, error);
      return error?.response?.data;
    }
  }

  // Method to get wallet verifiable credentials (VCs)
  async getWalletVcs(walletVcQueryDto: WalletVcQueryDto) {
    try {
      // Make a GET request to fetch wallet VCs
      const walletData = (await this.httpService.axiosRef.get(this.getUrl.getWalletVcUrl, { params: walletVcQueryDto }))
        .data;
      return walletData;
    } catch (error) {
      // Log the error and return the error response
      this.logger.error(`Error fetching wallet vcs `, error);
      return error?.response?.data;
    }
  }

  // Method to upload a file to the wallet
  async uploadFile(file: Express.Multer.File, body: any) {
    try {
      // Prepare the form data for file upload
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

      // Make a POST request to upload the file
      const response = (
        await this.httpService.axiosRef.post(this.getUrl.getVcWalletFileUploadUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      ).data;
      return this.responseUtilsService.getSuccessResponse(response.data, CustomMessage.OK);
    } catch (error) {
      // Log the error and throw it
      this.logger.error('Error uploading file', error);
      throw error;
    }
  }

  // Method to find user wallet files
  async findUserWalletFiles(getUserWalletFilesQueryDto: GetUserWalletFilesQueryDto) {
    try {
      // Make a GET request to fetch user wallet files
      const walletFilesData = (
        await this.httpService.axiosRef.get(this.getUrl.getUserWalletFilesUrl, {
          params: getUserWalletFilesQueryDto,
        })
      ).data;
      return this.responseUtilsService.getSuccessResponse(walletFilesData, CustomMessage.OK);
    } catch (error) {
      // Log the error and throw it
      this.logger.error('Error fetching user wallet files', error);
      throw error;
    }
  }
}
