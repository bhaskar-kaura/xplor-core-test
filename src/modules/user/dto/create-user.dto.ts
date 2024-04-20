/**
 * Data Transfer Object (DTO) for creating a new user.
 * Includes details about the user, such as personal information, authentication details, and associated wallet and documents.
 */
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import {
  EAuth,
  EAuthClass,
  Persona,
  PersonaClass,
  UserDetails,
  UserDetailsClass,
} from '../interfaces/user-details.interface';

export class CreateUserDto {
  // UserDetails object containing personal information
  @ApiProperty({ type: UserDetailsClass })
  @Type(() => UserDetailsClass)
  userDetails: UserDetails;

  // Persona object containing persona details
  @ApiProperty({ type: PersonaClass, description: 'Persona Details' })
  @Type(() => PersonaClass)
  persona: Persona;

  // EAuth object containing e-authentication details
  @ApiProperty({ type: EAuthClass, description: 'EAuth Details' })
  @Type(() => EAuthClass)
  eAuth: EAuth;

  // Wallet ID associated with the user
  @ApiProperty({ type: String, example: 'f47ac10c-57cc-4372-a567-0e02b2c3d479', description: 'Wallet Id' })
  walletId: string;

  // Array of document IDs associated with the user
  @ApiProperty({ type: [String], example: ['f47ac10b-58cc-4372-a567-0e02b2c3d479'], description: 'Document Id' })
  documentId: string[];
}
