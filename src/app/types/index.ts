import { Request } from 'express';

export type Token = string;

export type TokenPayload = {
  userId: number;
  iat: number;
  exp: number;
};

export interface MyRequest extends Request {
  user: TokenPayload;
}
