import { UserRepositoryStub } from 'test/stub/repository';
import { SaveSetupUseCase } from './save-setup';
import { SetupAlreadyExistException } from 'src/app/errors/exceptions';
import { Setup } from 'src/domain/entity/setup';
import { FilePathBuilder } from 'src/app/builder/file-path-builder';

describe('test SaveSetupUseCase', () => {
  let spy = {
    'userRepository.findSetupByUserId': {} as jest.SpyInstance,
    'fileService.save': {} as jest.SpyInstance,
    'filePathBuilder.append': {} as jest.SpyInstance,
    'filePathBuilder.build': {} as jest.SpyInstance,
    'randomUUID.get': {} as jest.SpyInstance,
    'userRepository.createSetup': {} as jest.SpyInstance,
    'fileService.getFileExtension': {} as jest.SpyInstance,
  };

  let usecase: SaveSetupUseCase;

  beforeEach(() => {
    const userRepositoryStub = new UserRepositoryStub().getRepository();

    const fileServiceStub = {
      save: jest.fn(),
      getFileExtension: jest.fn(),
      delete: jest.fn(),
    };

    const filePathBuilder = new FilePathBuilder();

    const randomUUID = {
      get: jest.fn(),
    };

    spy = {
      'userRepository.findSetupByUserId': jest.spyOn(
        userRepositoryStub,
        'findSetupByUserId',
      ),
      'fileService.save': jest.spyOn(fileServiceStub, 'save'),
      'filePathBuilder.append': jest.spyOn(filePathBuilder, 'append'),
      'filePathBuilder.build': jest.spyOn(filePathBuilder, 'build'),
      'fileService.getFileExtension': jest.spyOn(
        fileServiceStub,
        'getFileExtension',
      ),
      'randomUUID.get': jest.spyOn(randomUUID, 'get'),
      'userRepository.createSetup': jest.spyOn(
        userRepositoryStub,
        'createSetup',
      ),
    };
    process.env.BASE_PATH_TO_SAVE_FILES_UPLOADED = 'uploads';

    usecase = new SaveSetupUseCase(
      userRepositoryStub,
      fileServiceStub,
      filePathBuilder,
      randomUUID,
    );
  });

  it('should save new File', async () => {
    // Arrange
    spy['fileService.save'].mockResolvedValue('http://url');
    spy['randomUUID.get'].mockReturnValue('randomUUID');
    spy['fileService.getFileExtension'].mockReturnValue('txt');
    const bufferStub = Buffer.from('image');

    // Act
    await usecase.execute({
      description: 'descriptption',
      image: bufferStub,
      userId: 1,
      imageName: 'test.txt',
    });

    const expectedSetup = Setup.create({
      description: 'descriptption',
      photo: '/setups/randomUUID.txt',
      userId: 1,
    });

    // Assert
    expect(spy['randomUUID.get']).toHaveBeenCalled();
    expect(spy['filePathBuilder.append']).toHaveBeenNthCalledWith(
      1,
      '/setups/',
    );
    expect(spy['filePathBuilder.append']).toHaveBeenNthCalledWith(
      2,
      'randomUUID',
    );
    expect(spy['filePathBuilder.append']).toHaveBeenNthCalledWith(3, '.txt');
    expect(spy['userRepository.findSetupByUserId']).toHaveBeenCalledWith(1);
    expect(spy['userRepository.createSetup']).toHaveBeenCalledWith(
      expectedSetup,
    );
    expect(spy['fileService.save']).toHaveBeenCalledWith({
      file: bufferStub,
      path: 'uploads/setups/randomUUID.txt',
    });
  });

  it('it should throw SetupAlreadyExistException', async () => {
    // Arrange
    spy['userRepository.findSetupByUserId'].mockResolvedValue(true);

    // Assert
    expect(
      usecase.execute({
        description: 'descriptption',
        image: Buffer.from(''),
        userId: 1,
        imageName: 'test;txt',
      }),
    ).rejects.toThrow(SetupAlreadyExistException);
  });
});
