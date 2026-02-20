import { Router } from 'express';

import { UsersControler } from '../../controller/usersController';

const createRouter = Router();

createRouter.post('/create', UsersControler.createUser);

export default createRouter;
