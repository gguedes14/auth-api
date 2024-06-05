import { getCustomRepository } from 'typeorm/index.js';
import authService from '../../../src/services/authService';
import ApiError from '../../../src/enum/ApiError';

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
      findByEmail: jest.fn().mockResolvedValue({}),
      findByPass: jest.fn().mockResolvedValue({}),
    };

    (getCustomRepository as jest.Mock).mockReturnValue(usersRepositoryMock);

    const email = 'email@email.com';

    const password = 'password';

    const result = await authService.authenticate(email, password);

    expect(result).toBeTruthy();
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
