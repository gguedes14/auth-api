import { getCustomRepository } from 'typeorm/index.js';
import authService from '../../../src/services/authService';
import ApiError from '../../../src/enum/ApiError';
import Env from '../../../src/utils/envVariables';
import { sign } from 'jsonwebtoken';

jest.mock('typeorm', () => {
  const actualTypeorm = jest.requireActual('typeorm');
  return {
    ...actualTypeorm,
    getCustomRepository: jest.fn(),
  };
});

describe('Test authService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Authenticate user', async () => {
    const usersRepositoryMock = {
      findByEmail: jest.fn().mockResolvedValue({ id: 1 }),
      findByPass: jest.fn().mockResolvedValue({ id: 1 }),
    };

    (getCustomRepository as jest.Mock).mockReturnValue(usersRepositoryMock);

    const email = 'email@email.com';

    const password = 'password';

    const result = await authService.authenticate(email, password);

    expect(result).toEqual({
      auth: { id: 1 },
      token: sign({}, Env.getTokenJwt(), {
        subject: '1',
        expiresIn: '1d',
      }),
    });

    expect(usersRepositoryMock.findByEmail).toHaveBeenCalledWith(email);
    expect(usersRepositoryMock.findByPass).toHaveBeenCalledWith(password);
  });

  test('Authenticate user with wrong email', async () => {
    const usersRepositoryMock = {
      findByEmail: jest.fn().mockResolvedValue(undefined),
    };

    (getCustomRepository as jest.Mock).mockReturnValue(usersRepositoryMock);

    const email = 'email@email.com';

    const password = 'password';

    const result = await authService.authenticate(email, password);

    expect(result).toBeInstanceOf(ApiError);
  });
});
