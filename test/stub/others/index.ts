import { MyRequest } from 'src/app/types';

export const authRequestStub = {
  user: {
    userId: 1,
    iat: new Date().getTime(),
    exp: new Date().getTime(),
  },
} as MyRequest;
