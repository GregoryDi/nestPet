import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CurrentUserDto {
  @ApiProperty({
    description: 'The id of a user.',
    example: '12',
  })
  @IsEmail()
  id: number;

  @ApiProperty({
    description: 'The email of a user.',
    example: 'test@test.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The role of a user.',
    example: 'admin',
  })
  @IsString()
  role: string;
}
