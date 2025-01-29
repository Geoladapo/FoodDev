import {Router} from 'express';
import {UserController} from '../controllers/user.controller';
import {UserValidator} from '../validators/userValidators';
import {GlobalMiddleware} from '../middlewares/globalMiddleware';

class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }

  getRoutes() {
    this.router.get('/send-verification/email', UserValidator.verifyUserForResendEmail(),GlobalMiddleware.checkError, UserController.resendVerificationEmail);
    this.router.get('/login', UserValidator.login(), GlobalMiddleware.checkError, UserController.login);
  }
  postRoutes() {
    this.router.post('/signup', UserValidator.signup(), GlobalMiddleware.checkError, UserController.signup);
  }
  patchRoutes() {
    this.router.patch('/verify', UserValidator.verify(), GlobalMiddleware.checkError, UserController.verify);
  }
  putRoutes() {}
  deleteRoutes() {}
}

export default new UserRouter().router;
