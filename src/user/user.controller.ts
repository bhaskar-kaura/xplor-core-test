import { Controller, Get, Post, Patch, Param, Delete, Query, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { OtpDto, PhoneNumberDto } from './dto/phone-number.dto';
import { ApiTags, ApiResponse, ApiQuery, ApiBody } from '@nestjs/swagger';
import { PersonaClass } from './interfaces/user-details.interface';
import { PersonaDto } from './dto/user-persona.dto';
import { SuccessResponseEntity } from './entity/success.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/send-otp')
  @ApiResponse({
    status: 200,
    description: 'Otp is send to the given phone number.',
    // Assuming HealthCheck is the interface or model representing the health check data
  })
  @ApiQuery({ name: 'phoneNumber', type: String, required: true })
  sendOtp(@Query() phoneNumber: PhoneNumberDto) {
    return this.userService.sendOtp(phoneNumber);
  }

  @Post('/verify-otp')
  @ApiResponse({
    status: 200,
    description: 'Verify the given otp',
    type: SuccessResponseEntity,
    // Assuming HealthCheck is the interface or model representing the health check data
  })
  @ApiQuery({ name: 'otp', type: String, required: true })
  @ApiQuery({ name: 'phoneNumber', type: String, required: true })
  @ApiBody({ type: PersonaClass })
  verifyOtp(@Query() otp: OtpDto, @Query() phoneNumber: PhoneNumberDto, @Body() persona: PersonaDto) {
    return this.userService.verifyOtp(otp, phoneNumber, persona);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
