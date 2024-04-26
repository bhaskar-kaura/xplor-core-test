// Import necessary decorators and components from NestJS
import { Controller, Get, Post, Body, Patch, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { PhoneNumberDto } from './dto/phone-number.dto';
import { VerifyOtpDto } from './dto/verify-otp.dot';
import { ExtractToken } from '../../common/decorators/extract-token.decorator';
import { AssignRoleDto, ResendOtpDto } from './dto';
import { Public } from '../../common/decorators/public.decorators';
import { CreateMPinDto } from './dto/create-mpin.dto';

// Define the UserController with API tags for Swagger documentation
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Endpoint to send OTP
  @Public()
  @Public()
  @Post('/send-otp')
  sendOtp(@Body() phoneNumber: PhoneNumberDto) {
    return this.userService.sendOtp(phoneNumber);
  }

  // Endpoint to verify OTP
  @Public()
  @Public()
  @Post('/verify-otp')
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.userService.verifyOtp(verifyOtpDto);
  }

  // Endpoint to resend OTP
  @Public()
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

  // Endpoint to create MPIN
  @Post('create-mpin')
  createMPin(@ExtractToken() token: string, @Body() mPin: CreateMPinDto) {
    return this.userService.createMPin(token, mPin);
  }

  // Endpoint to verify MPIN
  @Put('verify-mpin')
  verifyMPin(@ExtractToken() token: string, @Body() mPin: CreateMPinDto) {
    return this.userService.verifyMPin(token, mPin);
  }

  // Endpoint to get refresh token
  @Public()
  @Get('access-token')
  getAccessToken(@ExtractToken() token: string) {
    return this.userService.getAccessToken(token);
  }

  @Put('logout')
  logoutUser(@ExtractToken() token: string) {
    return this.userService.logoutUser(token);
  }
}
