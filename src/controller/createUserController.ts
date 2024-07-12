import loginService from '../services/createUsersService';
import { Request, Response } from 'express';
import authService from '../services/authService';

class createUserController {
  static async create(request: Request, response: Response): Promise<Response> {
    const { name, lastName, userId, email, password, token } = request.body;

    const user = await loginService.createUser({
      name,
      lastName,
      userId,
      email,
      password,
    });

    await authService.saveToken(token, email);

    return response.json(user);
  }
}

export default createUserController;
