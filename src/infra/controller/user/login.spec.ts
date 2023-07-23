import { UseCaseStub } from 'test/stub/usecase';
import { LoginController } from './login';

describe('test LoginController', () => {
  let spy = {
    'usecase.execute': {} as jest.SpyInstance,
  };

  let controllers: LoginController;

  beforeEach(() => {
    const usecaseStub = new UseCaseStub().getStub();

    spy = {
      'usecase.execute': jest.spyOn(usecaseStub, 'execute'),
    };

    controllers = new LoginController(usecaseStub);
  });

  it('should call usecase', async () => {
    // Act
    await controllers.handle({
      email: 'email',
      password: 'password',
    });

    // Assert
    expect(spy['usecase.execute']).toHaveBeenCalledWith({
      email: 'email',
      password: 'password',
    });
  });
});
