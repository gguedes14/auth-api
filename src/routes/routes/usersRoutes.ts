import { Router } from 'express';

import { UsersController } from '../../controller/usersController';
import { JwtAuthenticate } from '../../utils/jwt';

const usersRouter = Router();

usersRouter.post('/create', UsersController.createUser);
usersRouter.get('/:id', JwtAuthenticate, UsersController.findById);
usersRouter.patch('/:id', UsersController.updateUserById);

export { usersRouter };
