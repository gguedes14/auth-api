import { Request, Response } from "express";
import { UsersService } from "../service/usersService";

export class UsersControler {
  static async createUser(req: Request, res: Response) {
    try {
      const { name, taxId, email, password, birthDate } = req.body;

      const user = await UsersService.createUser({
        name,
        email,
        password,
        birthDate: new Date(birthDate).toISOString(),
        taxId
      });

      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          message: error.message
        });
      }
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await UsersService.findById(id);

      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          message: error.message
        });
      }
    }
  }
}
