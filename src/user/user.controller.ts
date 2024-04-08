import { Controller, Get, Post, Param, Delete, Body, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PhoneNumberDto } from './dto/phone-number.dto';
import { ApiTags } from '@nestjs/swagger';
import { VerifyOtpDto } from './dto/verify-otp.dot';
import { ExtractToken } from '../common/decorators/extract-token.decorator';
import { AssignRoleDto, ResendOtpDto } from './dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/send-otp')
  sendOtp(@Body() phoneNumber: PhoneNumberDto) {
    return this.userService.sendOtp(phoneNumber);
  }

  @Post('/verify-otp')
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.userService.verifyOtp(verifyOtpDto);
  }
  @Post('resend-otp')
  resendOtp(@Body() resendOtp: ResendOtpDto) {
    return this.userService.resendOtp(resendOtp);
  }

  @Get('journey')
  getUserJourney(@ExtractToken() token: string) {
    return this.userService.getUserJourney(token);
  }
  @Get('roles')
  findRoles(@ExtractToken() token: string) {
    return this.userService.findRoles(token);
  }
  @Patch('role')
  assignRole(@Body() assignRoleDto: AssignRoleDto, @ExtractToken() token: string) {
    return this.userService.assignRole(assignRoleDto, token);
  }
  @Patch('kyc')
  updateUserKyc(@ExtractToken() token: string) {
    return this.userService.updateUserKyc(token);
  }

  @Get()
  getUser(@ExtractToken() token: string) {
    return this.userService.findOne(token);
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
