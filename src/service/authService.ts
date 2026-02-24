import { compare } from "bcrypt";
import { AuthRepository } from "../repository/authRepository";
import { sign } from "jsonwebtoken";

export class AuthService {
  static async login(email: string, password: string) {
    const userLogin = await AuthRepository.login(email);

    if (!userLogin) {
      throw new Error('User not found');
    }

    const validatePassword = await compare(password, userLogin.password);

    if (!validatePassword) {
      throw new Error('User or password invalid');
    }

    const jwtSecret = process.env.JWT_TOKEN;

    if(!jwtSecret) {
      throw new Error('Invalid login')
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
