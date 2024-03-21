// src/common/utils/response-utils.service.ts
import { Injectable } from '@nestjs/common';
import { CustomMessage } from '../enums/message';

@Injectable()
export class ResponseUtilsService {
  getSuccessResponse(data: any, message: CustomMessage): any {
    return {
      success: true,
      data,
      message,
    };
  }
}
