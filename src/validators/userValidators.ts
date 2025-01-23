import {body} from 'express-validator';
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
              throw new Error('User already exists');
            } else {
              return true;
            }
          });
        }),
      body('password', 'Password is required').isAlphanumeric().isLength({min: 8, max: 25}).withMessage('Password must be between 8-20 characters'),
      body('type', 'User role type is required').isString(),
      body('status', 'User status is required').isString(),
    ];
  }

  static verify() {
    return [body('verification_token', 'Email verification token is required').isNumeric(), body('email', 'Email is required').isEmail()];
  }
}
