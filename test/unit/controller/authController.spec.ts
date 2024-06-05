import authController from '../../../src/controller/authController';
import authService from '../../../src/services/authService';
import { Request, Response } from 'express';

describe('Test authController', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Test authenticate', async () => {
    const requestMock = {
      body: {
        email: 'test',
        password: 'test',
      },
    } as Request;

    const responseMock = {
      json: jest.fn(),
    } as unknown as Response;

    const authenticateMock = jest
      .spyOn(authService, 'authenticate')
      .mockResolvedValue(requestMock.body);

    await new authController().authenticate(requestMock, responseMock);

    expect(authenticateMock).toHaveBeenCalledWith('test', 'test');
    expect(responseMock.json).toHaveBeenCalledWith(requestMock.body);
  });
});
