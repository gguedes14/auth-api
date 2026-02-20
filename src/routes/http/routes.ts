import { Router } from 'express';
import createRouter from '../routes/createUsersRoutes';

const routes = Router();

routes.use('/users', createRouter);

export default routes;
