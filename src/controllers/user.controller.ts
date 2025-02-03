import User from '../models/User';
import {NodeMailer} from '../utils/nodemailer';
import {Utils} from '../utils/utils';
import {Jwt} from '../utils/jwt';


export class UserController {

  static async signup(req, res, next) {
    var verification_token = Utils.generateVerificationToken(6);

    const {name, phone, password, email, type, status} = req.body;

    const hash = await Utils.encryptPassword(password);

    try {

      const data = {
        name,
        email,
        verification_token,
        verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
        phone,
        password: hash,
        type,
        status
      };

      let user = await new User(data).save();
      const payload = {
        user_id: user._id,
        email: user.email
      };
      const token = Jwt.jwtSign(payload);

      res.json({token, user});
      await NodeMailer.sendMail({
        to: [user.email],
        subject: 'Email verification',
        html: `<h1>Your Otp is ${verification_token}</h1>`
      });

    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    const user = req.user;
    const {password} = req.query;
    const data = {
      password, encrypt_password: user.password
    };
    try {
      await Utils.comparePassword(data);
      const payload = {
        user_id: user._id,
        email: user.email
      };
      const token = Jwt.jwtSign(payload);

      res.json({token, user});
    } catch (err) {
      next(err);
    }
    res.send(req.user);
  }

  static async verifyUserEmailToken(req, res, next) {
    const {verification_token} = req.body;
    const {email} = req.user;
    try {
      const user = await User.findOneAndUpdate(
        {
          email: email,
          verification_token: verification_token,
          verification_token_time: {$gt: Date.now()}
        },
        {
          email_verified: true,
          updated_at: new Date()
        },
        {new: true}
      );
      if (user) {
      } else {
        throw new Error('Wrong OTP or Email verification token is expired.Please try again...');
      }
    } catch (error) {
      next(error);
    }
  }

  static async resendVerificationEmail(req, res, next) {
    const {email} = req.user;
    const verification_token = Utils.generateVerificationToken(6);
    try {
      const user = await User.findOneAndUpdate(
        {email: email},
        {
          updated_at: new Date(),
          verification_token: verification_token,
          verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME
        }
      );
      if (user) {
        res.json({success: true});
        await NodeMailer.sendMail({
          to: [user.email],
          subject: 'Resend Email verification',
          html: `<h1>Your Otp is ${verification_token}</h1>`
        });
      } else {
        throw new Error('User doesn\'t exist');
      }
    } catch (error) {
      next(error);
    }
  }

  static async sendResetPasswordOTP(req, res, next) {
    const {email} = req.query;
    const reset_password_token = Utils.generateVerificationToken();
    try {
      const user = await User.findOneAndUpdate(
        {email: email},
        {
          updated_at: new Date(),
          reset_password_token: reset_password_token,
          reset_password_token_time: Date.now() + new Utils().MAX_TOKEN_TIME
        }
      );
      if (user) {
        res.json({success: true});
        await NodeMailer.sendMail({
          to: [user.email],
          subject: 'Reset Password Email verification OTP',
          html: `<h1>Your Otp is ${reset_password_token}</h1>`
        });
      } else {
        throw new Error('User doesn\'t exist');
      }
    } catch (error) {
      next(error);
    }
  }

  static verifyResetPasswordOTP(req, res, next) {
    try {
      res.json({success: true});
    } catch (e) {
      next(e);
    }
  }

  static async resetPassword(req, res, next) {
    const user = req.user;
    const {new_password} = req.body;
    try {
      const encryptedPassword = await Utils.encryptPassword(new_password);
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
          updated_at: new Date(),
          password: new_password
        }, {new: true}
      );
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        throw new Error('User doesn\'t exist');
      }
    } catch (error) {
      next(error);
    }
  }

  static async profile(req, res, next) {
    const user = req.user;
    try {
      const profile = await User.findById(user._id);
      if (profile) {
        res.send(profile);
      } else {
        throw new Error('USer doesn\'t exist');
      }
    } catch (e) {
      next(e);
    }
  }

  static async updatePhoneNumber(req, res, next) {
    const user = req.user;
    const {phone} = req.body;
    try {
      const userData = await User.findByIdAndUpdate(user._id, {
        phone: phone
      }, {new: true});
      res.send(userData);
    } catch (e) {
      next(e);
    }
  }

  static async updateUserProfile(req, res, next) {
    const user = req.user;
    const {phone, new_email, password} = req.body;
    const verification_token = Utils.generateVerificationToken();

    try {
      const userData = await User.findById(user._id);

      if (!userData) throw new Error('User does not exist');
      await Utils.comparePassword({password: password, encrypt_password: userData.password});

      const updatedUser = await User.findByIdAndUpdate(user._id, {
        phone: phone,
        email: new_email,
        email_verified: false,
        verification_token,
        verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
        updated_at: Date.now()
      }, {new: true});

      const payload = {
        user_id: user._id,
        email: updatedUser.email
      }
      const token = Jwt.jwtSign(payload)
      res.json({token: token, user: updatedUser})
      await NodeMailer.sendMail({
        to: [user.email],
        subject: 'Resend Email verification',
        html: `<h1>Your Otp is ${verification_token}</h1>`
      })
    } catch (e) {
      next(e);
    }
  }
}
