/* eslint-disable no-console */
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { TranslateDto } from '../dto/translate';
import { ConfigService } from '@nestjs/config';
import { extractKeys } from '../extract-keys/extract-keys';
import {
  KeysFromItems,
  keysFromJob,
  keysFromRetail,
  keysFromScholarship,
} from '../../constants/keys-to-translate/translate';

@Injectable()
export class TranslateService {
  private readonly serverDefaultLanguage: string;
  constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {
    this.serverDefaultLanguage = this.configService.get('serverDefaultLanguage');
  }

  async translateLanguage(translateDto: TranslateDto) {
    try {
      const url = (this.configService.get('LANGUAGE_SERVICE_URL') + `/translate`).replaceAll(' ', '');
      if (translateDto.to_ln === translateDto.from_ln) {
        return translateDto.text;
      }

      return (await this.httpService.axiosRef.post(url, translateDto))?.data?.translated_text;
    } catch (error) {
      throw error?.response?.data;
    }
  }
  async translateArrayWithKeysToLanguage(data: any[], keys: string[], targetLanguageCode: string) {
    try {
      return await Promise.all(
        data.map(async (value: any) => {
          console.log('value', value);
          const clonedValue = JSON.parse(JSON.stringify(value));
          const keysToTranslate: any = extractKeys(clonedValue, keys);
          const response = await this.translateLanguage({
            to_ln: targetLanguageCode,
            from_ln: this.serverDefaultLanguage,
            text: keysToTranslate,
          });
          console.log('response', response);
          console.log('Object.assign(clonedValue, response)', JSON.stringify(Object.assign(clonedValue, response)));
          return Object.assign(clonedValue, response);
        }),
      );
    } catch (error) {
      error.response.data.targetLanguageCode = targetLanguageCode;
      throw error?.response?.data;
    }
  }

