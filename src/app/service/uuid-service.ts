import { randomUUID } from 'crypto';

export class UUIDService {
  get() {
    return randomUUID();
  }
}
