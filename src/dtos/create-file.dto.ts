import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Binary file.',
  })
  file: any;
}
