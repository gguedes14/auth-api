import { Router } from 'express';

import { UsersControler } from '../../controller/usersController';

const usersRouter = Router();

usersRouter.post('/create', UsersControler.createUser);
usersRouter.get('/:id', UsersControler.findById);

export default usersRouter;
