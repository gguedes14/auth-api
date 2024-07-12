import ApiError from '../enum/ApiError';
import { UsersRepository } from '../model/repository/usersRepository';
import { getCustomRepository } from 'typeorm';

class UsersService {
  static async getProfile(options: { email: string }) {
    const usersRepository = getCustomRepository(UsersRepository);

    const findEmail = await usersRepository.findByEmail(options.email);

    if (!findEmail) {
      throw new Error('Email not found');
    }

    return findEmail;
  }

  static async updateUser(options: {
    name: string;
    lastName: string;
    userId: string;
    email: string;
    password?: string;
    old_password?: string;
  }) {
    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await usersRepository.findByUserId(options.userId);
    const emailExists = await usersRepository.findByEmail(options.email);

    if (!userExists) {
      throw new Error('User not found');
    }

    if (emailExists && emailExists.userId !== options.userId) {
      throw new ApiError('Email already in use', 400);
    }

    if (options.password && !options.old_password) {
      throw new Error('Old password is required');
    }

    if (options.password && options.old_password) {
      if (options.password === options.old_password) {
        throw new ApiError('Old password and new password are the same', 400);
      }
    }

    await usersRepository.update(userExists.id, {
      name: options.name,
      lastName: options.lastName,
      userId: options.userId,
      email: options.email,
      password: options.password,
    });

    return JSON.stringify({
      message: 'User updated with success',
      status: 200,
    });
  }
}

export default UsersService;
