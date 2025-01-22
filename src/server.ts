import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import { getEnvironmentVariable } from './environments/environment';
import UserRouter from './routes/user.routes';

export class Server {
  public app: express.Application = express();
  constructor() {
    this.setConfig();
    this.setRoutes();
    this.error404Handler();
    this.handleErrors();
  }

  setConfig() {
    this.connectMongoDb();
    this.configureBodyParser();
  }
  connectMongoDb() {
    mongoose.connect(getEnvironmentVariable().db_uri).then(function () {
      console.log('connected to mongodb');
    });
  }

  configureBodyParser() {
    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
  }
  setRoutes() {
    this.app.use('/api/user', UserRouter);
  }

  error404Handler() {
    this.app.use((req, res) => {
      res.status(404).json({
        message: 'Not found',
        statusCode: 404,
      });
    });
  }

  handleErrors() {
    this.app.use((error, req, res, next) => {
      const errorStatus = req.errorStatus || 500;
      res.status(errorStatus).json({
        message: error.message || 'Something went wrong, Please try again',
        statusCode: errorStatus,
      });
    });
  }
}
