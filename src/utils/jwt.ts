import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import Env from './envVariables';
import ApiError from '../enum/ApiError';

export default function JwtAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const header = request.headers.authorization;

  if (!header) {
    throw new ApiError('JWT is missing', 400);
  }

  const [, token] = header.split(' ');

  try {
    verify(token, Env.getTokenJwt());

    return next();
  } catch {
    throw new ApiError('JWT token invalid', 400);
  }
}
