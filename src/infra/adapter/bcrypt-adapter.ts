import * as bcrypt from 'bcrypt';
import { HashService } from '../contract';

export class BcryptAdapter implements HashService {
  async encrypt(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async compare(
    simplePassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(simplePassword, hashedPassword);
  }
}
