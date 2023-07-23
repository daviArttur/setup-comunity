import { BcryptAdapter } from './bcrypt-adapter';

describe('test Bcrypty adapter', () => {
  let bcryptyAdapter: BcryptAdapter;
  const myTestPassword = 'testPassword';
  beforeEach(() => {
    bcryptyAdapter = new BcryptAdapter();
  });
  it('should return a hashed password', async () => {
    const password = await bcryptyAdapter.encrypt(myTestPassword);

    expect(password).toBeTruthy();
    expect(password).toBeTruthy();
    expect(typeof password).toBe('string');
  });

  it('should create a hashed password and compare result to be true', async () => {
    const password = await bcryptyAdapter.encrypt(myTestPassword);
    const result = await bcryptyAdapter.compare(myTestPassword, password);
    expect(result).toBeTruthy();
  });

  it("should create a hashed password, and compare result to be false because password don't macht", async () => {
    const password = await bcryptyAdapter.encrypt(myTestPassword);
    const result = await bcryptyAdapter.compare('wrongpassword', password);

    expect(result).toBeFalsy();
  });
});
