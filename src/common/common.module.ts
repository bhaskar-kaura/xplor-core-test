// Import necessary decorators from NestJS.
import { Global, Module } from '@nestjs/common';

// Import the GetUrl utility service for constructing URLs.
import { GetUrl } from './utils/get-urls-utils.service';
// Import the TokenGuard for protecting routes.
import { TokenGuard } from './guard/token.guard';
// Import the UserModule to include user-related functionalities.
import { UserModule } from '../modules/user/user.module';

// Decorate the class with @Global() to make it a global module.
@Global()
@Module({
  // Import the UserModule to include user-related functionalities.
  imports: [UserModule],
  // Provide the GetUrl and TokenGuard services.
  providers: [GetUrl, TokenGuard],
  // Export the GetUrl and TokenGuard services to make them available for injection in other modules.
  exports: [GetUrl, TokenGuard],
})
// Define the CommonModule class.
export class CommonModule {}
