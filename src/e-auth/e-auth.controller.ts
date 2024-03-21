import { Controller, Get, Query } from '@nestjs/common';
import { EAuthService } from './e-auth.service';
import { CreateEAuthDto } from './dto/create-e-auth.dto';
// import { ParseUrl } from '../common/utils/parse-url';
import { UserDetailsResponse } from './entities/user-reponse.entity';
import { ApiResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProviderEntity } from './entities/provider-response.entity';

@ApiTags('E-auth')
@Controller('e-auth')
export class EAuthController {
  constructor(private readonly eAuthService: EAuthService) {}

  @Get('/getUser')
  @ApiQuery({ name: 'code', type: String, required: true })
  @ApiQuery({ name: 'provider', type: String, required: true, enum: ['digilocker'], example: 'digilocker' })
  @ApiResponse({
    status: 200,
    description: 'Returns the User details',
    type: UserDetailsResponse, // Assuming IProvider is an interface or model representing the provider data
  })
  getUser(@Query() createEAuthDto: CreateEAuthDto) {
    return this.eAuthService.getUser(createEAuthDto);
  }
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns the list of providers.',
    type: ProviderEntity, // Assuming IProvider is an interface or model representing the provider data
  })
  getProviders() {
    return this.eAuthService.getProviders();
  }
}
