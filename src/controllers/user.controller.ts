import User from '../models/User';
import {NodeMailer} from '../utils/nodemailer';
import {Utils} from '../utils/utils';

export class UserController {
  static async signup(req, res, next) {
    var verification_token = Utils.generateVerificationToken(6);

    const {name, phone, email, password, type, status} = req.body;
    const data = {
      name,
      email,
      verification_token,
      verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
      phone,
      password,
      type,
      status,
    };

    try {
      let user = await new User(data).save();
      res.send(user);
      await NodeMailer.sendMail({
        to: [user.email],
        subject: 'Email verification',
        html: `<h1>Your Otp is ${verification_token}</h1>`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async verify(req, res, next) {
    const {verification_token, email} = req.body;
    try {
      const user = await User.findOneAndUpdate(
        {
          email: email,
          verification_token: verification_token,
          verification_token_time: {$gt: Date.now()},
        },
        {
          email_verified: true,
        },
        {new: true}
      );
      if (user) {
      } else {
        throw new Error('Email verification token is expired.Please try again...');
      }
    } catch (error) {
      next(error);
    }
  }

  static async resendVerificationEmail(req, res, next) {
    const {email} = req.query;
    const verification_token = Utils.generateVerificationToken(6);
    try {
      const user = await User.findOneAndUpdate(
        {email: email},
        {
          verification_token: verification_token,
          verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
        }
      );
      if (user) {
        await NodeMailer.sendMail({
          to: [user.email],
          subject: 'Resend Email verification',
          html: `<h1>Your Otp is ${verification_token}</h1>`,
        });
        res.json({success: true});
      } else {
        throw new Error("User doesn't exist");
      }
    } catch (error) {
      next(error);
    }
  }
}
