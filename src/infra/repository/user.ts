import { PrismaClient } from '@prisma/client';
import { UserRepository } from 'src/app/repository';
import { Setup } from 'src/domain/entity/setup';
import { User } from 'src/domain/entity/user';
import { ID } from 'src/domain/types';

export class QueryException extends Error {
  constructor() {
    super();
  }
}

export class UserRepositoryPrisma implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(user: User) {
    try {
      await this.prisma.users.createMany({
        data: {
          email: user.email,
          password: user.password,
          username: user.username,
        },
      });
      return 123 as any;
    } catch (error) {
      throw new QueryException();
    }
  }

  async createSetup(setup: Setup) {
    try {
      await this.prisma.setups.createMany({
        data: {
          description: setup.description,
          photo: setup.photo,
          userId: setup.userId,
        },
      });
    } catch (err) {
      throw new QueryException();
    }
  }

  async findByEmail(email: string) {
    try {
      const userDb = await this.prisma.users.findUnique({
        where: {
          email,
        },
        select: {
          email: true,
          password: true,
          username: true,
          id: true,
        },
      });

      return userDb
        ? new User({
            email: userDb.email,
            id: userDb.id,
            password: userDb.password,
            username: userDb.username,
          })
        : null;
    } catch (err) {
      throw new QueryException();
    }
  }

  async findById(userId: ID) {
    try {
      const userDb = await this.prisma.users.findUnique({
        where: {
          id: userId,
        },
        select: {
          email: true,
          password: true,
          username: true,
          id: true,
        },
      });

      return userDb
        ? new User({
            email: userDb.email,
            id: userDb.id,
            password: userDb.password,
            username: userDb.username,
          })
        : null;
    } catch (err) {
      throw new QueryException();
    }
  }

  async findSetupByUserId(userId: number) {
    try {
      const setupDb = await this.prisma.setups.findUnique({
        where: {
          userId: userId,
        },
        select: {
          description: true,
          id: true,
          photo: true,
          userId: true,
        },
      });

      return setupDb
        ? new Setup({
            description: setupDb.description,
            id: setupDb.id,
            photo: setupDb.photo,
            userId: setupDb.userId,
          })
        : null;
    } catch (err) {
      throw new QueryException();
    }
  }

  async findSetups() {
    try {
      const setupsDb = await this.prisma.setups.findMany({
        select: {
          description: true,
          id: true,
          photo: true,
          userId: true,
        },
      });

      const setups: Setup[] = [];

      for (const setupDb of setupsDb) {
        setups.push(
          new Setup({
            description: setupDb.description,
            id: setupDb.id,
            photo: setupDb.photo,
            userId: setupDb.userId,
          }),
        );
      }

      return setups;
    } catch (err) {
      throw new QueryException();
    }
  }
}
