import { Request, Response, NextFunction } from 'express';
import Env from '../../../src/utils/envVariables';
import JwtAuthenticate from '../../../src/utils/jwt';

describe('JwtAuthenticate', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('JwtAuthenticate without token', () => {
    const req = {
      headers: {},
    } as Request;

    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    expect(() => JwtAuthenticate(req, res, next)).toThrow('JWT is missing');
  });

  test('JwtAuthenticate with invalid token', () => {
    const req = {
      headers: {
        authorization: 'Bearer invalidToken',
      },
    } as Request;

    const res = {} as Response;

    const next = jest.fn() as NextFunction;

    jest.spyOn(Env, 'getTokenJwt').mockReturnValue('secret');

    expect(() => JwtAuthenticate(req, res, next)).toThrow('JWT token invalid');
  });
});
