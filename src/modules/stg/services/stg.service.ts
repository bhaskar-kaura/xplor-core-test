import { Injectable } from '@nestjs/common';
import { SearchRequestDto } from '../dto/search-request.dto';
import { HttpService } from '@nestjs/axios';
import { GetUrl } from '../../../common/utils';
import { searchRequestMapper } from '../../../common/utils/search-request-builder.utils';
import { TranslateService } from '../../../common/utils/translate/translate.service';
import { GetDeviceService } from '../../../common/utils/getDevice/get-device';
import { ConfigService } from '@nestjs/config';
import { SelectRequestDto } from '../dto/select-request.dto';
import { InitRequestDto } from '../dto/init-request.dto';
import { ConfirmRequestDto } from '../dto/confirm-request.dto';

@Injectable()
export class StgService {
  private deviceIdMapper: Map<string, any> = new Map();
  private serverDefaultLanguage: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly getUrl: GetUrl,
    private readonly translation: TranslateService,
    private readonly configService: ConfigService,
    private readonly getDeviceService: GetDeviceService,
  ) {
    this.deviceIdMapper = new Map();
    this.serverDefaultLanguage = this.configService.get('serverDefaultLanguage');
  }

  async search(searchRequestDto: SearchRequestDto) {
    try {
      const searchRequest = searchRequestMapper(searchRequestDto);
      this.deviceIdMapper.set(searchRequestDto?.context?.transaction_id, searchRequestDto.deviceId);

      const searchResponse = (await this.httpService.axiosRef.post(this.getUrl.getStgSearchUrl, searchRequest))?.data;
      return searchResponse;
    } catch (error) {
      throw error?.response?.data;
    }
  }

  async select(selectRequestDto: SelectRequestDto) {
    try {
      const selectResponse = (await this.httpService.axiosRef.post(this.getUrl.getStgSelectUrl, selectRequestDto))
        ?.data;
      return selectResponse;
    } catch (error) {
      throw error?.response?.data;
    }
  }

  async init(initRequestDto: InitRequestDto) {
    try {
      const initResponse = (await this.httpService.axiosRef.post(this.getUrl.getStgInitUrl, initRequestDto))?.data;
      return initResponse;
    } catch (error) {
      throw error?.response?.data;
    }
  }

  async confirm(confirmRequestDto: ConfirmRequestDto) {
    try {
      const initResponse = (await this.httpService.axiosRef.post(this.getUrl.getStgConfirmUrl, confirmRequestDto))
        ?.data;
      return initResponse;
    } catch (error) {
      throw error?.response?.data;
    }
  }

  async onSearch(
    searchRequestDto: any,
    connectedClients: Map<string, any>,
    sendDataToClients: (transactionId: string, data: any, connectedClients: Map<string, any>) => void,
  ) {
    try {
      const deviceId = this.deviceIdMapper.get(searchRequestDto?.context?.transaction_id);
      const deviceInfo = await this.getDeviceService.getDevicePreferenceById(deviceId);
      const targetLanguageCode = deviceInfo?.languageCode || this.serverDefaultLanguage;
      // Send this response in SSE/Socket to the mobile app
      await this.translation.translateItemPayload(searchRequestDto?.data, targetLanguageCode);
      sendDataToClients(searchRequestDto?.context?.transaction_id, searchRequestDto?.data, connectedClients);
      // console.log('translatedData', JSON.stringify(translatedData))
      return searchRequestDto;
    } catch (error) {
      throw error?.response?.data;
    }
  }

  async onSelect(selectResponseDto: SelectRequestDto) {
    try {
      const selectResponse = (await this.httpService.axiosRef.post(this.getUrl.getStgSelectUrl, selectResponseDto))
        ?.data;
      return selectResponse;
    } catch (error) {
      throw error?.response?.data;
    }
  }

  async onInit(initRequestDto: InitRequestDto) {
    try {
      const initResponse = (await this.httpService.axiosRef.post(this.getUrl.getStgInitUrl, initRequestDto))?.data;
      return initResponse;
    } catch (error) {
      throw error?.response?.data;
    }
  }

  async onConfirm(confirmRequestDto: ConfirmRequestDto) {
    try {
      const initResponse = (await this.httpService.axiosRef.post(this.getUrl.getStgConfirmUrl, confirmRequestDto))
        ?.data;
      return initResponse;
    } catch (error) {
      throw error?.response?.data;
    }
  }
}
