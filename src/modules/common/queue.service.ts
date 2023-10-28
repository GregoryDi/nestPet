import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bull';
import { MailService } from './mail.service';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('mail') private mailQueue: Queue,
    @InjectQueue('work') private workQueue: Queue,
    private mailService: MailService,
    private configService: ConfigService,
  ) {}

  async addToMailQueue(
    email: string,
    text: string,
    subject: string,
    html?: string,
  ) {
    await this.mailQueue.add({
      email,
      text,
      subject,
      html,
    });
  }
}
