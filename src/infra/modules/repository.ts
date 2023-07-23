import { UserRepository } from 'src/app/repository';
import { UserRepositoryPrisma } from '../repository/user';
import { PrismaClient } from '@prisma/client';

class RepositoryModulePrisma {
  readonly userRepository: UserRepository;

  constructor(private prismaClient: PrismaClient) {
    this.userRepository = new UserRepositoryPrisma(this.prismaClient);
  }
}
export const repositoryModulePrisma = new RepositoryModulePrisma(
  new PrismaClient(),
);
