// Import necessary decorators from class-validator for validation
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// Define a DTO for creating a wallet
export class CreateWalletDto {
  // Validate that userId is a string and not empty
  @IsString()
  @IsNotEmpty()
  userId: string;

  // Validate that fullName is a string and not empty
  @IsString()
  @IsNotEmpty()
  fullName: string;

  // Validate that email is a valid email address and not empty
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // Validate that organization is a string and not empty
  @IsString()
  @IsNotEmpty()
  organization: string;
}
