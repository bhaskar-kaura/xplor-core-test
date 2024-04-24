// Import necessary decorators from class-validator for validation
import { ArrayNotEmpty, ArrayUnique, IsArray, IsNotEmpty, IsString } from 'class-validator';

// Define a DTO for creating a file request in the wallet
export class CreateFileRequestDto {
  @IsNotEmpty({ message: 'Wallet ID cannot be empty' })
  @IsString({ message: 'Wallet ID must be a string' })
  readonly walletId: string;

  @IsNotEmpty({ message: 'Category cannot be empty' })
  @IsString({ message: 'Category must be a string' })
  readonly category: string;

  @IsArray({ message: 'Tags must be an array' })
  @ArrayNotEmpty({ message: 'Tags array cannot be empty' })
  @ArrayUnique({ message: 'Tags array must contain unique values' })
  @IsString({ each: true, message: 'Each tag must be a string' })
  readonly tags: string[];

  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString({ message: 'Name must be a string' })
  readonly name: string;
}
