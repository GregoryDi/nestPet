import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FileDto {
  @ApiProperty({
    description: 'The id of a image.',
    example: 22,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'The content type of a image.',
    example: 'image/jpg',
  })
  @Expose()
  contentType: string;

  @ApiProperty({
    description: 'The content length of a image.',
    example: 65654,
  })
  @Expose()
  contentLength: number;

  @ApiProperty({
    description: 'The url of a image.',
    example: 'https://someimageurl.com',
  })
  @Expose()
  url: string;
}
