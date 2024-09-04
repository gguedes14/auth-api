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

    const statusMock = jest.fn().mockReturnThis();
    const jsonMock = jest.fn();

    const response = {
      status: statusMock,
      json: jsonMock,
    } as unknown as Response;

    jest.spyOn(createUserModel, 'searchByEmail').mockResolvedValue([{ email: 'email@email.com' }]);
    jest
      .spyOn(createUserModel, 'searchByPassword')
      .mockResolvedValue([{ password: 'password123' }]);

    await new AuthController().authenticate(request, response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith('Authentication successful');
  });
});
