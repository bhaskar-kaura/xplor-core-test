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
import { GetUrl } from './common/utils/get-urls-utils.service';
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
    { module: HttpModule, global: true },
  ],
  controllers: [AppController],
  providers: [AppService, GetUrl],
})
export class AppModule {}
