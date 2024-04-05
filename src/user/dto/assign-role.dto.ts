import { IsNotEmpty, IsString } from 'class-validator';
export class AssignRoleDto {
  @IsString()
  @IsNotEmpty()
  readonly _id: string;
}
