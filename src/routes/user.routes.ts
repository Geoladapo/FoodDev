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
    this.router.get('/send-verification/email', GlobalMiddleware.auth, UserController.resendVerificationEmail);
    this.router.get('/login', UserValidator.login(), GlobalMiddleware.checkError, UserController.login);
    this.router.get('/send-reset-password-token', UserValidator.checkResetPasswordEmail(), GlobalMiddleware.checkError, UserController.sendResetPasswordOTP);
    this.router.get('/verify/reset-password', UserValidator.verifyResetPasswordToken(), GlobalMiddleware.checkError, UserController.verifyResetPasswordOTP);
    this.router.get('/profile',  GlobalMiddleware.auth, UserController.profile);

  }

  postRoutes() {
    this.router.post('/signup', UserValidator.signup(), GlobalMiddleware.checkError, UserController.signup);
  }

  patchRoutes() {
    this.router.patch('/reset-password', UserValidator.resetPassword(), GlobalMiddleware.checkError, UserController.resetPassword);
    this.router.patch('/verify-otp',GlobalMiddleware.auth, UserValidator.verifyEmailToken(),  GlobalMiddleware.checkError, UserController.verifyUserEmailToken);
    this.router.patch('/update-phone',  GlobalMiddleware.auth, UserValidator.verifyPhone(), GlobalMiddleware.checkError, UserController.updatePhoneNumber);
    this.router.patch('/update-profile',  GlobalMiddleware.auth, UserValidator.verifyUserProfile(), GlobalMiddleware.checkError, UserController.updateUserProfile);
  }

  putRoutes() {
  }

  deleteRoutes() {
  }
}

export default new UserRouter().router;
