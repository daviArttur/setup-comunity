import { UserRepository } from 'src/app/repository';

export class UserRepositoryStub {
  getRepository() {
    return {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      findSetupByUserId: jest.fn(),
      createSetup: jest.fn(),
      findSetups: jest.fn(),
    };
  }
}

export const userRepositoryStub = {
  create: jest.fn(),
  findByEmail: jest.fn(),
  findById: jest.fn(),
  findSetupByUserId: jest.fn(),
  createSetup: jest.fn(),
  findSetups: jest.fn(),
} as UserRepository;
