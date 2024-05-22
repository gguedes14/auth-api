import { Router } from 'express';
import loginRouter from '../../shared/routes/loginRoutes';

const routes = Router();

routes.use('/login', loginRouter);

routes.get('/', (request, response) => {
  return response.json({
    message: 'Hello World',
  });
});

export default routes;
