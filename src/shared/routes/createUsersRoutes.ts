import { Router } from 'express';
import createUserController from '../../controller/createUserController';

const createRouter = Router();

createRouter.post('/createUser', createUserController.create);

export default createRouter;
