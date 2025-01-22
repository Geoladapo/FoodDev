import User from '../models/User';
import { validationResult } from 'express-validator';

export class UserController {
  static async signup(req, res, next) {
    const errors = validationResult(req);
    const { name, phone, email, password, type, status } = req.body;
    if (!errors.isEmpty()) {
      next(new Error(errors.array()[0].msg));
    }
    const data = {
      name,
      email,
      phone,
      password,
      type,
      status,
    };

    try {
      let user = await new User(data);
      res.send(user);
    } catch (error) {
      next(error);
    }
  }
}
