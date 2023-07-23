import { UseCaseStub } from 'test/stub/usecase';
import { GetUserDataController } from './get-user-data';
import { authRequestStub } from 'test/stub/others';

describe('test GetUserDataController', () => {
  let spy = {
    'usecase.execute': {} as jest.SpyInstance,
  };

  let controllers: GetUserDataController;

  beforeEach(() => {
    const usecaseStub = new UseCaseStub().getStub();

    spy = {
      'usecase.execute': jest.spyOn(usecaseStub, 'execute'),
    };

    controllers = new GetUserDataController(usecaseStub);
  });

  it('should call usecase', async () => {
    // Arrange
    spy['usecase.execute'].mockResolvedValue({ mock: true });
    // Act
    const result = await controllers.handle(authRequestStub);

    // Assert
    expect(result).toEqual({ data: { mock: true } });
    expect(spy['usecase.execute']).toHaveBeenCalledWith(
      authRequestStub.user.userId,
    );
  });
});
