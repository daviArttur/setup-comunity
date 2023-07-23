import { InvalidLoginException } from 'src/app/errors/exceptions';
import { UserRepository } from 'src/app/repository';
import { User } from 'src/domain/entity/user';
import { AuthService, HashService } from 'src/infra/contract';

export class AuthenticateUserUseCase {
  private _5minutes = 1000 * 60 * 5;
  private _7days = 1000 * 60 * 60 * 24 * 7;

  constructor(
    private userRepository: UserRepository,
    private hashService: HashService,
    private authService: AuthService,
  ) {}

  async execute(dto: Pick<User, 'email' | 'password'>): Result {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new InvalidLoginException();
    }

    const isValidPassword = await this.hashService.compare(
      dto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new InvalidLoginException();
    }

    const accessToken = await this.authService.generateAuthToken({
      userId: user.id,
      config: { expiresIn: this._5minutes },
    });

    const refreshToken = await this.authService.generateAuthToken({
      userId: user.id,
      config: { expiresIn: this._7days },
    });

    return { accessToken, refreshToken };
  }
}

type Result = Promise<{
  accessToken: string;
  refreshToken: string;
}>;
