// Import necessary decorators and functions from NestJS and class-validator/class-transformer libraries.
import { ArgumentMetadata, BadRequestException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { CustomMessage } from '../enums/message';

// Decorate the class with @Injectable() to make it a provider that can be injected into other parts of the application.
@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  // Implement the transform method required by the PipeTransform interface.
  // This method is called automatically by NestJS when the pipe is used.
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // If there's no metatype or the metatype is a basic type (String, Boolean, Number, Array, Object), return the value as is.
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // Use class-transformer to transform the plain value into an instance of the metatype class.
    const object = plainToInstance(metatype, value);
    // Use class-validator to validate the transformed object.
    const errors = await validate(object);
    // If there are validation errors, throw a BadRequestException with the formatted errors.
    if (errors.length > 0) {
      throw new BadRequestException(this.formatErrors(errors), CustomMessage.VERIFICATION_FAILED);
    }

    // If validation passes, return the value.
    return value;
  }

  // Helper method to determine if the metatype should be validated.
  // Returns false for basic types (String, Boolean, Number, Array, Object) and true for custom classes.
  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  // Helper method to format validation errors into a more readable format.
  private formatErrors(errors: any[]) {
    const formattedErrors = errors.reduce((acc, err) => {
      // For each error, get the first constraint key (which represents the validation rule that failed)
      // and use it to get the corresponding error message.
      const firstConstraintKey = Object.keys(err.constraints)[0];
      // Accumulate the errors into an object keyed by the property name.
      acc[err.property] = err.constraints[firstConstraintKey];
      return acc;
    }, {});
    // Return the formatted errors along with the HTTP status code for a bad request.
    return { message: formattedErrors, statusCode: HttpStatus.BAD_REQUEST };
  }
}