  async translateItemPayload(data: any, targetLanguageCode: string) {
    try {
      // eslint-disable-next-line no-console
      console.log(data);
      if (data?.course.message) {
        if (data?.course?.message?.catalog?.providers) {
          const providersArray = data?.course?.message?.catalog?.providers;
          const updateProvidersItems = await Promise.all(
            providersArray.map(async (provider) => {
              return await Promise.all(
                provider.items.map(async (value: any) => {
                  // console.log('value=====================', JSON.stringify(value), '==================value');
                  const flattenedDataList = this.extractKeysAndValues(value, KeysFromItems);
                  // console.log('flattenedDataList', flattenedDataList);

                  const translatedData = await this.translateLanguage({
                    to_ln: targetLanguageCode,
                    from_ln: this.serverDefaultLanguage,
                    text: flattenedDataList,
                  });
                  // console.log(translatedData);

                  const updatedItemsData = this.updateDataWithExtractedValues(value, translatedData);
                  // console.log(
                  //   'updatedItemsData====================',
                  //   JSON.stringify(updatedItemsData),
                  //   '====================updatedItemsData',
                  // );
                  return updatedItemsData;
                }),
              );
            }),
          );
          const updatedProvidersItems = updateProvidersItems;
          // console.log(
          //   'updateProvidersItems==========================',
          //   updatedProvidersItems,
          //   '==============================updateProvidersItems',
          // );
          return {
            message: {
              ...data?.message,
              order: {
                ...data?.message?.order,
                providers: updatedProvidersItems,
              },
            },
            ...data,
          };
        } else {
          return {};
        }
      }

      if (data?.scholarship?.message) {
        // console.log('data.scholarship', data.scholarship)
        if (data?.scholarship?.message?.catalog?.providers) {
          const providersArray = data?.scholarship?.message?.catalog?.providers;
          const updateProvidersItems = await Promise.all(
            providersArray.map(async (provider) => {
              return await Promise.all(
                provider.items.map(async (value: any) => {
                  // console.log('value=====================', JSON.stringify(value), '==================value');
                  // console.log('keysFromScholarship', keysFromScholarship)
                  const flattenedDataList = this.extractKeysAndValues(value, keysFromScholarship);
                  // console.log('flattenedDataList', flattenedDataList);

                  const translatedData = await this.translateLanguage({
                    to_ln: targetLanguageCode,
                    from_ln: this.serverDefaultLanguage,
                    text: flattenedDataList,
                  });
                  // console.log(translatedData);

                  const updatedItemsData = this.updateDataWithExtractedValues(value, translatedData);
                  // console.log(
                  //   'updatedItemsData====================',
                  //   JSON.stringify(updatedItemsData),
                  //   '====================updatedItemsData',
                  // );
                  return updatedItemsData;
                }),
              );
            }),
          );
          const updatedProvidersItems = updateProvidersItems;
          // console.log(
          //   'updateProvidersItems==========================',
          //   updatedProvidersItems,
          //   '==============================updateProvidersItems',
          // );
          return {
            message: {
              ...data?.message,
              order: {
                ...data?.message?.order,
                providers: updatedProvidersItems,
              },
            },
            ...data,
          };
        } else {
          return {};
        }
      }

      if (data?.job?.message) {
        // console.log('Job:::::::::', data?.job);
        if (data?.job?.message?.catalog?.providers) {
          const providersArray = data?.job?.message?.catalog?.providers;
          const updateProvidersItems = await Promise.all(
            providersArray.map(async (provider) => {
              return await Promise.all(
                provider.items.map(async (value: any) => {
                  // console.log('value=====================', JSON.stringify(value), '==================value');
                  // console.log('keysFromScholarship', keysFromScholarship)
                  const flattenedDataList = this.extractKeysAndValues(value, keysFromJob);
                  // console.log('flattenedDataList', flattenedDataList);

                  const translatedData = await this.translateLanguage({
                    to_ln: targetLanguageCode,
                    from_ln: this.serverDefaultLanguage,
                    text: flattenedDataList,
                  });
                  // console.log(translatedData);

                  const updatedItemsData = this.updateDataWithExtractedValues(value, translatedData);
                  // console.log(
                  //   'updatedItemsData====================',
                  //   JSON.stringify(updatedItemsData),
                  //   '====================updatedItemsData',
                  // );
                  return updatedItemsData;
                }),
              );
            }),
          );
          const updatedProvidersItems = updateProvidersItems;
          // console.log(
          //   'updateProvidersItems==========================',
          //   updatedProvidersItems,
          //   '==============================updateProvidersItems',
          // );
          return {
            message: {
              ...data?.message,
              order: {
                ...data?.message?.order,
                providers: updatedProvidersItems,
              },
            },
            ...data,
          };
        } else {
          return {};
        }
      }

      if (data?.retail?.message) {
        if (data?.retail?.message?.catalog?.providers) {
          const providersArray = data?.retail?.message?.catalog?.providers;
          const updateProvidersItems = await Promise.all(
            providersArray.map(async (provider) => {
              return await Promise.all(
                provider.items.map(async (value: any) => {
                  // console.log('value=====================', JSON.stringify(value), '==================value');
                  const flattenedDataList = this.extractKeysAndValues(value, keysFromRetail);
                  // console.log('flattenedDataList', flattenedDataList);

                  const translatedData = await this.translateLanguage({
                    to_ln: targetLanguageCode,
                    from_ln: this.serverDefaultLanguage,
                    text: flattenedDataList,
                  });
                  // console.log(translatedData);

                  const updatedItemsData = this.updateDataWithExtractedValues(value, translatedData);
                  // console.log(
                  //   'updatedItemsData====================',
                  //   JSON.stringify(updatedItemsData),
                  //   '====================updatedItemsData',
                  // );
                  return updatedItemsData;
                }),
              );
            }),
          );
          const updatedProvidersItems = updateProvidersItems;
          // console.log(
          //   'updateProvidersItems==========================',
          //   updatedProvidersItems,
          //   '==============================updateProvidersItems',
          // );
          return {
            message: {
              ...data?.message,
              order: {
                ...data?.message?.order,
                providers: updatedProvidersItems,
              },
            },
            ...data,
          };
        } else {
          return {};
        }
      }
    } catch (error) {
      return error?.message;
    }
  }
  extractKeysAndValues(obj: any[], keysToExtract: Array<string>) {
    const keysAndValues = [];
    function traverse(obj, prefix = '') {
      for (const key in obj) {
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
          traverse(obj[key], `${prefix}${key}.`);
        } else {
          const fullKey = `${prefix}${key}`;
          if (keysToExtract.includes(fullKey)) {
            let value = obj[key];
            if (typeof value === 'string') {
              // Remove HTML tags from the string
              value = value.replace(/<[^>]*>/g, '');
            }

            keysAndValues[fullKey] = value;
          }
        }
      }
    }

    traverse(obj);
    return { ...keysAndValues };
  }
  updateDataWithExtractedValues(originalObj: any, replacementObj: any) {
    const mergedObj = { ...originalObj };

    for (const key in replacementObj) {
      const value = replacementObj[key];
      const keys = key.split('.');
      let currentObj = mergedObj;

      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];

        if (i === keys.length - 1) {
          currentObj[k] = value;
        } else {
          currentObj[k] = currentObj[k] || {};
          currentObj = currentObj[k];
        }
      }
    }

    return mergedObj;
  }
}
