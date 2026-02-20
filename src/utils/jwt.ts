import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
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
    verify(token, process.env.JWT_TOKEN || '');

    return next();
  } catch {
    throw new ApiError('JWT token invalid', 400);
  }
}
