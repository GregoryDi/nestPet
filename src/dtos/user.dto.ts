import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { FileDto } from './file.dto';

export class UserDto {
  @ApiProperty({
    description: 'The Id of a user.',
    example: 12,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'The email of a user.',
    example: 'test@test.com',
  })
  @Expose()
  email: string;

  @ApiProperty({
    description: 'Image of user.',
  })
  @Expose()
  @Type(() => FileDto)
  image: FileDto;
}
