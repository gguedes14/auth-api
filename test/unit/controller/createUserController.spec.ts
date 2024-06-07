import loginController from '../../../src/controller/createUserController';
import loginService from '../../../src/services/createUsersService';
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

  test('Test updateName', async () => {
    const requestMock = {
      body: {
        name: 'test',
      },
    } as Request;

    const responseMock = {
      json: jest.fn(),
    } as unknown as Response;

    const updateNameMock = jest
      .spyOn(loginService.prototype, 'updateName')
      .mockResolvedValue(undefined);

    await new loginController().updateName(requestMock, responseMock);

    expect(updateNameMock).toHaveBeenCalledWith('test');
    expect(responseMock.json).toHaveBeenCalledWith({
      message: 'Name updated successfully',
    });
  });
});
