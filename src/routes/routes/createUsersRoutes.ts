import { Router } from 'express';
import UsersController from '../../controller/usersController';
import JwtAuthenticate from '../../utils/jwt';

const createRouter = Router();

createRouter.post('/create', UsersController.createUser);

createRouter.post('/search', JwtAuthenticate, UsersController.searchByEmail);

export default createRouter;
