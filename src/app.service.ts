import { Injectable } from '@nestjs/common';
import { IHealthCheckResponse } from './common/interfaces';

@Injectable()
export class AppService {
  getHealth(): IHealthCheckResponse {
    return { status: 'ok', message: 'core server is up and running' };
  }
}
