import { HttpException } from '@nestjs/common';

export class UserAlreadyExistException extends Error {
  constructor() {
    super();
  }
}

export class SetupAlreadyExistException extends Error {
  constructor() {
    super();
  }
}

export class WriteFileException extends Error {
  constructor() {
    super();
  }
}

export class InvalidLoginException extends HttpException {
  constructor() {
    super('', 400);
  }
}

export class UserNotFoundException extends HttpException {
  constructor() {
    super('', 400);
  }
}
