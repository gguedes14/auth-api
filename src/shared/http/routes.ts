import { Router } from 'express';
import loginRouter from '../routes/createUsersRoutes';
import authenticate from '../routes/authRoutes';
import usersRoute from '../routes/usersRoutes';
import JwtAuthenticate from '../../utils/jwt';

const routes = Router();

routes.use('/users', loginRouter);

routes.use('/login', JwtAuthenticate, authenticate);

routes.use('/update', JwtAuthenticate, usersRoute);

routes.use('/profile', JwtAuthenticate, usersRoute);

export default routes;
