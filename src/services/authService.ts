import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../model/repository/usersRepository';
import ApiError from '../enum/ApiError';
import Env from '../utils/envVariables';
import { Tokens } from '../model/repository/tokensRepository';

class authService {
  static async authenticate(email: string, password: string) {
    const usersRepository = getCustomRepository(UsersRepository);
    const authEmail = await usersRepository.findByEmail(email);

    const authPass = await usersRepository.findByPass(password);

    if (!authEmail) {
      return new ApiError('User not found', 400);
    }

    if (!authPass) {
      return new ApiError('User not found', 400);
    }

    sign({}, Env.getTokenJwt(), {
      subject: authPass.id.toString(),
      expiresIn: '30d',
    });

    return 'login with sucess';
  }

  static async saveToken(token: string, email: string) {
    const tokensRepository = getCustomRepository(Tokens);
    const usersRepository = getCustomRepository(UsersRepository);

    const verifyUserRegistry = await usersRepository.findByEmail(email);

    if (!verifyUserRegistry) {
      throw new ApiError('User not found', 400);
    }

    const verifyTokenRegistry = await tokensRepository.findByToken(
      token,
      email,
    );

    if (verifyTokenRegistry) {
      throw new ApiError('Token already exists', 400);
    }

    email = verifyUserRegistry.email;

    token = sign({}, Env.getTokenJwt());

    await tokensRepository.findByToken(token, email);

    const tokenSave = tokensRepository.create({
      token,
      email,
    });

    await tokensRepository.save(tokenSave);

    return tokenSave;
  }
}

export default authService;
