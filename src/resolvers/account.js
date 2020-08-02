const hash = require('./utils/hash');
const { model: AccountModel } = require('../models/account');
const { CreateDocument, GetDocument, UpdateDocument } = require('./utils/database');

module.exports = {
  Query: {
    login: async (_, { userName, password }) => {
      const result = await GetDocument(AccountModel, { userName });

      if (!result) throw new Error('USERNAME_NOT_FOUND');

      if (await hash.compare(password, result.password)) return result;

      throw new Error('INCORRECT_PASSWORD');
    },
  },
  Mutation: {
    createAccount: async (_, { account }) => {
      const hashedPassword = await hash.encrypt(String(account.password));
      const createdAccount = await CreateDocument(AccountModel, ...(account, { hashedPassword }));

      if (createdAccount) return createdAccount;

      throw new Error('ACCOUNT_CREATION_FAILED');
    },
    editAccount: async (_, { _id, update: { property, value } }) => {
      if (property === 'password') throw new Error('CANNOT_EDIT_PASSWORD');

      const account = await UpdateDocument(AccountModel, _id, { [property]: value });

      if (account) return account;

      throw new Error('EDIT_ACCOUNT_ERROR');
    },
    changePassword: async (_, { _id, oldPassword, newPassword }) => {
      const account = await GetDocument(AccountModel, { _id });

      if (account && await hash.compare(oldPassword, account.password)) {
        const password = await hash.encrypt(String(newPassword));
        const updatedAccount = await UpdateDocument(AccountModel, { _id }, { password });

        if (updatedAccount) return updatedAccount;

        throw new Error('CHANGE_PASSWORD_ERROR');
      }

      throw new Error('INCORRECT_PASSWORD');
    },
  },
};
