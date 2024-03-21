import { ArrayNotEmpty, ArrayUnique, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateFileRequestDto {
  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  @IsString()
  readonly fileType: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  readonly fileTags: string[];

  @IsNotEmpty()
  @IsString()
  readonly fileName: string;

  @IsNotEmpty()
  @IsString()
  readonly metadata: string;
}
