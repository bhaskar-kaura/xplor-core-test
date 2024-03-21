import { Module } from '@nestjs/common';
import { EAuthService } from './e-auth.service';
import { EAuthController } from './e-auth.controller';
// import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [EAuthController],
  providers: [EAuthService],
})
export class EAuthModule {}
