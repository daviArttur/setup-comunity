import { JwtAuthStrategy } from './jwt-auth';
import { TokenPayload } from 'src/app/types';

test('JwtAuthStrategy', async () => {
  // Arrange
  process.env.JWT_SECRET = '123';
  const strategy = new JwtAuthStrategy();

  // Act
  const result = await strategy.validate({
    exp: 123,
    iat: 123,
    userId: 1,
  } as TokenPayload);

  // Assert
  expect(result).toEqual({ exp: 123, iat: 123, userId: 1 });
});
