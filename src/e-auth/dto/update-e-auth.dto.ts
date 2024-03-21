import { PartialType } from '@nestjs/mapped-types';
import { CreateEAuthDto } from './create-e-auth.dto';

export class UpdateEAuthDto extends PartialType(CreateEAuthDto) {}
