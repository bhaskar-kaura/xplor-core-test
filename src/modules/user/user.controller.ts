// Import necessary decorators and components from NestJS
import { Controller, Get, Post, Body, Patch, Put, Query, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { PhoneNumberDto } from './dto/phone-number.dto';
import { VerifyOtpDto } from './dto/verify-otp.dot';
import { ExtractToken } from '../../common/decorators/extract-token.decorator';
import {
  AssignRoleDto,
  CreateGuestLanguageDto,
  CreateUserDto,
  QueryDeviceIdDto,
  QueryOtpTypeDto,
  ResetMpinDto,
} from './dto';
import { Public } from '../../common/decorators/public.decorators';
import { CreateMPinDto } from './dto/create-mpin.dto';
import { ExtractUserId } from '../../common/decorators/extract-userId';

// Define the UserController with API tags for Swagger documentation
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Endpoint to send OTP
  @Public()
  @Post('/send-otp')
  sendOtp(@Body() phoneNumber: PhoneNumberDto) {
    return this.userService.sendOtp(phoneNumber);
  }

  // Endpoint to send MPIN OTP
  @Put('/send-mpin-otp')
  sendMpinOtp(@ExtractToken() token: string) {
    return this.userService.sendMpinOtp(token);
  }

  // Endpoint to verify OTP
  @Public()
  @Post('/verify-otp')
  verifyOtp(@Query() queryOtpTypeDto: QueryOtpTypeDto, @Body() verifyOtpDto: VerifyOtpDto) {
    return this.userService.verifyOtp(queryOtpTypeDto, verifyOtpDto);
  }

  @Put('/reset-mpin')
  resetMpin(@ExtractToken() token: string, @Body() resetMpinDto: ResetMpinDto) {
    return this.userService.resetMpin(token, resetMpinDto);
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

  // Endpoint to logout user
  @Put('logout')
  logoutUser(@ExtractToken() token: string) {
    return this.userService.logoutUser(token);
  }

  // Endpoint to create device language preference
  @Public()
  @Post('language-preference')
  createDeviceLanguagePreference(@Body() createLanguage: CreateGuestLanguageDto) {
    return this.userService.createDeviceLanguagePreference(createLanguage);
  }

  // Endpoint to get device language preference
  @Public()
  @Get('language-preference')
  getDeviceLanguagePreference(@Query() queryDeviceIdDto: QueryDeviceIdDto) {
    return this.userService.getDeviceLanguagePreference(queryDeviceIdDto);
  }

  // Endpoint to delete device language preference
  @Public()
  @Delete('language-preference')
  deleteDeviceLanguagePreference(@Query() queryDeviceIdDto: QueryDeviceIdDto) {
    return this.userService.deleteDeviceLanguagePreference(queryDeviceIdDto);
  }

  // Endpoint to create user
  @Public()
  @Post()
  createUser(@ExtractToken() token: string, @ExtractUserId() userId: string, @Body() user: CreateUserDto) {
    return this.userService.createUser(token, userId, user);
  }
}
