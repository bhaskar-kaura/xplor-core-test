// Import necessary decorators and components from NestJS
import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { PhoneNumberDto } from './dto/phone-number.dto';
import { ApiTags } from '@nestjs/swagger';
import { VerifyOtpDto } from './dto/verify-otp.dot';
import { ExtractToken } from '../../common/decorators/extract-token.decorator';
import { AssignRoleDto, ResendOtpDto } from './dto';

// Define the UserController with API tags for Swagger documentation
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Endpoint to send OTP
  @Post('/send-otp')
  sendOtp(@Body() phoneNumber: PhoneNumberDto) {
    return this.userService.sendOtp(phoneNumber);
  }

  // Endpoint to verify OTP
  @Post('/verify-otp')
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.userService.verifyOtp(verifyOtpDto);
  }

  // Endpoint to resend OTP
  @Post('resend-otp')
  resendOtp(@Body() resendOtp: ResendOtpDto) {
    return this.userService.resendOtp(resendOtp);
  }

  // Endpoint to get user journey
  @Get('journey')
  getUserJourney(@ExtractToken() token: string) {
    return this.userService.getUserJourney(token);
  }

  // Endpoint to find roles
  @Get('roles')
  findRoles(@ExtractToken() token: string) {
    return this.userService.findRoles(token);
  }

  // Endpoint to assign role
  @Patch('role')
  assignRole(@Body() assignRoleDto: AssignRoleDto, @ExtractToken() token: string) {
    return this.userService.assignRole(assignRoleDto, token);
  }

  // Endpoint to update user KYC
  @Patch('kyc')
  updateUserKyc(@ExtractToken() token: string) {
    return this.userService.updateUserKyc(token);
  }

  // Endpoint to get user details
  @Get()
  getUser(@ExtractToken() token: string) {
    return this.userService.findOne(token);
  }
}
