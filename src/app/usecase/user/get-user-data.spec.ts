import { createUserDtoStub } from 'test/stub/dto';
import { GetUserDataUseCase } from './get-user-data';
import { User } from 'src/domain/entity/user';
import { userRepositoryStub } from 'test/stub/repository';
import { UserNotFoundException } from 'src/app/errors/exceptions';

describe('test GetUserDataUseCase', () => {
  let usecase: GetUserDataUseCase;

  let spy = {
    'userRepository.findById': {} as jest.SpyInstance,
  };

  beforeEach(() => {
    spy = {
      'userRepository.findById': jest.spyOn(userRepositoryStub, 'findById'),
    };

    usecase = new GetUserDataUseCase(userRepositoryStub);
  });

  it('should return interface GetUserDataDto', async () => {
    // Arrange
    spy['userRepository.findById'].mockResolvedValue(
      new User(createUserDtoStub),
    );

    // Act
    const result = await usecase.execute(1);

    // Assert
    expect(result).toEqual({
      username: createUserDtoStub.username,
      email: createUserDtoStub.email,
      id: createUserDtoStub.id,
    });
  });

  it('should throw UserNotFoundException because user not exist', async () => {
    // Arrange
    spy['userRepository.findById'].mockResolvedValue(null);

    // Assert
    expect(usecase.execute(1)).rejects.toThrow(UserNotFoundException);
  });
});
