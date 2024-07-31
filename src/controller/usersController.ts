import { Request, Response } from 'express';
import createUserModel from '../model/UsersModel';

class UsersController {
  static async createUser(request: Request, response: Response): Promise<Response> {
    const { name, last_name, email, user_id, password } = request.body;

    if (user_id === null) {
      const randomNumber = () => Math.floor(Math.random() * 1000);

      const userId = `${name}.${last_name}${randomNumber()}`.toLowerCase();

      const user = await createUserModel.createUser({
        name,
        last_name,
        email,
        user_id: userId,
        password,
      });

      return response.status(200).json(user);
    } else {
      const user = await createUserModel.createUser({
        name,
        last_name,
        email,
        user_id,
        password,
      });

      return response.status(200).json(user);
    }
  }

  static async searchByEmail(request: Request, response: Response) {
    const { email } = request.query;

    const user = await createUserModel.searchByEmail({
      email: email as string,
    });

    if (!email) {
      return response.status(400).json({ message: 'Email is required' });
    }

    return response.status(200).json(user);
  }
}

export default UsersController;
