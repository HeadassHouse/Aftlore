const { database, queryBuilder, buildPaginationObject } = require('./utils');
const { CharacterModel } = require('../models');

module.exports = {
  Query: {
    characterSheet: (_, { _id }) => database.GetDocument(CharacterModel, { _id }),
    characterSheets: (_, {
      where, first, last, before, after,
    }) => {
      const characterSheets = database.GetDocuments(CharacterModel, queryBuilder(where));

      return buildPaginationObject(characterSheets, first, last, before, after);
    },
  },
  Mutation: {

  },
};
