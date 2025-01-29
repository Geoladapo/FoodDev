import {Environment} from './environment';
import 'dotenv/config';

export const DevEnvironment: Environment = {
  db_uri: process.env.MONGO_CONNECT,
  mailtrap_auth: {
    user: '9fc234822decf2',
    pass: 'c0d2fe2a6a14c6',
  },
  jwt_secret_key: process.env.secret_key_dev
};
