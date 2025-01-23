import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserValidator } from '../validators/userValidators';
import { GlobalMiddleware } from '../middlewares/globalMiddleware';

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

  getRoutes() {}
  postRoutes() {
    this.router.post(
      '/signup',
      UserValidator.signup(),
      GlobalMiddleware.checkError,
      UserController.signup
    );
  }
  patchRoutes() {
    this.router.patch(
      '/verify',
      UserValidator.verify(),
      GlobalMiddleware.checkError,
      UserController.verify
    );
  }
  putRoutes() {}
  deleteRoutes() {}
}

export default new UserRouter().router;
