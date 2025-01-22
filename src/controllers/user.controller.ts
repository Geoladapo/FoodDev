import User from '../models/User';
import { validationResult } from 'express-validator';

export class UserController {
  static signup(req, res, next) {
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

    let user = new User(data);

    user
      .save()
      .then((user) => res.send(user))
      .catch((e) => {
        next(e);
      });
  }
}
