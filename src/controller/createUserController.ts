import createUserService from '../services/createUsersService';
import { Request, Response } from 'express';

class createUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, lastName, userId, email, password } = request.body;

    const createUser = new createUserService();

    const user = await createUser.createUser({
      name,
      lastName,
      userId,
      email,
      password,
    });

    return response.json(user);
  }

  public async updateName(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name } = request.body;

    const createUser = new createUserService();

    await createUser.updateName(name);

    return response.json({ message: 'Name updated successfully' });
  }
}

export default createUserController;
