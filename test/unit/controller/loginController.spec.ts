import loginController from '../../../src/controller/loginController';
import loginService from '../../../src/services/loginService';
import { Request, Response } from 'express';

describe('Test loginController', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Test create', async () => {
    const requestMock = {
      body: {
        name: 'test',
        lastName: 'test',
        userId: 'test',
        email: 'test',
        password: 'test',
      },
    } as Request;

    const responseMock = {
      json: jest.fn(),
    } as unknown as Response;

    const createUserMock = jest
      .spyOn(loginService.prototype, 'createUser')
      .mockResolvedValue(requestMock.body);

    await new loginController().create(requestMock, responseMock);

    expect(createUserMock).toHaveBeenCalledWith(requestMock.body);
    expect(responseMock.json).toHaveBeenCalledWith(requestMock.body);
  });
});
