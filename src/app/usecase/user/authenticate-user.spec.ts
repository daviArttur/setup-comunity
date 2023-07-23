import { UserRepositoryStub } from 'test/stub/repository';
import { AuthenticateUserUseCase } from './authenticate-user';
import { User } from 'src/domain/entity/user';
import { createUserDtoStub } from 'test/stub/dto';
import { InvalidLoginException } from 'src/app/errors/exceptions';

const hashServiceStub = {
  compare: jest.fn(),
};

const authServiceStub = {
  generateAuthToken: jest.fn(),
};

describe('test AuthenticateUserUseCase', () => {
  let usecase: AuthenticateUserUseCase;

  let spy = {
    'userRepository.findByEmail': {} as jest.SpyInstance,
    'hashService.compare': {} as jest.SpyInstance,
    'authService.generateAuthToken': {} as jest.SpyInstance,
  };

  beforeEach(() => {
    const userRepositoryStub = new UserRepositoryStub().getRepository();
    spy = {
      'userRepository.findByEmail': jest.spyOn(
        userRepositoryStub,
        'findByEmail',
      ),
      'hashService.compare': jest.spyOn(hashServiceStub, 'compare'),
      'authService.generateAuthToken': jest.spyOn(
        authServiceStub,
        'generateAuthToken',
      ),
    };

    usecase = new AuthenticateUserUseCase(
      userRepositoryStub,
      hashServiceStub,
      authServiceStub,
    );
  });

  it('should authenticate user and return token', async () => {
    // Arrange
    let callsCount = 0;
    spy['userRepository.findByEmail'].mockResolvedValue(
      new User(createUserDtoStub),
    );
    spy['hashService.compare'].mockResolvedValue(true);
    spy['authService.generateAuthToken'].mockImplementation(() => {
      if (callsCount === 0) {
        callsCount++;
        return 'accessToken';
      } else {
        return 'refreshToken';
      }
    });

    // Act
    const token = await usecase.execute({
      email: createUserDtoStub.email,
      password: createUserDtoStub.password,
    });

    // Assert
    expect(token).toEqual({
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    });
    expect(spy['authService.generateAuthToken']).toHaveBeenNthCalledWith(1, {
      userId: createUserDtoStub.id,
      config: { expiresIn: 1000 * 60 * 5 },
    });
    expect(spy['authService.generateAuthToken']).toHaveBeenNthCalledWith(2, {
      userId: createUserDtoStub.id,
      config: { expiresIn: 1000 * 60 * 60 * 24 * 7 },
    });
  });

  it('shold throw InvalidLoginException baucase user not found', () => {
    // Arrange
    spy['userRepository.findByEmail'].mockResolvedValue(null);

    // Act
    expect(
      usecase.execute({
        email: createUserDtoStub.email,
        password: createUserDtoStub.password,
      }),
    ).rejects.toThrow(InvalidLoginException);
  });

  it('shold throw InvalidLoginException because compare password return false', async () => {
    // Arrange
    spy['userRepository.findByEmail'].mockResolvedValue(
      new User(createUserDtoStub),
    );
    spy['hashService.compare'].mockResolvedValue(false);

    // Act
    expect(
      usecase.execute({
        email: createUserDtoStub.email,
        password: createUserDtoStub.password,
      }),
    ).rejects.toThrow(InvalidLoginException);
  });
});
