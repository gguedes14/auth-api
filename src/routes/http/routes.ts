import { Router } from 'express';
import createRouter from '../routes/createUsersRoutes';
import authRouter from '../routes/authRoutes';

const routes = Router();

routes.use('/users', createRouter);

routes.use('/login', authRouter);

export default routes;
