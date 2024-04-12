import { ArgumentMetadata } from '@nestjs/common';
import { IsString } from 'class-validator';
import { CustomValidationPipe } from '../validation/custom.validation';
import { faker } from '@faker-js/faker';

describe('CustomValidationPipe', () => {
  let pipe: CustomValidationPipe;

  beforeEach(() => {
    pipe = new CustomValidationPipe();
  });

  it('should return the value if validation passes', async () => {
    class TestDto {
      @IsString()
      name: string;
    }

    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: TestDto,
    };

    const value = { name: faker.person.fullName() };
    const result = await pipe.transform(value, metadata);
    expect(result).toEqual(value);
  });
});
