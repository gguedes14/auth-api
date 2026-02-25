import { compare } from "bcrypt";
import { AuthRepository } from "../repository/authRepository";
import { sign } from "jsonwebtoken";
import { AppError } from "../errors/ApiError";
import { HttpStatus } from "../errors/enum/httpStatus";

export class AuthService {
  static async login(email: string, password: string) {
    const userLogin = await AuthRepository.login(email);

    if (!userLogin) {
      throw new AppError(HttpStatus.NOT_FOUND, 'User not found');
    }

    const validatePassword = await compare(password, userLogin.password);

    if (!validatePassword) {
      throw new AppError(HttpStatus.UNAUTHORIZED, 'User or password invalid');
    }

    const jwtSecret = process.env.JWT_TOKEN;

    if(!jwtSecret) {
      throw new AppError(HttpStatus.CONFLICT, 'Invalid login')
    }

    const accessToken = sign({
      id: userLogin.id,
      email: userLogin.email
    }, jwtSecret, {
      expiresIn: 86400
    });

    return accessToken
  }
}
