import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IHealthCheckResponse } from './common/interfaces';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { HealthCheckEntity } from './app.entity';

@ApiTags('Health Checkup')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({
    status: 200,
    description: 'Returns a greeting message indicating the health status of the server.',
    type: HealthCheckEntity, // Assuming HealthCheck is the interface or model representing the health check data
  })
  @Get()
  getHello(): object {
    return this.appService.getHealth();
  }

  @ApiResponse({
    status: 200,
    description: 'Returns a greeting message indicating the health status of the server.',
    type: HealthCheckEntity, // Assuming HealthCheck is the interface or model representing the health check data
  })
  @Get('/health')
  getHealth(): IHealthCheckResponse {
    return this.appService.getHealth();
  }
}
