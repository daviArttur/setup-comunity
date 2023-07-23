import { JwtService } from '@nestjs/jwt';
import { JwtAdapter } from './jwt-adapter';
import { TokenPayload } from 'src/app/types';

describe('test JwtAdapter()', () => {
  let spy = {
    'jwtService.signAsync': {} as jest.SpyInstance,
  };

  let adapter: JwtAdapter;

  beforeEach(() => {
    const jwtService = new JwtService({
      privateKey: '123',
    });

    spy = {
      'jwtService.signAsync': jest.spyOn(jwtService, 'signAsync'),
    };

    adapter = new JwtAdapter(jwtService);
  });

  it('should generate a token', async () => {
    // Act
    const token = await adapter.generateAuthToken({
      config: { expiresIn: 1000 },
      userId: 1,
    });

    // Assert
    expect(typeof token).toBe('string');
    const decodedToken = new JwtService().decode(token) as TokenPayload;
    expect(decodedToken.userId).toBe(1);
    expect(decodedToken.iat).toBe(decodedToken.exp - 1000);
    expect(spy['jwtService.signAsync']).toHaveBeenCalledWith(
      { userId: 1 },
      {
        expiresIn: 1000,
      },
    );
  });

  it('should throw error', async () => {
    // Arrange
    spy['jwtService.signAsync'].mockImplementation(() => {
      throw new Error();
    });

    // Assert
    expect(
      adapter.generateAuthToken({
        config: { expiresIn: 1000 },
        userId: 1,
      }),
    ).rejects.toThrow(Error);
  });
});
