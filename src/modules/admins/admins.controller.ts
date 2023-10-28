import {
  Body,
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  NotFoundException,
  UseGuards,
  Post,
} from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { MailService } from '../common/mail.service';
import { AdminAuthGuard } from '../../guards/admin-auth.guard';
import { UsersService } from '../users/users.service';
import { QueueService } from '../common/queue.service';
import { join } from 'path';
import { SendEmailsDto } from 'src/dtos/send-emails.dto';

@ApiTags('Admins')
@ApiForbiddenResponse({ description: 'Forbidden.' })
@ApiBearerAuth()
@Controller('admins')
@UseGuards(AdminAuthGuard)
export class AdminsController {
  constructor(
    private usersService: UsersService,
    private queueService: QueueService,
  ) {}

  @Post('/sendMail')
  @ApiResponse({
    status: 200,
    description: 'Sending emails with this text and same subject to all admins',
  })
  async sendMail(@Body() body: SendEmailsDto) {
    const users = await this.usersService.findByRole('admin');
    const emails = users.map((u) => u.email);
    emails.forEach((email) => {
      this.queueService.addToMailQueue(email, body.text, body.text);
    });
    return true;
  }
}
