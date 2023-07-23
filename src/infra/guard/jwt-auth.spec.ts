import { JwtAuthGuard } from './jwt-auth';

test('JwtAuthGuard', () => {
  // Act
  const guard = new JwtAuthGuard();

  // Assert
  expect(guard).toBeDefined();
});
