import {body, query} from 'express-validator';
import User from '../models/User';

export class UserValidator {
  static signup() {
    return [
      body('name', 'Name is required').isString(),
      body('phone', 'Phone number is required').isString(),
      body('email', 'Email is required')
        .isEmail()
        .custom((email, {req}) => {
          return User.findOne({email: email, type: 'user'}).then((user) => {
            if (user) {
              throw 'User already exists';
            } else {
              return true;
            }
          });
        }),
      body('password', 'Password is required').isAlphanumeric().isLength({
        min: 8,
        max: 25
      }).withMessage('Password must be between 8-20 characters'),
      body('type', 'User role type is required').isString(),
      body('status', 'User status is required').isString()
    ];
  }


  static login() {
    return [
      query('email', 'Email is required')
        .isEmail()
        .custom((email, {req}) => {
          return User.findOne({email: email}).then((user) => {
            if (user) {
              req.user = user;
              return true;
            } else {
              throw 'No user registered with such Email';
            }
          });
        }),
      query('password', 'Password is required').isAlphanumeric().isLength({
        min: 8,
        max: 25
      }).withMessage('Password must be between 8-20 characters')
    ];
  }

  static verifyEmailToken() {
    return [body('verification_token', 'Email verification token is required').isNumeric()];
  }

  static checkResetPasswordEmail() {
    return [
      query('email', 'Email is required')
        .isEmail()
        .custom((email, {req}) => {
          return User.findOne({email: email}).then((user) => {
            if (user) {
              return true;
            } else {
              throw 'No user registered with such Email';
            }
          });
        })
    ];
  }

  static verifyResetPasswordToken() {
    return [
      query('email', 'Email is required').isEmail(),
      query('reset_password_token', 'Reset password token is required').isNumeric()
        .custom((reset_password_token, {req}) => {
          return User.findOne(
            {
              email: req.query.email,
              reset_password_token: reset_password_token,
              reset_password_token_time: {$gt: Date.now()}
            }
          ).then((user) => {
            if (user) {
              return true;
            } else {
              throw new Error('Reset password token doesn\'t exist. Please regenerate a new Token');
            }
          });
        })
    ];
  }

  static resetPassword() {
    return [
      body('email', 'Email is required').isEmail()
        .custom((email, {req}) => {
          return User.findOne({email: req.query.email}).then((user) => {
            if (user) {
              return true;
            } else {
              throw new Error('No user registered with such Email');
            }
          });
        }),
      body('new_password', 'New Password is required'),
      body('reset_password_token', 'Reset password token is required').isNumeric()
        .custom((reset_password_token, {req}) => {
          if (req.user.reset_password_token === reset_password_token) {
            return true;
          } else {
            throw new Error('Reset password token is invalid. Please try again');
          }
        })
    ];
  }

  static verifyPhone() {
    return [body('phone', 'phone number is required').isString()];
  }

  static verifyUserProfile() {
    return [
      body('phone', 'Phone is required').isString(),
      body('email', 'Email is required').isEmail()
        .custom((email, {req}) => {
          if (req.user.email == email) throw ('please provide a email address to update user profile.');
          return User.findOne({email: email}).then((user) => {
            if (user) {
              throw ('A user with entered email already exist, please provide a unique email id');
            } else {
              return true;
            }
          }).catch(e => {
            throw new Error(e);
          });
        }),
      body('password', 'password is required').isAlphanumeric()
    ];
  }
}
