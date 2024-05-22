import loginService from '../services/loginService';
import { Request, Response } from 'express';

class loginController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, lastName, userId, email, password } = request.body;

    const createUser = new loginService();

    const user = await createUser.createUser({
      name,
      lastName,
      userId,
      email,
      password,
    });

    return response.json(user);
  }
}

export default loginController;
