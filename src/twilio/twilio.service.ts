import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { LoginOtp } from './dto/loginOtp.dto';
import { Twilio } from 'twilio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TwilioService {
  private logger: Logger;
  private twilioClient: Twilio;
  private configService: ConfigService;
  constructor() {
    this.logger = new Logger(TwilioService.name);
    this.configService = new ConfigService();
    const accountSid = this.configService.get('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get('TWILIO_AUTH_TOKEN');

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async sendOtpMobile(loginOtp: LoginOtp) {
    try {
      const senderNumber = await this.configService.get('TWILIO_SENDER_PHONE_NUMBER');
      const message: string = `Login Otp for your Ladbrook FileCabinate Account is ${loginOtp.otp}, this message will expire in 5 mins`;

      const response = await this.twilioClient.messages.create({
        to: loginOtp.phoneNumber,
        from: senderNumber,
        body: message,
      });

      return { msg: response };
    } catch (error) {
      this.logger.error(error);
      // Handle specific errors if needed
      if (error.code === 21211) {
        this.logger.error('Twilio error: Invalid phone number');
      } else {
        this.logger.error(`Twilio error: ${error.message}`);
      }

      throw new InternalServerErrorException('Failed to send OTP');
      return { success: true, message: 'top send on mobile' };
    }
  }
  async verifyOtp(phoneNumber: string, code: string) {
    const serviceSid = this.configService.get('TWILIO_VERIFICATION_SERVICE_SID');
    let msg;
    await this.twilioClient.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: phoneNumber, code: code })
      .then((message) => (msg = message));
    return { msg: msg };
  }
}
