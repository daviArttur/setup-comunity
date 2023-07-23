import { FileServiceNode } from './file-service';

describe('test FileServiceNode', () => {
  let fileServiceNode: FileServiceNode;

  let spy = {
    'saveFileService.save': {} as jest.SpyInstance,
  };

  beforeEach(() => {
    const saveFileService = {
      save: jest.fn(),
    };

    spy = {
      'saveFileService.save': jest.spyOn(saveFileService, 'save'),
    };

    fileServiceNode = new FileServiceNode(saveFileService);
  });

  it('should call SaveFileService and return result', async () => {
    // Arrange
    spy['saveFileService.save'].mockResolvedValue({ mock: true });

    // Act
    const result = await fileServiceNode.save({
      file: Buffer.from(''),
      path: 'mock',
    });

    // Assert
    expect(spy['saveFileService.save']).toHaveBeenCalledWith({
      file: Buffer.from(''),
      path: 'mock',
    });
    expect(result).toEqual({ mock: true });
  });

  it('should get file extension name', () => {
    const parseFile1 = fileServiceNode.getFileExtension('Whatt.45.png');
    const parseFile2 = fileServiceNode.getFileExtension('Whatt2423.png');
    const parseFile3 = fileServiceNode.getFileExtension('.What.t2423.svg');

    expect(parseFile1).toBe('png');
    expect(parseFile2).toBe('png');
    expect(parseFile3).toBe('svg');
  });
});
