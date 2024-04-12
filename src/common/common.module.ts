// src/common/common.module.ts
import { Global, Module } from '@nestjs/common';
import { ResponseUtilsService } from './utils/response-utils.service';
import { GetUrl } from './utils/get-urls-utils.service';

@Global()
@Module({
  providers: [ResponseUtilsService, GetUrl],
  exports: [ResponseUtilsService, GetUrl], // Export the service to make it available for injection in other modules
})
export class CommonModule {}
