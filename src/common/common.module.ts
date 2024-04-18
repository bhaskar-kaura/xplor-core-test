// src/common/common.module.ts
import { Global, Module } from '@nestjs/common';
import { GetUrl } from './utils/get-urls-utils.service';
import { TokenGuard } from './guard/token.guard';
import { UserModule } from '../modules/user/user.module';

@Global()
@Module({
  imports: [UserModule],
  providers: [GetUrl, TokenGuard],
  exports: [GetUrl, TokenGuard], // Export the service to make it available for injection in other modules
})
export class CommonModule {}
