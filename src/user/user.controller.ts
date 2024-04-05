import { Controller, Get, Post, Param, Delete, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PhoneNumberDto } from './dto/phone-number.dto';
import { ApiTags } from '@nestjs/swagger';
import { VerifyOtpDto } from './dto/verify-otp.dot';
import { ExtractToken } from '../common/decorators/extract-token.decorator';
import { AssignRoleDto } from './dto';

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

  @Get('journey/:userId')
  getUserJourney(@ExtractToken() token: string, @Param('id') id: string) {
    return this.userService.getUserJourney(id, token);
  }
  @Get('roles')
  findRoles(@ExtractToken() token: string) {
    return this.userService.findRoles(token);
  }
  @Post('role/:userId')
  assignRole(@Param('userId') userId: string, @Body() assignRoleDto: AssignRoleDto, @ExtractToken() token: string) {
    return this.userService.assignRole(userId, assignRoleDto, token);
  }
  @Post('kyc/:userId')
  updateUserKyc(@Param('userId') userId: string, @ExtractToken() token: string) {
    return this.userService.updateUserKyc(userId, token);
  }

  @Get(':id')
  getUser(@ExtractToken() token: string, @Param('id') id: string) {
    return this.userService.findOne(id, token);
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
