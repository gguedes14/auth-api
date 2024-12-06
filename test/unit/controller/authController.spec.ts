import AuthController from '../../../src/controller/authController';
import { Request, Response } from 'express';
import createUserModel from '../../../src/model/UsersModel';

describe('Controller Auth Controller', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('authenticate', async () => {
    const request = {
      body: {
        email: 'email@email.com',
        password: 'password123',
      },
    } as Request;

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    jest.spyOn(createUserModel, 'searchByEmail').mockResolvedValue([{ email: 'email@email.com' }]);
    jest.spyOn(createUserModel, 'searchByPassword').mockResolvedValue([{ password: 'password123' }]);

    await AuthController.authenticate(request, response);

    expect(createUserModel.searchByEmail).toHaveBeenCalledWith({ email: 'email@email.com' });
    expect(createUserModel.searchByPassword).toHaveBeenCalledWith({ password: 'password123' });

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith('Authentication successful');
  });

  test('authenticate with user not found', async () => {
    const request = {
      body: {
        email: '',
        password: '',
      },
    } as Request;

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as never as Response;

    jest.spyOn(createUserModel, 'searchByEmail').mockResolvedValue(request.body.email);
    jest.spyOn(createUserModel, 'searchByPassword').mockResolvedValue(request.body.password);

    await AuthController.authenticate(request, response);

    expect(createUserModel.searchByEmail).toHaveBeenCalledWith({ email: '' });
    expect(createUserModel.searchByPassword).toHaveBeenCalledWith({ password: '' });

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({ message: 'User not found' });
  });
});
