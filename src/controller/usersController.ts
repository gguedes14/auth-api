import { Request, Response } from "express";
import { UsersService } from "../service/usersService";

export class UsersController {
  static async createUser(req: Request, res: Response) {
    const { name, lastName, taxId, email, password, birthDate } = req.body;

    try {
      const user = await UsersService.createUser({
        name,
        lastName,
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
    const { id } = req.params;

    try {
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

  static async updateUserById(req: Request, res: Response) {
    const { id } = req.params;
    const { name, lastName, taxId, email, birthDate } = req.body;

    try {
      const updateUser = await UsersService.updateUserById(id, {
        name,
        lastName,
        taxId,
        email,
        ...(birthDate && {
          birthDate: new Date(birthDate),
        }),
      });

      return res.status(200).json(updateUser);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          message: "Invalid e-mail"
        });
      }
    }
  }
}
