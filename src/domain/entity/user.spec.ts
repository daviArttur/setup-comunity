import { createUserDtoStub } from 'test/stub/dto';
import { User } from './user';

describe('test User', () => {
  it('it should be defined', () => {
    // Act
    const user = new User(createUserDtoStub);

    // Assert
    expect(user.password).toBe(createUserDtoStub.password);
    expect(user.username).toBe(createUserDtoStub.username);
    expect(user.email).toBe(createUserDtoStub.email);
    expect(user.id).toBe(createUserDtoStub.id);
  });

  it('should create an user with static factory', () => {
    // Act
    const user = User.create(createUserDtoStub);

    // Assert
    expect(user.password).toBe(createUserDtoStub.password);
    expect(user.username).toBe(createUserDtoStub.username);
    expect(user.email).toBe(createUserDtoStub.email);
    expect(user.id).toBe(-1);
  });
});
