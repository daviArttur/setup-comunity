import { PrismaClient } from '@prisma/client';

export class PrismaClientStub {
  getStub() {
    return {
      users: {
        createMany: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
      },
      setups: {
        createMany: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
      },
    } as any as PrismaClient;
  }
}
