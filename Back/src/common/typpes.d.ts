import { Request } from 'express';
import { JwtPayload } from '@nestjs/jwt';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & {
        id: string;
        email: string;
        username: string;
      };
    }
  }
}