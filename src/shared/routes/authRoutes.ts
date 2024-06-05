import { Router } from 'express';
import authController from '../../controller/authController';

const authRouter = Router();

const auth = new authController();

authRouter.post('/', auth.authenticate);

export default authRouter;
