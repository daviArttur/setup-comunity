import { CreateTokenDto } from 'src/app/dto';

export type ControllerMethod<T> = Promise<{ data: T }>;
export type ControllerVoidMethod = Promise<void>;

export interface HashService {
  compare: (plainText: string, hashedText: string) => Promise<boolean>;
}

export interface AuthService {
  generateAuthToken: (payload: CreateTokenDto) => Promise<string>;
}
