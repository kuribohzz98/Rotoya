import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from './../config/config.service';
import { validateEmail } from '../helper/utils/validate';

@Injectable()
export class EmailService {
  private transporter: any;
  private logger: Logger = new Logger('EmailService');

  constructor(private readonly configService: ConfigService) {
    this.init();
  }

  init(): void {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASSWORD'),
      },
    });
    // this.transporter = nodemailer.createTransport({
    //     host: 'smtp.ethereal.email',
    //     port: 587,
    //     auth: {
    //         user: 'justen.jacobson98@ethereal.email',
    //         pass: 'YHu3nXB3YmwsfW9mYk'
    //     }
    // });
  }

  async sendMail(
    listTo: string[],
    subject: string,
    message: string,
  ): Promise<any> {
    if (!this.transporter) throw new Error(`transporter is underfine`);
    let sendmail;
    try {
      sendmail = this.getOptionsSendMail(listTo, subject, message);
    } catch (e) {
      this.logger.log(e);
    }
    if (!sendmail) return;
    return this.transporter.sendMail(sendmail);
  }

  getOptionsSendMail(listTo: string[], subject: string, message: string): any {
    if (!listTo || !listTo.length)
      throw new Error(`'to' in mailer is underfine`);
    const validateError = listTo.filter(to => !validateEmail(to));
    if (validateError && validateError.length) {
      this.logger.log(`email ${validateError.join(', ')} is invalid`);
      return;
    }
    return {
      from:
        'Rotoya' + this.configService.get('MAIL_USER') ||
        `Rotoya <justen.jacobson98@ethereal.email>`,
      to: listTo.join(', '),
      subject,
      text: message,
    };
  }
}
