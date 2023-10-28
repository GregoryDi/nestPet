import * as nodeMailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(private configService: ConfigService) {}

  async send(email: string, text: string, subject: string, html?: string) {
    return new Promise((resolve, reject) => {
      const transport = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: this.configService.get('EMAIL_USER'),
          clientId: this.configService.get('EMAIL_CLIENT_ID'),
          clientSecret: this.configService.get('EMAIL_CLIENT_SECRET'),
          refreshToken: this.configService.get('EMAIL_REFRESH_TOKEN'),
        },
      });
      transport.sendMail(
        {
          to: email,
          from: this.configService.get('EMAIL_USER'),
          subject,
          text,
          html,
        },
        (error, result) => {
          if (error) {
            console.log(email, error);
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
    });
  }
}
