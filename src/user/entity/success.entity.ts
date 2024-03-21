import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseEntity {
  @ApiProperty({ example: true, description: 'Indicates whether the operation was successful' })
  success: boolean;

  @ApiProperty({ description: 'The ID of the newly created user' })
  data: [string];

  @ApiProperty({ example: 'User Created Successfully', description: 'Message indicating the result of the operation' })
  message: string;
}
