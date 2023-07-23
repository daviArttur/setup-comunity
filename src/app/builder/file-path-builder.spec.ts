import { FilePathBuilder } from './file-path-builder';

describe('test BuildFileUrl', () => {
  let filePathBuilder: FilePathBuilder;

  beforeEach(() => {
    filePathBuilder = new FilePathBuilder();
  });

  it('should test', () => {
    // Act
    filePathBuilder.append('https://comunity/api/images');
    filePathBuilder.append('/users');
    filePathBuilder.append('/setups');
    const path = filePathBuilder.build();
    const path2 = filePathBuilder.build();
    filePathBuilder.append('/test3');
    const path3 = filePathBuilder.build();

    // Assert
    expect(path).toBe('https://comunity/api/images/users/setups');
    expect(path2).toBe('');
    expect(path3).toBe('/test3');
  });
});
