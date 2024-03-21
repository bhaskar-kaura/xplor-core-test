import { Body, Controller, Post } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { Public } from '../common/decorators/public.decorators';
import { LoginOtp } from './dto/loginOtp.dto';

import { CacheKey } from '@nestjs/cache-manager';

@Controller('twillio')
export class TwilioController {
  constructor(private readonly twillioService: TwilioService) {}
  @Public()
  @CacheKey('login_otp_twillio')
  @Post('/sendOtp')
  sendMobileOtp(@Body() loginOtp: LoginOtp) {
    return this.twillioService.sendOtpMobile(loginOtp);
  }
  @Public()
  @Post('/verifyOtp')
  async verifyOtp(@Body() data: { phone: string; otp: string }): Promise<{ msg: string }> {
    return await this.twillioService.verifyOtp(data.phone, data.otp);
  }
}
