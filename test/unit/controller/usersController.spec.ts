import { Request, Response } from 'express';
import UsersController from '../../../src/controller/usersController';
import createUserModel from '../../../src/model/UsersModel';
import TokensModel from '../../../src/model/TokensModel';

describe('UsersController createUser', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Create user', async () => {
    const request = {
      body: {
        name: 'John',
        last_name: 'Doe',
        email: 'email@email.com',
        user_id: 'user_id',
        password: 'password',
      },
    } as Request;

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    jest.spyOn(createUserModel, 'createUser').mockResolvedValueOnce(request.body);

    const fakeToken = 'fakeToken';

    jest
      .spyOn(TokensModel, 'saveToken')
      .mockResolvedValueOnce([{ email: 'email', token: fakeToken }]);

    await UsersController.createUser(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      name: 'John',
      last_name: 'Doe',
      email: 'email@email.com',
      user_id: 'user_id',
      password: 'password',
    });
  });

  test('Search by email', async () => {
    const request = {
      query: {
        email: 'email@example.com',
      },
    } as unknown as Request;

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockUser = { name: 'John', last_name: 'Doe', user_id: 1, email: 'email@example.com' };

    jest.spyOn(createUserModel, 'searchByEmail').mockResolvedValueOnce([mockUser]);

    await UsersController.searchByEmail(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith([mockUser]);
  });

  test('Search by email without email', async () => {
    const request = {
      query: {
        email: '',
      },
    } as unknown as Request;

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    jest.spyOn(createUserModel, 'searchByEmail').mockResolvedValueOnce([]);

    await UsersController.searchByEmail(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith([]);
  });
});
