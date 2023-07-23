import { UseCaseStub } from 'test/stub/usecase';
import { SaveSetupController } from './save-setup';

describe('test SaveSetupController', () => {
  let spy = {
    'usecase.execute': {} as jest.SpyInstance,
  };

  let controllers: SaveSetupController;

  beforeEach(() => {
    const usecaseStub = new UseCaseStub().getStub();

    spy = {
      'usecase.execute': jest.spyOn(usecaseStub, 'execute'),
    };

    controllers = new SaveSetupController(usecaseStub);
  });

  it('should call usecase', async () => {
    // Act
    await controllers.handle({
      description: 'email',
    });

    // Assert
    expect(spy['usecase.execute']).toHaveBeenCalledWith({
      description: 'email',
    });
  });
});
