import { Job, DoneCallback } from 'bull';
import { MailService } from '../mail.service';
import { ConfigService } from '@nestjs/config';

async function mailProcessor(job: Job, cb: DoneCallback) {
  const configService = new ConfigService();
  const mailService = new MailService(configService);
  const sender = await mailService.send(
    job.data.email,
    job.data.text,
    job.data.subject,
    job.data.html,
  );
  if (!sender) {
    console.log(`Pid [${process.pid}] ${JSON.stringify(job.data)}`, 'error');
  }
  console.log(`Pid [${process.pid}] ${JSON.stringify(job.data)}`, 'done');
  cb(null, 'It works');
}

export default mailProcessor;
