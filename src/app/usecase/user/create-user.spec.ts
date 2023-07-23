import { CreateUserUseCase } from './create-user';
import { UserRepositoryStub } from 'test/stub/repository';
import { User } from 'src/domain/entity/user';
import { createUserDtoStub } from 'test/stub/dto';
import { UserAlreadyExistException } from '../../errors/exceptions';

describe('test CreateUserUseCase', () => {
  let spy = {
    'userRepository.create': {} as jest.SpyInstance,
    'userRepository.findByEmail': {} as jest.SpyInstance,
    'encryptAdapter.encrypt': {} as jest.SpyInstance,
  };

  let usecase: CreateUserUseCase;

  beforeEach(() => {
    const repoStub = new UserRepositoryStub().getRepository();

    const encryptStub = {
      encrypt: jest.fn(),
    };

    spy = {
      'userRepository.create': jest.spyOn(repoStub, 'create'),
      'userRepository.findByEmail': jest.spyOn(repoStub, 'findByEmail'),
      'encryptAdapter.encrypt': jest.spyOn(encryptStub, 'encrypt'),
    };

    usecase = new CreateUserUseCase(repoStub, encryptStub);
  });

  it('should create an new user', async () => {
    // Arrange
    spy['encryptAdapter.encrypt'].mockResolvedValue('encryptPassword');

    // Act
    await usecase.execute(createUserDtoStub);
    const expectedUser = User.create({
      ...createUserDtoStub,
      password: 'encryptPassword',
    });

    // Assert
    expect(spy['userRepository.create']).toHaveBeenCalledWith(expectedUser);
    expect(spy['userRepository.findByEmail']).toHaveBeenCalledWith(
      expectedUser.email,
    );
    expect(spy['encryptAdapter.encrypt']).toHaveBeenCalledWith(
      createUserDtoStub.password,
    );
  });

  it('should throw UserAlreadyExistException', async () => {
    // Arrange
    spy['userRepository.findByEmail'].mockResolvedValue(true);

    // Assert
    expect(usecase.execute(createUserDtoStub)).rejects.toThrow(
      UserAlreadyExistException,
    );
  });
});
