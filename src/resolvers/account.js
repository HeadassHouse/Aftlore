const { ApolloError } = require('apollo-server');
const hash = require('./utils/hash');
const { model: AccountModel } = require('../models/account');
const { CreateDocument, GetDocument, UpdateDocument } = require('./utils/database');

module.exports = {
  Query: {
    login: async (_, { userName, password }) => {
      const account = await GetDocument(AccountModel, { userName });

      if (!account) {
        throw new ApolloError(
          `The username: ${userName} does not exist`,
          'USERNAME_NOT_FOUND',
        );
      }

      if (await hash.compare(password, account.password)) return account;

      throw new ApolloError(
        'Incorrect password provided',
        'INCORRECT_PASSWORD',
      );
    },
  },
  Mutation: {
    createAccount: async (_, { account }) => {
      const createdAccount = await CreateDocument(AccountModel, {
        ...account,
        password: await hash.encrypt(account.password),
      });

      if (createdAccount) return createdAccount;

      throw new ApolloError(
        'Could not create the account',
        'ACCOUNT_CREATION_FAILED',
      );
    },
    editAccount: async (_, { _id, update: { property, value } }) => {
      if (property === 'password') {
        throw new ApolloError(
          "Cannot use 'editAccount' to change password, instead use 'changePassword'",
          'CANNOT_EDIT_PASSWORD',
        );
      }

      const account = await UpdateDocument(AccountModel, _id, { [property]: value });

      if (account) return account;

      throw new ApolloError(
        'An error occured while trying to edit the account',
        'EDIT_ACCOUNT_ERROR',
      );
    },
    changePassword: async (_, { _id, oldPassword, newPassword }) => {
      const account = await GetDocument(AccountModel, { _id });

      if (account && await hash.compare(oldPassword, account.password)) {
        const updatedAccount = await UpdateDocument(AccountModel, { _id }, {
          password: await hash.encrypt(newPassword),
        });

        if (updatedAccount) return updatedAccount;

        throw new ApolloError(
          'An error occured while trying to change the password',
          'CHANGE_PASSWORD_ERROR',
        );
      }

      throw new ApolloError(
        'The password provided is incorrect or account not found',
        'ACCOUNT_INFO_ERROR',
      );
    },
  },
};
