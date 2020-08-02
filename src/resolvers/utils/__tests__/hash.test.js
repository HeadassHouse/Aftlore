const bcrypt = require('bcrypt');
const hash = require('../hash');

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('hashing functions', () => {
  beforeEach(() => {
    bcrypt.compare.mockReturnValue(true);
    bcrypt.hash.mockReturnValue('abcdef');
  });

  it('should return a hashed value', async () => {
    const hashedData = await hash.encrypt('hi');

    expect(hashedData).toEqual('abcdef');
  });

  it('should return a boolean value', async () => {
    const hashedData = await hash.compare('abcdef', 'hi');

    expect(hashedData).toBeTruthy();
  });
});
