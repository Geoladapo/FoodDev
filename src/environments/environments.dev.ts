import { Environment } from './environment';
import 'dotenv/config';

export const DevEnvironment: Environment = {
  db_uri: process.env.MONGO_CONNECT,
};
