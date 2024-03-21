import { IsArray, IsOptional } from 'class-validator';

export class PersonaDto {
  @IsOptional()
  @IsArray()
  interest?: string[];
  @IsOptional()
  @IsArray()
  choice?: string[];
}
