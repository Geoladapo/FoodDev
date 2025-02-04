import {Router} from 'express';
import {GlobalMiddleware} from '../middlewares/globalMiddleware';

class BannerRouter {
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
  }

  postRoutes() {
    this.router.post('/', )
  }

  patchRoutes() {

  }

  putRoutes() {
  }

  deleteRoutes() {
  }
}

export default new BannerRouter().router;
