import { Router } from 'express';
import authController from '../../controller/authController';

const authRouter = Router();

authRouter.post('/', authController.authenticate);

export default authRouter;
