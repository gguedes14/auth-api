import { Request, Response } from 'express';
import usersService from '../services/usersService';

class updateUserController {
  static async getProfile(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email } = request.query;

    const user = await usersService.getProfile({ email: email as string });

    return response.json(user);
  }

  static async update(request: Request, response: Response): Promise<Response> {
    const { name, lastName, userId, email, password, old_password } =
      request.body;

    const user = await usersService.updateUser({
      name,
      lastName,
      userId,
      email,
      password,
      old_password,
    });

    return response.json(user);
  }
}

export default updateUserController;
