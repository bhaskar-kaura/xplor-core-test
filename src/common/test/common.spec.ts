import { Test, TestingModule } from '@nestjs/testing';
import { CommonModule } from '../common.module';
import { GetUrl } from '../utils';
import { UserModule } from '../../modules/user/user.module';
import { TokenGuard } from '../guard/token.guard';
import { HttpModule } from '@nestjs/axios';
import { APP_GUARD } from '@nestjs/core';

describe('CommonModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [CommonModule, { module: HttpModule, global: true }, UserModule], // Import the module to be tested
      providers: [
        TokenGuard,
        {
          provide: APP_GUARD,
          useClass: TokenGuard,
        },
      ],
      // exports: [GetUrl, TokenGuard],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide GetUrl', () => {
    const getUrl = module.get(GetUrl);
    expect(getUrl).toBeInstanceOf(GetUrl);
  });

  it('should export GetUrl', () => {
    const getUrl = module.get(GetUrl);
    expect(getUrl).toBeDefined();
  });
});
