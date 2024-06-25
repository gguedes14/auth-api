import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../model/repository/usersRepository';
import ApiError from '../enum/ApiError';
import Env from '../utils/envVariables';
import { Tokens } from '../model/repository/tokensRepository';

class authService {
  static async authenticate(email: string, password: string) {
    const usersRepository = getCustomRepository(UsersRepository);
    const auth =
      (await usersRepository.findByEmail(email)) &&
      (await usersRepository.findByPass(password));

    if (!auth) {
      return new ApiError('User not found', 400);
    }

    const token = sign({}, Env.getTokenJwt(), {
      subject: auth.id.toString(),
      expiresIn: '2d',
    });

    return {
      auth,
      token,
    };
  }

  static async saveToken(token: string) {
    const tokensRepository = getCustomRepository(Tokens);

    token = sign({}, Env.getTokenJwt());

    const tokenSave = tokensRepository.create({
      token,
    });

    await tokensRepository.save(tokenSave);

    return token;
  }
}

export default authService;
