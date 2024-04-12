import { Test, TestingModule } from '@nestjs/testing';
import { CommonModule } from '../common.module';
import { GetUrl, ResponseUtilsService } from '../utils';

describe('CommonModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [CommonModule], // Import the module to be tested
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide ResponseUtilsService', () => {
    const responseUtilsService = module.get(ResponseUtilsService);
    expect(responseUtilsService).toBeInstanceOf(ResponseUtilsService);
  });

  it('should provide GetUrl', () => {
    const getUrl = module.get(GetUrl);
    expect(getUrl).toBeInstanceOf(GetUrl);
  });

  it('should export ResponseUtilsService', () => {
    const responseUtilsService = module.get(ResponseUtilsService);
    expect(responseUtilsService).toBeDefined();
  });

  it('should export GetUrl', () => {
    const getUrl = module.get(GetUrl);
    expect(getUrl).toBeDefined();
  });
});
