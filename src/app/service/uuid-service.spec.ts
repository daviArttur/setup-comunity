import { UUIDService } from './uuid-service';

describe('test UUIDService', () => {
  const uuidService = new UUIDService();

  it('should return UUIDs and should be differents', () => {
    // Act
    const uuid1 = uuidService.get();
    const uuid2 = uuidService.get();

    // Assert
    expect(typeof uuid1).toBe('string');
    expect(typeof uuid2).toBe('string');
    expect(uuid1 !== uuid2).toBeTruthy();
  });
});
