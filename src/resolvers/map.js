const { ApolloError, PubSub } = require('apollo-server');
const db = require('./utils/database');
const { model: MapModel } = require('../models/map');
const { Where } = require('./utils/linqConstructor');

const pubsub = new PubSub();
const MAP_UPDATED = 'MAP_UPDATED';

module.exports = {
  Query: {
    getMap: (_, { _id, where }) => {
      if (_id && where) {
        throw new Error('ID_AND_WHERE');
      } else if (_id) {
        const maps = db.GetDocument(MapModel, { _id })
          .then(async (result) => [result])
          .catch((error) => []);
      } else if (where) {
        return db.GetDocuments(MapModel, Where(where))
          .then(async (result) => result)
          .catch((error) => []);
      } else {
        throw new ApolloError('Must provide an id or a where clause!');
      }
    },
  },
  Mutation: {
    createMap: (_, { map }) => db.CreateDocument(MapModel, map)
      .then(() => ({
        code: 200,
        message: 'Successfully inserted Map',
      }))
      .catch((error) => ({
        code: 400,
        message: error,
      })),
    editMap: async (_, { _id, update }) => db.UpdateDocument(MapModel, { _id }, update)
      .then((result) => {
        pubsub.publish(MAP_UPDATED, { mapUpdated: result });
        return result;
      })
      .catch((error) => new ApolloError('Error updating the map!')),
    deleteMap: async (_, { _id, where }) => {
      if (_id && where) {
        throw new ApolloError('Cannot specify id and where clause!');
      } else if (_id) {
        return db.DeleteDocument(MapModel, { _id })
          .then(() => ({
            code: 200,
            message: 'Successfully deleted Map',
          }))
          .catch((error) => ({
            code: 400,
            message: error,
          }));
      } else if (where) {
        return db.DeleteDocuments(MapModel, Where(where))
          .then(async (result) => ({
            code: 200,
            message: JSON.stringify(result),
          }))
          .catch((error) => ({
            code: 400,
            message: error,
          }));
      } else {
        throw new ApolloError('Must provide an id or a where clause!');
      }
    },
  },
  Subscription: {
    mapUpdated: {
      subscribe: () => pubsub.asyncIterator([MAP_UPDATED]),
    },
  },
};
