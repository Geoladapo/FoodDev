import * as express from 'express';
import * as mongoose from 'mongoose';
import { getEnvironmentVariable } from './environments/environment';
import * as dotenv from 'dotenv';

dotenv.config();
let app: express.Application = express();

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

mongoose.connect(getEnvironmentVariable().db_uri).then(function () {
  console.log('connected to mongodb');
});
