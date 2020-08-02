const { model: AccountModel } = require('../account');

describe('account models', () => {
  let account;
  beforeEach(() => {
    account = {
      userName: 'userName',
      name: 'name',
      email: 'email',
      password: 'password',
      friends: ['f1', 'f2'],
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should properly build an account schema', () => {
    const result = new AccountModel(account);
    Object.keys(account).forEach((key) => {
      expect(JSON.stringify(result[key])).toEqual(JSON.stringify(account[key]));
    });
  });
});
