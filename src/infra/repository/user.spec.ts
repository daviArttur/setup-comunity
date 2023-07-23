import { UserRepository } from 'src/app/repository';
import { User } from 'src/domain/entity/user';
import { createSetupDtoStub, createUserDtoStub } from 'test/stub/dto';
import { PrismaClientStub } from 'test/stub/prisma';
import { QueryException, UserRepositoryPrisma } from './user';
import { Setup } from 'src/domain/entity/setup';

describe('test UserRepositoryPrisma', () => {
  let repository: UserRepository;

  let spy = {
    'setups.findMany': {} as jest.SpyInstance,
    'setups.createMany': {} as jest.SpyInstance,
    'setups.findUnique': {} as jest.SpyInstance,
    'users.createMany': {} as jest.SpyInstance,
    'users.findUnique': {} as jest.SpyInstance,
  };

  beforeEach(() => {
    const prismaStub = new PrismaClientStub().getStub();

    spy = {
      'setups.findMany': jest.spyOn(prismaStub.setups, 'findMany'),
      'setups.createMany': jest.spyOn(prismaStub.setups, 'createMany'),
      'setups.findUnique': jest.spyOn(prismaStub.setups, 'findUnique'),
      'users.createMany': jest.spyOn(prismaStub.users, 'createMany'),
      'users.findUnique': jest.spyOn(prismaStub.users, 'findUnique'),
    };

    repository = new UserRepositoryPrisma(prismaStub);
  });

  describe('test method create()', () => {
    it('should create user', async () => {
      // Act
      await repository.create(new User(createUserDtoStub));

      // Assert
      expect(spy['users.createMany']).toHaveBeenCalledWith({
        data: {
          email: createUserDtoStub.email,
          password: createUserDtoStub.password,
          username: createUserDtoStub.username,
        },
      });
    });

    it('should throw QueryException', () => {
      // Arrange
      spy['users.createMany'].mockImplementation(() => {
        throw new Error();
      });

      // Assert
      expect(repository.create(new User(createUserDtoStub))).rejects.toThrow(
        QueryException,
      );
    });
  });

  describe('test method createSetup()', () => {
    it('should create setup', async () => {
      // Act
      await repository.createSetup(new Setup(createSetupDtoStub));

      // Assert
      expect(spy['setups.createMany']).toHaveBeenCalledWith({
        data: {
          description: createSetupDtoStub.description,
          photo: createSetupDtoStub.photo,
          userId: createSetupDtoStub.userId,
        },
      });
    });

    it('should throw QueryException', () => {
      // Arrange
      spy['setups.createMany'].mockImplementation(() => {
        throw new Error();
      });

      // Assert
      expect(
        repository.createSetup(new Setup(createSetupDtoStub)),
      ).rejects.toThrow(QueryException);
    });
  });

  describe('test method findByEmail()', () => {
    it('should return an user', async () => {
      // Arrange
      spy['users.findUnique'].mockResolvedValue({
        email: createUserDtoStub.email,
        password: createUserDtoStub.password,
        username: createUserDtoStub.username,
        id: createUserDtoStub.id,
      });

      // Act
      const result = await repository.findByEmail(createUserDtoStub.email);

      // Assert
      expect(result).toEqual(new User(createUserDtoStub));
      expect(spy['users.findUnique']).toHaveBeenCalledWith({
        where: {
          email: createUserDtoStub.email,
        },
        select: {
          email: true,
          password: true,
          username: true,
          id: true,
        },
      });
    });

    it('should return null because user not found', async () => {
      // Arrange
      spy['users.findUnique'].mockResolvedValue(null);

      // Act
      const result = await repository.findByEmail(createUserDtoStub.email);

      // Assert
      expect(result).toBeNull();
    });

    it('should throw QueryException', () => {
      // Arrange
      spy['users.findUnique'].mockImplementation(() => {
        throw new Error();
      });

      // Assert
      expect(repository.findByEmail(createUserDtoStub.email)).rejects.toThrow(
        QueryException,
      );
    });
  });

  describe('test method findById()', () => {
    it('should return an user', async () => {
      // Arrange
      spy['users.findUnique'].mockResolvedValue({
        email: createUserDtoStub.email,
        password: createUserDtoStub.password,
        username: createUserDtoStub.username,
        id: createUserDtoStub.id,
      });

      // Act
      const result = await repository.findById(createUserDtoStub.id);

      // Assert
      expect(result).toEqual(new User(createUserDtoStub));
      expect(spy['users.findUnique']).toHaveBeenCalledWith({
        where: {
          id: createUserDtoStub.id,
        },
        select: {
          email: true,
          password: true,
          username: true,
          id: true,
        },
      });
    });

    it('should return null because user not found', async () => {
      // Arrange
      spy['users.findUnique'].mockResolvedValue(null);

      // Act
      const result = await repository.findById(createUserDtoStub.id);

      // Assert
      expect(result).toBeNull();
    });

    it('should throw QueryException', () => {
      // Arrange
      spy['users.findUnique'].mockImplementation(() => {
        throw new Error();
      });

      // Assert
      expect(repository.findById(createUserDtoStub.id)).rejects.toThrow(
        QueryException,
      );
    });
  });

  describe('test method findSetupByUserId()', () => {
    it('should return user setup', async () => {
      // Arrange
      spy['setups.findUnique'].mockResolvedValue({
        description: createSetupDtoStub.description,
        id: createSetupDtoStub.id,
        photo: createSetupDtoStub.photo,
        userId: createSetupDtoStub.userId,
      });

      // Act
      const result = await repository.findSetupByUserId(2);

      // Assert
      expect(result).toEqual(new Setup(createSetupDtoStub));
      expect(spy['setups.findUnique']).toHaveBeenCalledWith({
        where: {
          userId: 2,
        },
        select: {
          description: true,
          id: true,
          photo: true,
          userId: true,
        },
      });
    });

    it('should return null because setup not exist', async () => {
      // Arrange
      spy['setups.findUnique'].mockResolvedValue(null);

      // Act
      const result = await repository.findSetupByUserId(1);

      // Assert
      expect(result).toBeNull();
    });

    it('should throw QueryException', () => {
      // Arrange
      spy['setups.findUnique'].mockImplementation(() => {
        throw new Error();
      });

      // Assert
      expect(repository.findSetupByUserId(1)).rejects.toThrow(QueryException);
    });
  });

  describe('test method findSetupByUserId()', () => {
    it('should return null because setup not exist', async () => {
      // Arrange
      spy['setups.findMany'].mockResolvedValue([
        {
          description: createSetupDtoStub.description,
          id: createSetupDtoStub.id,
          photo: createSetupDtoStub.photo,
          userId: createSetupDtoStub.userId,
        },
      ]);

      // Act
      const result = await repository.findSetups();

      // Assert
      expect(result).toEqual([new Setup(createSetupDtoStub)]);
    });

    it('should throw QueryException', () => {
      // Arrange
      spy['setups.findMany'].mockImplementation(() => {
        throw new Error();
      });

      // Assert
      expect(repository.findSetups()).rejects.toThrow(QueryException);
    });
  });
});
