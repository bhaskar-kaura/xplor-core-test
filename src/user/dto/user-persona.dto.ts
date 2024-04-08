import { IsOptional } from 'class-validator';

export class PersonaDto {
  @IsOptional()
  interest?: string[];
  @IsOptional()
  choice?: string[];
}
