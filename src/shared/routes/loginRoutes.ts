import { Router } from 'express';
import loginController from '../../controller/loginController';

const loginRouter = Router();

const login = new loginController();

loginRouter.post('/', login.create);

export default loginRouter;
