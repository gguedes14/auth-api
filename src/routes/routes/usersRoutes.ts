import { Router } from 'express';

import { UsersControler } from '../../controller/usersController';
import { JwtAuthenticate } from '../../utils/jwt';

const usersRouter = Router();

usersRouter.post('/create', UsersControler.createUser);
usersRouter.get('/:id', JwtAuthenticate, UsersControler.findById);

export { usersRouter };
