import authService from '../services/authService';
import { Request, Response } from 'express';

class authController {
  public async authenticate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email, password } = request.body;

    const auth = await authService.authenticate(email, password);

    return response.json(auth);
  }
}

export default authController;
