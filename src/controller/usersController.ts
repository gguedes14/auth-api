import { Request, Response } from 'express';
import createUserModel from '../model/UsersModel';
import TokensModel from '../model/TokensModel';
import { sign } from 'jsonwebtoken';
import Env from '../utils/envVariables';

class UsersController {
  static async createUser(request: Request, response: Response): Promise<Response> {
    const { name, last_name, email, user_id, password } = request.body;

    const user = await createUserModel.createUser({
      name,
      last_name,
      email,
      user_id,
      password,
    });

    const generateToken = sign({ email }, Env.getTokenJwt(), {
      expiresIn: '30d',
    });

    await TokensModel.saveToken({ email, token: generateToken });

    return response.status(200).json(user);
  }

  static async searchByEmail(request: Request, response: Response) {
    const { email } = request.body;

    const user = await createUserModel.searchByEmail({
      email: email,
    });

    if (!email) {
      return response.status(400).json({ message: 'Email is required' });
    }

    return response.status(200).json(user);
  }
}

export default UsersController;
