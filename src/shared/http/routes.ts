import { Router } from 'express';
import loginRouter from '../routes/createUsersRoutes';
import authenticate from '../routes/authRoutes';
import JwtAuthenticate from '../../utils/jwt';

const routes = Router();

routes.use('/create', JwtAuthenticate, loginRouter);

routes.use('/login', authenticate);

routes.get('/', (request, response) => {
  return response.json({
    message: 'Hello World',
  });
});

export default routes;
