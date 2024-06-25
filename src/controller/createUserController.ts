import authService from '../services/authService';
import createUserService from '../services/createUsersService';
import { Request, Response } from 'express';

class createUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, lastName, userId, email, password, token } = request.body;

    const createUser = new createUserService();

    const user = await createUser.createUser({
      name,
      lastName,
      userId,
      email,
      password,
    });

    await authService.saveToken(token);

    return response.json(user);
  }
}

export default createUserController;
