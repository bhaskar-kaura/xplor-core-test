import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import {
  CountryAndStateDto,
  CreateGuestLanguageDto,
  CreateRegionLanguageDto,
  QueryDeviceIdDto,
  QueryRegionLanguageDto,
  TranslateDto,
} from './dto';
import { GetUrl, SanitizeService } from '../../common/utils';
import { LatLongDto } from '../../common/utils/dto/lat-long.dto';
import { GetAddressService } from '../../common/utils/get-address.service';
import { LANGUAGES } from '../../common/constants/languages/languages';
import { DOMAINS } from '../../common/constants/domains/domains';
import { CATEGORIES } from '../../common/constants/categories/categories';
import { CustomMessage } from '../../common/enums/message';
import { OtherLanguages } from '../../common/constants/languages/other-languages-tile';
import { GetDeviceService } from '../../common/utils/getDevice/get-device';
import { DeviceIdDto } from '../../common/utils/dto/device-dto';
import { TranslateService } from '../../common/utils/translate/translate.service';
import { KeysForCategories, KeysForGetDomain } from '../../common/constants/keys-to-translate/translate';

@Injectable()
export class AiMlService {
  private readonly serverDefaultLanguage: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly getUrl: GetUrl,
    private readonly getAddressService: GetAddressService,
    private readonly sanitizeService: SanitizeService,
    private readonly getDeviceService: GetDeviceService,
    private readonly configService: ConfigService,
    private readonly translateService: TranslateService,
  ) {
    this.serverDefaultLanguage = this.configService.get('serverDefaultLanguage');
  }

  // Endpoint to create device language preference
  async createDeviceLanguagePreference(createLanguage: CreateGuestLanguageDto) {
    try {
      return (await this.httpService.axiosRef.post(this.getUrl.getCreateDeviceLanguageUrl, createLanguage))?.data;
    } catch (error) {
      throw error?.response?.data;
    }
  }

  // Endpoint to get device language preference
  async getDeviceLanguagePreference(queryDeviceIdDto: QueryDeviceIdDto) {
    try {
      return (
        await this.httpService.axiosRef.get(this.getUrl.getDeviceLanguageUrl, {
          params: queryDeviceIdDto,
        })
      )?.data;
    } catch (error) {
      throw error?.response?.data;
    }
  }

  // Endpoint to delete device language preference
  async deleteDeviceLanguagePreference(queryDeviceIdDto: QueryDeviceIdDto) {
    try {
      return (
        await this.httpService.axiosRef.delete(this.getUrl.getDeleteDeviceLanguageUrl, {
          params: queryDeviceIdDto,
        })
      )?.data;
    } catch (error) {
      throw error?.response?.data;
    }
  }

  // Endpoint to translate language
  async translateLanguage(translate: TranslateDto) {
    try {
      const requestBody = {
        text: translate.content,
        from_ln: translate.sourceLanguage,
        to_ln: translate.targetLanguage,
      };
      return (await this.httpService.axiosRef.post(this.getUrl.getTranslateLanguageUrl, requestBody))?.data;
    } catch (error) {
      throw error?.response?.data;
    }
  }

  // Endpoint to get supported languages
  async getSupportedLanguages() {
    try {
      return (await this.httpService.axiosRef.get(this.getUrl.getSupportedLanguageUrl))?.data;
    } catch (error) {
      throw error?.response?.data;
    }
  }

  async createRegionLanguages(createRegionLanguageDto: CreateRegionLanguageDto) {
    try {
      return (await this.httpService.axiosRef.post(this.getUrl.getRegionLanguageUrl, createRegionLanguageDto))?.data
        ?.data;
    } catch (error) {
      throw error?.response?.data;
    }
  }

  async getRegionLanguages(QueryRegionLanguageDto: QueryRegionLanguageDto) {
    try {
      return (await this.httpService.axiosRef.get(this.getUrl.getRegionLanguageUrl, { params: QueryRegionLanguageDto }))
        .data?.data;
    } catch (error) {
      throw error?.response?.data;
    }
  }

  // Endpoint to get languages for user
  async getLanguagesForCountryAndState(countryAndStateDto: CountryAndStateDto) {
    try {
      return (await this.httpService.axiosRef.post(this.getUrl.getLanguagesForCountryAndStateUrl, countryAndStateDto))
        .data;
    } catch (error) {
      throw error?.response?.data;
    }
  }

  // Endpoint to get languages for user
  async getLanguagesForUser(latLongDto: LatLongDto) {
    // Get country and state
    const countryAndState: CountryAndStateDto = await this.getAddressService.getCountryAndState(latLongDto);
    // Get supported languages
    const supportedLanguages = await this.getSupportedLanguages();

    const sanitizeRegion = this.sanitizeService.sanitizeRegion(countryAndState);
    let languageArray: any;
    const regionLanguages = await this.getRegionLanguages({
      region: sanitizeRegion,
    });
    languageArray = regionLanguages[0];
    if (regionLanguages.length === 0) {
      const newLanguageArray = await this.getLanguagesForCountryAndState(countryAndState);
      if (newLanguageArray) {
        const newRegionLangauge = await this.createRegionLanguages({
          region: sanitizeRegion,
          languages: newLanguageArray,
        });
        languageArray = newRegionLangauge;
      }
    }

    await languageArray;
    // Create maps for faster lookup
    const languageMap = supportedLanguages?.supported_languages;
    const languageDataMap = {};

    // Populate languageDataMap with language details from LANGUAGES
    LANGUAGES.forEach((lang) => {
      languageDataMap[lang.language] = lang;
    });

    // Find intersection and construct mixed array
    const mixedArray = [];
    languageArray.languages.forEach((lang) => {
      // Check if the language is supported and relevant to the user's location
      if (languageMap[lang.language] && languageDataMap[lang.language]) {
        // Construct a new object that combines data from both sources
        mixedArray.push({
          language: lang.language, // The language name
          languageCode: languageMap[lang.language], // The language code from supportedLanguages
          percentage: lang.percentage, // The language's usage percentage in the user's region
          symbol: languageDataMap[lang.language].symbol, // The language's symbol
          native_language: languageDataMap[lang.language].native_language, // The language's native name
          // Add other properties from languageDataMap[lang.language] as needed
        });
      }
    });
    const isDefaultLanguage = mixedArray.filter((lang) => lang.language === OtherLanguages.language);
    return {
      success: true,
      message: CustomMessage.OK,
      data: {
        regionalLanguages: mixedArray.length !== 0 ? mixedArray : [],
        otherLanguages: isDefaultLanguage.length !== 0 ? [] : OtherLanguages,
      },
    };
  }

  // Endpoint to get focus
  async getDomains(deviceIdDto: DeviceIdDto) {
    console.log('deviceIdDto', deviceIdDto);
    try {
      const deviceInfo = await this.getDeviceService.getDevicePreferenceById(deviceIdDto.deviceId);
      const targetLanguageCode = deviceInfo?.languageCode || this.serverDefaultLanguage;
      const translatedResponse = await this.translateService.translateArrayWithKeysToLanguage(
        DOMAINS,
        KeysForGetDomain,
        targetLanguageCode,
      );
      console.log('translatedResponse', translatedResponse);
      return {
        success: true,
        message: CustomMessage.OK,
        data: translatedResponse,
      };
    } catch (error) {
      console.log('error', error);
      throw error?.response?.data;
    }
  }

  // Endpoint to get focus
  async getCategories(deviceIdDto: DeviceIdDto) {
    try {
      const deviceInfo = await this.getDeviceService.getDevicePreferenceById(deviceIdDto.deviceId);
      const targetLanguageCode = deviceInfo?.languageCode || this.serverDefaultLanguage;
      const translatedResponse = await this.translateService.translateArrayWithKeysToLanguage(
        CATEGORIES,
        KeysForCategories,
        targetLanguageCode,
      );
      return {
        success: true,
        message: CustomMessage.OK,
        data: translatedResponse,
      };
    } catch (error) {
      throw error?.response?.data;
    }
  }
}
