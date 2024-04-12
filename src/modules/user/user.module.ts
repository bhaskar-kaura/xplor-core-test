// Import necessary modules and components from NestJS
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

// Define the UserModule with its controllers and providers
@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
