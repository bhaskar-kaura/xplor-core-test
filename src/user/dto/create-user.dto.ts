// src/user/dto/create-user.dto.ts
// import { IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import {
  EAuth,
  EAuthClass,
  Persona,
  PersonaClass,
  UserDetails,
  UserDetailsClass,
} from '../interfaces/user-details.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: UserDetailsClass })
  @Type(() => UserDetailsClass)
  userDetails: UserDetails;

  @ApiProperty({ type: PersonaClass, description: 'Persona Details' })
  @Type(() => PersonaClass)
  persona: Persona;

  @ApiProperty({ type: EAuthClass, description: 'EAuth Details' })
  @Type(() => EAuthClass)
  eAuth: EAuth;

  @ApiProperty({ type: String, example: 'f47ac10c-57cc-4372-a567-0e02b2c3d479', description: 'Wallet Id' })
  walletId: string;

  @ApiProperty({ type: [String], example: ['f47ac10b-58cc-4372-a567-0e02b2c3d479'], description: 'Document Id' })
  documentId: string[];
}
