import { IsString } from 'class-validator';
export class AssignRoleDto {
  @IsString()
  readonly roleId: string;
}
