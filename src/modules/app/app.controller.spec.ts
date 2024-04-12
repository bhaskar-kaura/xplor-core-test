import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EAuthService } from '../e-auth/e-auth.service';
import { HttpModule } from '@nestjs/axios';
import { GetUrl } from '../../common/utils/get-urls-utils.service'; // Adjust the import path as necessary
import { ResponseUtilsService } from '../../../src/common/utils';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [AppService, EAuthService, GetUrl, ResponseUtilsService], // Include GetUrl here
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return server status as "ok"', () => {
      expect(appController.getHealth().status).toBe('ok');
    });
  });
});
