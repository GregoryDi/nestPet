import { IsEmail, IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The email of a user.',
    example: 'test@test.com',
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'The password of a user.',
    example: 'test@test.com',
  })
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty({
    description: 'The imageId of user.',
    example: 'test@test.com',
  })
  @IsNumber()
  @IsOptional()
  imageId: number;
}
