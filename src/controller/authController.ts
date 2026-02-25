import { Request, Response } from 'express';
import { AuthService } from '../service/authService';
import { AppError } from '../errors/ApiError';

export class AuthController {
  static async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const login = await AuthService.login( email, password);

      res.status(200).send(login);
    } catch (error){
       if (error instanceof AppError) {
        res.status(401).send({ message: error.message });
       }
    }
  }
}
