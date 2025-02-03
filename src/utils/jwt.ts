import * as jwt from 'jsonwebtoken';
import {getEnvironmentVariable} from '../environments/environment';

export class Jwt {
  // JWT SIGN
  static jwtSign(payload) {
    jwt.sign(
      payload,
      getEnvironmentVariable().jwt_secret_key,
      {expiresIn: '180d'}
    );
  }

  // JWT verify
  static jwtVerify(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, getEnvironmentVariable().jwt_secret_key, (err, decoded) => {
        if (err) {
          reject(err);
        } else if (!decoded) {
          reject(new Error('user is not authorized.'));
        } else {
          resolve(decoded);
        }
      });
    });
  }
}