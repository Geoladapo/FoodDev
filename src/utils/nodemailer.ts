import * as nodeMailer from 'nodemailer';
import {getEnvironmentVariable} from '../environments/environment';

export class NodeMailer {
  private static initiateTransport() {
    return nodeMailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: getEnvironmentVariable().mailtrap_auth.user,
        pass: getEnvironmentVariable().mailtrap_auth.pass,
      },
    });
  }

  static sendMail(data: {to: [string]; subject: string; html: string}): Promise<any> {
    return NodeMailer.initiateTransport().sendMail({
      from: 'toktogift@gmail.com',
      to: data.to,
      subject: data.subject,
      html: data.html,
    });
  }
}
