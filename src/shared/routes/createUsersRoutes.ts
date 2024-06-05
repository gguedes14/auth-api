import { Router } from 'express';
import createUserController from '../../controller/createUserController';

const createRouter = Router();

const createUser = new createUserController();

createRouter.post('/', createUser.create);

export default createRouter;
