import {DevEnvironment} from './environments.dev';
import {ProdEnvironment} from './environments.prod';

export interface Environment {
  db_uri: string;
  mailtrap_auth?: {
    user: string;
    pass: string;
  };
  jwt_secret_key: string
}

export function getEnvironmentVariable() {
  if (process.env.NODE_ENV === 'production') {
    return ProdEnvironment;
  }
  return DevEnvironment;
}
