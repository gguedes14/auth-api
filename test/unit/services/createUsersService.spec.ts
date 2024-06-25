// @ts-ignore
import { UsersRepository } from '../../../src/model/repository/usersRepository';
import loginService from '../../../src/services/createUsersService';
import connection from '../../../src/shared/typeOrm/connection';

describe('Test loginService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeAll(async () => {
    await connection.create();
  });

  test('Create a new user', async () => {
    jest
      .spyOn(UsersRepository.prototype, 'findByEmail')
      .mockResolvedValue(undefined);

    const service = new loginService();
    const user = await service.createUser({
      name: 'John',
      lastName: 'Doe',
      userId: '',
      email: 'email@email.com',
      password: 'password',
    });

    expect(user).toEqual({
      id: expect.any(Number),
      name: 'John',
      lastName: 'Doe',
      userId: expect.stringMatching(/^john\.doe\d{1,3}$/),
      email: 'email@email.com',
      password: 'password',
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  test('User already exists', async () => {
    jest.spyOn(UsersRepository.prototype, 'findByEmail').mockResolvedValue({
      id: 1,
      name: 'John',
      lastName: 'Doe',
      userId: 'john.doe123',
      email: 'email@email.com',
      password: 'password',
      token: [],
      created_at: new Date(),
      updated_at: new Date(),
    });

    const service = new loginService();

    const user = await service.createUser({
      name: 'John',
      lastName: 'Doe',
      userId: 'john.doe123',
      email: 'email@email.com',
      password: 'password',
    });

    expect(user).toEqual({
      statusCode: 400,
      message: 'User already exists',
    });
  });
});
