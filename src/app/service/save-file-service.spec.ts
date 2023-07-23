import * as nodePromises from 'fs/promises';
import { SaveFileServiceNode } from './save-file-service';

describe('test SaveFileServiceNode', () => {
  let saveFileService: SaveFileServiceNode;

  let spy = {
    'nodePromises.writeFile': {} as jest.SpyInstance,
  };

  beforeEach(() => {
    saveFileService = new SaveFileServiceNode();

    spy = {
      'nodePromises.writeFile': jest.spyOn(nodePromises, 'writeFile'),
    };
  });

  afterEach(async () => {
    await nodePromises.rm(__dirname + '\\test.txt', { force: true });
  });

  it('should save file', async () => {
    // Act
    const result = await saveFileService.save({
      file: Buffer.from('test'),
      path: __dirname + '\\test.txt',
    });

    // Assert
    expect(result).toEqual({ success: true });
    expect(spy['nodePromises.writeFile']).toHaveBeenCalledWith(
      __dirname + '\\test.txt',
      Buffer.from('test'),
    );
  });

  it('should return { success: false } because an error occurred', async () => {
    // Arrange
    spy['nodePromises.writeFile'].mockImplementation(() => {
      throw new Error();
    });

    // Act
    const result = await saveFileService.save({
      file: Buffer.from('test'),
      path: __dirname + '\\test.txt',
    });

    // Assert

    expect(result).toEqual({ success: false });
  });
});
