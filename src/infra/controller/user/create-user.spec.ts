import { UseCaseStub } from 'test/stub/usecase';
import { CreateUserController } from './create-user';

describe('test CreateUserController', () => {
  let spy = {
    'usecase.execute': {} as jest.SpyInstance,
  };

  let controllers: CreateUserController;

  beforeEach(() => {
    const usecaseStub = new UseCaseStub().getStub();

    spy = {
      'usecase.execute': jest.spyOn(usecaseStub, 'execute'),
    };

    controllers = new CreateUserController(usecaseStub);
  });

  it('should call usecase', async () => {
    // Act
    await controllers.handle({
      email: 'email',
      password: 'password',
      username: 'username',
    });

    // Assert
    expect(spy['usecase.execute']).toHaveBeenCalledWith({
      email: 'email',
      password: 'password',
      username: 'username',
    });
  });
});
