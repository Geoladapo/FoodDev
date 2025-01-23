import { DevEnvironment } from './environments.dev';
import { ProdEnvironment } from './environments.prod';

export interface Environment {
  db_uri: string;
  gmail_auth?: {
    user: string;
    pass: string;
  };
}

export function getEnvironmentVariable() {
  if (process.env.NODE_ENV === 'production') {
    return ProdEnvironment;
  }
  return DevEnvironment;
}
