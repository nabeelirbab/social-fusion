import { IAccountVerificationTemplate } from '@lib/types/email';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerificationMail(
    email: string,
    verificationTemplate: IAccountVerificationTemplate
  ) {
    await this.mailerService.sendMail({
      to: email,
      subject: `${verificationTemplate.productName}: Account Verification! `,
      template: './verificationTemplate', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        ...verificationTemplate,
      },
    });
    //  console.log('template:', 'verificationTemplate.hbs');
  }
}
