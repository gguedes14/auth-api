import { Router } from 'express';
import authController from '../../controller/authController';

const authRouter = Router();

authRouter.post('/login', authController.authenticate);

export default authRouter;
