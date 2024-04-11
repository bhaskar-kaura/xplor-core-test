import { IsOptional } from 'class-validator';
export class AssignRoleDto {
  @IsOptional()
  readonly roleId: string;
}
