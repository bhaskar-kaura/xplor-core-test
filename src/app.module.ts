import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EAuthModule } from './e-auth/e-auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import configuration from './config/env/env.config';
import envValidation from './config/env/validation/env.validation';
import { MongooseConfigService } from './config/database/database.config';
import { CommonModule } from './common/common.module';
import { WalletModule } from './wallet/wallet.module';
import { HttpModule } from '@nestjs/axios';
import { GetAuthUrls } from './common/utils/get-urls-utils.service';
import { TwilioModule } from './twilio/twilio.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object(envValidation()),
      validationOptions: {
        abortEarly: false,
      },
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),

    EAuthModule,
    UserModule,
    CommonModule,
    WalletModule,
    TwilioModule,
    { module: HttpModule, global: true },
    TwilioModule,
  ],
  controllers: [AppController],
  providers: [AppService, GetAuthUrls],
})
export class AppModule {}
