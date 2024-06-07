import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../model/repository/usersRepository';
import ApiError from '../enum/ApiError';

interface ILogin {
  name: string;
  lastName: string;
  userId: string;
  email: string;
  password: string;
}

class loginService {
  public async createUser({ name, lastName, userId, email, password }: ILogin) {
    const usersRepository = getCustomRepository(UsersRepository);
    const usersExists = await usersRepository.findByEmail(email);

    if (usersExists) {
      return new ApiError('User already exists', 400);
    }

    const randomNumber = () => Math.floor(Math.random() * 1000);

    userId = `${name}.${lastName}${randomNumber()}`.toLowerCase();

    const user = usersRepository.create({
      name,
      lastName,
      email,
      userId,
      password,
    });

    await usersRepository.save(user);

    return user;
  }

  public async updateName({ userId, name }: ILogin) {
    const usersRepository = getCustomRepository(UsersRepository);

    await usersRepository.update(userId, { name });
  }
}

export default loginService;
