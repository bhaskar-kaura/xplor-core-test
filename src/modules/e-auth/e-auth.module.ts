// Import necessary decorators and services
import { Module } from '@nestjs/common';
import { EAuthService } from './e-auth.service';
import { EAuthController } from './e-auth.controller';

// Define the EAuthModule
@Module({
  // Declare the controllers and providers that belong to this module
  controllers: [EAuthController],
  providers: [EAuthService],
  exports: [EAuthService], // Export the EAuthService to be used in other modules
})
export class EAuthModule {}
