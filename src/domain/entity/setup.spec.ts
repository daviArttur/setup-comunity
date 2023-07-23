import { createSetupDtoStub } from 'test/stub/dto';
import { Setup } from './setup';

describe('test Setup', () => {
  it('should be defined', () => {
    // Act
    const setup = new Setup(createSetupDtoStub);

    // Assert
    expect(setup.id).toBe(setup.id);
    expect(setup.photo).toBe(setup.photo);
    expect(setup.userId).toBe(setup.userId);
    expect(setup.description).toBe(setup.description);
  });

  it('should create setup with static factory', () => {
    // Act
    const setup = Setup.create(createSetupDtoStub);

    // Assert
    expect(setup.id).toBe(-1);
    expect(setup.photo).toBe(setup.photo);
    expect(setup.userId).toBe(setup.userId);
    expect(setup.description).toBe(setup.description);
  });
});
