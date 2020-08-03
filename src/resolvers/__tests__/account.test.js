const { ApolloError } = require('apollo-server');
const { Query, Mutation } = require('../account');
const { compare, encrypt } = require('../utils/hash');
const { CreateDocument, GetDocument, UpdateDocument } = require('../utils/database');

jest.mock('apollo-server', () => ({
  ApolloError: jest.fn(),
}));

jest.mock('../utils/hash', () => ({
  compare: jest.fn(),
  encrypt: jest.fn(),
}));

jest.mock('../utils/database', () => ({
  CreateDocument: jest.fn(),
  GetDocument: jest.fn(),
  UpdateDocument: jest.fn(),
}));

describe('account resolver', () => {
  let account;

  beforeEach(() => {
    account = {
      _id: '123',
      userName: 'userName',
      password: 'password',
      email: 'g@gmail.com',
      friends: [
        'f1',
        'f2',
      ],
    };
    CreateDocument.mockReturnValue(account);
    GetDocument.mockReturnValue(account);
    UpdateDocument.mockReturnValue(account);

    compare.mockImplementation((el1, el2) => {
      if (el1 === el2) return true;
      return false;
    });

    encrypt.mockImplementation((data) => data);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('query', () => {
    describe('login', () => {
      it('should return an account after successful login', async () => {
        const loginInfo = {
          userName: 'userName',
          password: 'password',
        };

        const response = await Query.login(null, loginInfo);

        expect(response).toEqual(account);
      });

      it("should throw an error if the account doesn't exist", async () => {
        GetDocument.mockReturnValue(null);

        const loginInfo = {
          userName: 'DNE',
          password: 'password',
        };

        try {
          await Query.login(null, loginInfo);
        } catch (_) {
          expect(ApolloError).toHaveBeenCalledWith(
            'The username: DNE does not exist',
            'USERNAME_NOT_FOUND',
          );
        }
      });

      it('should throw an error if the password is incorrect', async () => {
        const loginInfo = {
          userName: 'DNE',
          password: 'notRight',
        };

        try {
          await Query.login(null, loginInfo);
        } catch (_) {
          expect(ApolloError).toHaveBeenCalledWith(
            'Incorrect password provided',
            'INCORRECT_PASSWORD',
          );
        }
      });
    });
  });

  describe('mutation', () => {
    describe('create account', () => {
      it('should return the account when created properly', async () => {
        const response = await Mutation.createAccount(null, { account });

        expect(response).toEqual(account);
      });

      it('should throw an error when it could not create the account', async () => {
        CreateDocument.mockReturnValue(null);
        try {
          await Mutation.createAccount(null, { account });
        } catch (_) {
          expect(ApolloError).toHaveBeenCalledWith(
            'Could not create the account',
            'ACCOUNT_CREATION_FAILED',
          );
        }
      });
    });

    describe('edit account', () => {
      it('should return the account when edited properly', async () => {
        const info = {
          _id: '123',
          update: {
            property: 'prop',
            value: 'val',
          },
        };

        const response = await Mutation.editAccount(null, info);

        expect(response).toEqual(account);
      });

      it('should throw an error when trying to edit password', async () => {
        const info = {
          _id: '123',
          update: {
            property: 'password',
            value: 'val',
          },
        };

        try {
          await Mutation.editAccount(null, info);
        } catch (_) {
          expect(ApolloError).toHaveBeenCalledWith(
            "Cannot use 'editAccount' to change password, instead use 'changePassword'",
            'CANNOT_EDIT_PASSWORD',
          );
        }
      });

      it("should throw an error when account doesn't return from db call", async () => {
        UpdateDocument.mockReturnValue(null);

        const info = {
          _id: '123',
          update: {
            property: 'prop',
            value: 'val',
          },
        };

        try {
          await Mutation.editAccount(null, info);
        } catch (_) {
          expect(ApolloError).toHaveBeenCalledWith(
            'An error occured while trying to edit the account',
            'EDIT_ACCOUNT_ERROR',
          );
        }
      });
    });

    describe('change password', () => {
      it('should return the account when password updated properly', async () => {
        const info = {
          _id: '123',
          oldPassword: 'password',
          newPassword: 'newPass',
        };

        const response = await Mutation.changePassword(null, info);

        expect(response).toEqual(account);
      });

      it('should throw an error when the account cannot be updated', async () => {
        UpdateDocument.mockReturnValue(null);

        const info = {
          _id: '123',
          oldPassword: 'password',
          newPassword: 'newPass',
        };
        try {
          await Mutation.changePassword(null, info);
        } catch (_) {
          expect(ApolloError).toHaveBeenCalledWith(
            'An error occured while trying to change the password',
            'CHANGE_PASSWORD_ERROR',
          );
        }
      });

      it('should throw an error when the password is incorrect', async () => {
        const info = {
          _id: '123',
          oldPassword: 'notPassword',
          newPassword: 'newPass',
        };
        try {
          await Mutation.changePassword(null, info);
        } catch (_) {
          expect(ApolloError).toHaveBeenCalledWith(
            'The password provided is incorrect or account not found',
            'ACCOUNT_INFO_ERROR',
          );
        }
      });

      it('should throw an error when the account is not found', async () => {
        GetDocument.mockReturnValue(null);

        const info = {
          _id: '123',
          oldPassword: 'password',
          newPassword: 'newPass',
        };
        try {
          await Mutation.changePassword(null, info);
        } catch (_) {
          expect(ApolloError).toHaveBeenCalledWith(
            'The password provided is incorrect or account not found',
            'ACCOUNT_INFO_ERROR',
          );
        }
      });
    });
  });
});
