import {validationResult} from 'express-validator';
import {Jwt} from '../utils/jwt';

export class GlobalMiddleware {
  static checkError(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(new Error(errors.array()[0].msg));
    } else {
      next();
    }
  }

  static async auth(req, res, next) {
    const auth_header = req.header.authorization;
    const token = auth_header ? auth_header.slice(7, auth_header.length) : null;

    try {
      req.errorStatus = 401;
      const decoded = await Jwt.jwtVerify(token);
      req.user = decoded;
      next()
    } catch (e) {
      next(e);
    }

  }
}
