import { UseCaseStub } from 'test/stub/usecase';
import { FindSetupsController } from './find-setups';

describe('test FindSetupsController', () => {
  let spy = {
    'usecase.execute': {} as jest.SpyInstance,
  };

  let controllers: FindSetupsController;

  beforeEach(() => {
    const usecaseStub = new UseCaseStub().getStub();

    spy = {
      'usecase.execute': jest.spyOn(usecaseStub, 'execute'),
    };

    controllers = new FindSetupsController(usecaseStub);
  });

  it('should call usecase', async () => {
    spy['usecase.execute'].mockResolvedValue({ mock: true });
    // Act
    const result = await controllers.handle();

    // Assert
    expect(result).toEqual({
      data: { mock: true },
    });
    expect(spy['usecase.execute']).toHaveBeenCalled();
  });
});
