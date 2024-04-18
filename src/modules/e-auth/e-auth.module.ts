// Import necessary decorators and services
import { Module } from '@nestjs/common';
import { EAuthService } from './e-auth.service';
import { EAuthController } from './e-auth.controller';
import { JwtModule } from '@nestjs/jwt';

// Define the EAuthModule
@Module({
  imports: [JwtModule],
  controllers: [EAuthController],
  providers: [EAuthService],
  exports: [EAuthService], // Export the EAuthService to be used in other modules
})
export class EAuthModule {}
