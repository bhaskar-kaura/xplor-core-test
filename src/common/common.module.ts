// src/common/common.module.ts
import { Global, Module } from '@nestjs/common';
import { ResponseUtilsService } from './utils/response-utils.service';
import { GetAuthUrls } from './utils/get-urls-utils.service';

@Global()
@Module({
  providers: [ResponseUtilsService, GetAuthUrls],
  exports: [ResponseUtilsService, GetAuthUrls], // Export the service to make it available for injection in other modules
})
export class CommonModule {}
