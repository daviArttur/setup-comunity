import { Setup } from 'src/domain/entity/setup';
import { User } from 'src/domain/entity/user';
import { Email, ID } from 'src/domain/types';

export interface UserRepository {
  create: (user: User) => Promise<void>;
  findByEmail: (email: Email) => Promise<User | null>;
  findById: (userId: ID) => Promise<User | null>;
  findSetupByUserId: (userId: ID) => Promise<Setup | null>;
  createSetup: (setup: Setup) => Promise<void>;
  findSetups: () => Promise<Setup[]>;
}

export interface EncryptAdapter {
  encrypt: (plainText: string) => Promise<string>;
}
