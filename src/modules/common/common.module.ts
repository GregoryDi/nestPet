import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { MailService } from './mail.service';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    BullModule.registerQueueAsync(
      {
        name: 'mail',
        imports: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          name: 'mail',
          processors: [join(__dirname, 'processors/mail.processor.js')],
          redis: {
            port: configService.get('REDIS_PORT'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'work',
        imports: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          name: 'work',
          redis: {
            port: configService.get('REDIS_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ),
  ],
  controllers: [],
  providers: [QueueService, MailService],
  exports: [QueueService, MailService],
})
export class CommonModule {}
