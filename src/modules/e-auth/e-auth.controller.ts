// Import necessary decorators, services, and DTOs
import { Controller, Get, Query } from '@nestjs/common';
import { EAuthService } from './e-auth.service';
import { CreateEAuthDto } from './dto/create-e-auth.dto';
import { UserDetailsResponse } from './entities/user-reponse.entity';
import { ApiResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProviderEntity } from './entities/provider-response.entity';
import { ExtractToken } from '../../common/decorators/extract-token.decorator';
import { CallBackQueryDto } from '../app/dto/callback-query.dto';
import { Public } from '../../common/decorators/public.decorators';

// Define the EAuthController with necessary routes and decorators
@ApiTags('E-auth')
@Controller('e-auth')
export class EAuthController {
  constructor(private readonly eAuthService: EAuthService) {}

  // Route to get user details
  @Get('/getUser')
  @ApiQuery({ name: 'code', type: String, required: true })
  @ApiQuery({ name: 'provider', type: String, required: true, enum: ['digilocker'], example: 'digilocker' })
  @ApiResponse({
    status: 200,
    description: 'Returns the User details',
    type: UserDetailsResponse,
  })
  getUser(@Query() createEAuthDto: CreateEAuthDto) {
    return this.eAuthService.getUser(createEAuthDto);
  }

  // Route to get list of providers
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns the list of providers.',
    type: ProviderEntity,
  })
  getProviders(@ExtractToken() token: string) {
    return this.eAuthService.getProviders(token);
  }

  /**
   * Handles callbacks from external services, specifically for Aadhaar authentication.
   * It processes the callback query and updates the user's information accordingly.
   */
  @Public()
  @Get('/callback')
  aadhaarCallback(@Query() callBackQueryDto: CallBackQueryDto) {
    return this.eAuthService.updateUserOnCallBack(callBackQueryDto);
  }
}
