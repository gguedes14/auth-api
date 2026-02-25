import { UsersDTO, UpdateUserDTO } from "../dto/usersDto";
import { UsersRepository } from "../repository/usersRepository";
import { AppError } from "../errors/ApiError";
import { HttpStatus } from "../errors/enum/httpStatus";
import bcrypt from "bcrypt";
import { Prisma } from '@prisma/client';

export class UsersService {
  static async createUser(dto: UsersDTO) {
    const email = await UsersRepository.findByEmail(dto.email);

    if (email) {
      throw new AppError(HttpStatus.CONFLICT, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    await UsersRepository.createUser({
      ...dto,
      password: hashedPassword,
    });

    return 'User created with successfully'
  }

  static async findById(id: string) {
    const findId = await UsersRepository.findById(id)

    if (!findId) {
      throw new AppError(HttpStatus.NOT_FOUND, "User not found");
    }

    return findId;
  }

  static async updateUserById(id: string, dto: UpdateUserDTO) {
    const userExists = await UsersRepository.findById(id);

    if (!userExists) {
      throw new AppError(HttpStatus.NOT_FOUND, 'User not found');
    }

    try {
      return await UsersRepository.updateUserById(id, dto);
    } catch (error) {
        if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new AppError(HttpStatus.CONFLICT, 'Invalid e-mail');
      }

      throw error;
    }
  }
}
