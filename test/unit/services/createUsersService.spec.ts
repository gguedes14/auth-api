import { getCustomRepository } from 'typeorm/index.js';
import loginService from '../../../src/services/createUsersService';
import ApiError from '../../../src/enum/ApiError';

jest.mock('typeorm', () => {
  const actualTypeorm = jest.requireActual('typeorm');
  return {
    ...actualTypeorm,
    getCustomRepository: jest.fn(),
  };
});

describe('Test loginService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Create a new user', async () => {
    const userMock = {
      name: 'John',
      lastName: 'Doe',
      userId: '',
      email: 'test@test.com',
      password: 'testpassword',
    };

    const usersRepositoryMock = {
      findByEmail: jest.fn().mockResolvedValue(undefined),
      create: jest.fn().mockImplementation(user => user),
      save: jest.fn().mockResolvedValue({
        ...userMock,
        userId: `John.Doe${Math.floor(Math.random() * 1000)}`,
      }),
    };

    (getCustomRepository as jest.Mock).mockReturnValue(usersRepositoryMock);

    const service = new loginService();
    const createdUser = await service.createUser(userMock);

    expect(createdUser).toHaveProperty('name', 'John');
    expect(createdUser).toHaveProperty('lastName', 'Doe');
    expect(createdUser).toHaveProperty('email', 'test@test.com');
    expect(createdUser).toHaveProperty('userId');
    expect(createdUser).toHaveProperty('password', 'testpassword');

    expect(usersRepositoryMock.findByEmail).toHaveBeenCalledWith(
      'test@test.com',
    );

    expect(usersRepositoryMock.create).toHaveBeenCalledWith({
      name: 'John',
      lastName: 'Doe',
      email: 'test@test.com',
      userId: expect.any(String),
      password: 'testpassword',
    });

    expect(usersRepositoryMock.save).toHaveBeenCalledWith({
      name: 'John',
      lastName: 'Doe',
      email: 'test@test.com',
      userId: expect.any(String),
      password: 'testpassword',
    });
  });

  test('Return error if user already exists', async () => {
    const userMock = {
      name: 'John',
      lastName: 'Doe',
      userId: 'john.doe123',
      email: 'email@email.com',
      password: 'testPass',
    };

    const usersRepositoryMock = {
      findByEmail: jest.fn().mockResolvedValue(userMock),
    };

    (getCustomRepository as jest.Mock).mockReturnValue(usersRepositoryMock);

    const service = new loginService();

    const createdUser = await service.createUser(userMock);

    expect(createdUser).toBeInstanceOf(ApiError);
  });
});
