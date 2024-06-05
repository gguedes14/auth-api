import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../model/repository/usersRepository';
import ApiError from '../enum/ApiError';

class authService {
  static async authenticate(email: string, password: string) {
    const usersRepository = getCustomRepository(UsersRepository);
    const auth =
      (await usersRepository.findByEmail(email)) &&
      (await usersRepository.findByPass(password));

    if (!auth) {
      return new ApiError('User not found', 400);
    }

    return auth;
  }
}

export default authService;
