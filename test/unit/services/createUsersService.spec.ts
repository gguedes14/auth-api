import { getCustomRepository } from 'typeorm/index.js';
import loginService from '../../../src/services/createUsersService';

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

  test('Update user name', async () => {
    const userMock = {
      name: 'John',
      lastName: 'Doe',
      email: 'email@email.com',
      userId: 'John.Doe123',
      password: 'pass',
    };

    const usersRepositoryMock = {
      update: jest.fn(),
    };

    (getCustomRepository as jest.Mock).mockReturnValue(usersRepositoryMock);

    const service = new loginService();
    await service.updateName(userMock);

    expect(usersRepositoryMock.update).toHaveBeenCalledWith('John.Doe123', {
      name: 'John',
    });
  });

  test('User already exists', async () => {
    const userMock = {
      name: 'John',
      lastName: 'Doe',
      email: 'email@email.com',
      userId: 'John.Doe123',
      password: 'pass',
    };

    const usersRepositoryMock = {
      findByEmail: jest.fn().mockResolvedValue(userMock),
    };

    (getCustomRepository as jest.Mock).mockReturnValue(usersRepositoryMock);

    const service = new loginService();

    const createdUser = await service.createUser(userMock);

    expect(createdUser).toHaveProperty('message', 'User already exists');
    expect(createdUser).toHaveProperty('statusCode', 400);
  });
});
