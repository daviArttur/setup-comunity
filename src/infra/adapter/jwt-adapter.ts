import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { Token } from 'src/app/types';
import { AuthService } from '../contract';
import { CreateTokenDto } from 'src/app/dto';

@Injectable()
export class JwtAdapter implements AuthService {
  constructor(private jwtService: JwtService) {}

  // verify(token: Token): boolean {
  //   try {
  //     return this.jwtService.verify(token) ? true : false;
  //   } catch (err) {
  //     return false;
  //   }
  // }

  async generateAuthToken(dto: CreateTokenDto): Promise<Token> {
    try {
      const token = await this.jwtService.signAsync(
        { userId: dto.userId },
        {
          expiresIn: dto.config.expiresIn,
        },
      );
      return token;
    } catch (err) {
      throw new Error();
    }
  }
}
