import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SendEmailsDto {
  @ApiProperty({
    description: 'Subject and text of email',
    example: 'Hello members!',
  })
  @IsString()
  text: string;
}
