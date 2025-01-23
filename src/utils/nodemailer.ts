import * as nodeMailer from 'nodemailer';
import * as sendGrid from 'nodemailer-sendgrid-transport';
import {getEnvironmentVariable} from '../environments/environment';

export class NodeMailer {
  private static initiateTransport() {
    return nodeMailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: getEnvironmentVariable().gmail_auth.user,
        pass: getEnvironmentVariable().gmail_auth.pass,
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
