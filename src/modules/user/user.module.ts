// Import necessary modules and components from NestJS
import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TranslateService } from '../../common/utils/translate/translate.service';
import { GetDeviceService } from '../../common/utils/getDevice/get-device';

// Define the UserModule with its controllers and providers
@Module({
  controllers: [UserController],
  providers: [UserService, TranslateService, GetDeviceService],
  exports: [UserService],
})
export class UserModule {}
