import { UserRepositoryStub } from 'test/stub/repository';
import { FindSetupsUseCase } from './find-setups';
import { CacheAdapterStub, cacheConfigStub } from 'test/stub/adapters';

describe('test FindSetupsUseCase', () => {
  let spy = {
    'userRepository.findSetups': {} as jest.SpyInstance,
    'cacheAdapter.get': {} as jest.SpyInstance,
    'cacheAdapter.set': {} as jest.SpyInstance,
  };

  let usecase: FindSetupsUseCase;

  beforeEach(() => {
    const userRepositoryStub = new UserRepositoryStub().getRepository();
    const cacheAdapterStub = new CacheAdapterStub().getStub();

    spy = {
      'userRepository.findSetups': jest.spyOn(userRepositoryStub, 'findSetups'),
      'cacheAdapter.get': jest.spyOn(cacheAdapterStub, 'get'),
      'cacheAdapter.set': jest.spyOn(cacheAdapterStub, 'set'),
    };

    usecase = new FindSetupsUseCase(
      userRepositoryStub,
      cacheAdapterStub,
      cacheConfigStub,
    );
  });

  it('should get setups in repository, save in cache and return', async () => {
    // Arrange
    spy['userRepository.findSetups'].mockResolvedValue('setups');
    spy['cacheAdapter.get'].mockResolvedValue([]);

    // Act
    const result = await usecase.execute();

    // Assert
    expect(result).toEqual('setups');
    expect(spy['cacheAdapter.get']).toHaveBeenCalledWith(cacheConfigStub);
    expect(spy['cacheAdapter.set']).toHaveBeenCalledWith(
      cacheConfigStub,
      'setups',
    );
  });

  it('should return setups in cache', async () => {
    // Arrange
    spy['userRepository.findSetups'].mockResolvedValue('setups');
    spy['cacheAdapter.get'].mockResolvedValue([{ inCache: true }]);

    // Act
    const result = await usecase.execute();

    // Assert
    expect(result).toEqual([{ inCache: true }]);
    expect(spy['cacheAdapter.get']).toHaveBeenCalledWith(cacheConfigStub);
    expect(spy['cacheAdapter.set']).not.toHaveBeenCalled();
    expect(spy['userRepository.findSetups']).not.toHaveBeenCalled();
  });
});
