import { UsersDTO } from "../dto/usersDto";
import { UsersRepository } from "../repository/usersRepository";
import bcrypt from "bcrypt";

export class UsersService {
  static async createUser(dto: UsersDTO) {
    const email = await UsersRepository.findByEmail(dto.email);

    if (email) {
      throw new Error("User already exists");
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
      throw new Error("User not found");
    }

    return findId;
  }
}
