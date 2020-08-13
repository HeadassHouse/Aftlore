const { PubSub, ApolloError } = require('apollo-server');
const { database, queryBuilder, buildPaginationObject } = require('./utils');
const { MapModel } = require('../models');
const { MAP } = require('../constants/SUBSCRIPTION_EVENTS');

const pubsub = new PubSub();

module.exports = {
  Query: {
    map: async (_, { _id }) => database.GetDocument(MapModel, { _id }),
    maps: async (_, {
      where, first, last, before, after,
    }) => {
      const maps = await database.GetDocuments(MapModel, queryBuilder(where));

      return buildPaginationObject(maps, first, last, before, after);
    },
  },
  Mutation: {
    createMap: async (_, { map }) => {
      const createdMap = await database.CreateDocument(MapModel, map);

      if (createdMap) return createdMap;

      throw new ApolloError(
        'An error occurred while trying to create the map',
        'CREATE_MAP_ERROR',
      );
    },
    editMap: async (_, { _id, update }) => {
      const mapUpdated = await database.UpdateDocument(MapModel, { _id }, update);

      if (mapUpdated) {
        pubsub.publish(MAP.UPDATED, { mapUpdated });
        return mapUpdated;
      }

      throw new ApolloError(
        'An error occurred while trying to edit the map',
        'EDIT_MAP_ERROR',
      );
    },
    deleteMap: async (_, { _id, where }) => {
      if (_id && where) {
        throw new ApolloError(
          'Cannot specify id and where clause',
          'ID_AND_WHERE',
        );
      } else if (_id) {
        const deletedMap = await database.DeleteDocument(MapModel, { _id });

        if (deletedMap) return deletedMap;

        throw new ApolloError(
          `An error occurred while trying to delete map with supplied _id: ${_id}`,
          'DELETE_MAP_ERROR',
        );
      } else if (where) {
        const deletedMaps = await database.DeleteDocuments(MapModel, queryBuilder(where));

        if (deletedMaps) return deletedMaps;

        throw new ApolloError(
          `An error occurred while trying to delete maps with supplied where: ${JSON.stringify(where)}`,
          'DELETE_MAPS_ERROR',
        );
      } else {
        throw new ApolloError(
          'No id or where clause was provided',
          'NO_ID_OR_WHERE',
        );
      }
    },
  },
  Subscription: {
    mapUpdated: {
      subscribe: () => pubsub.asyncIterator([MAP.UPDATED]),
    },
  },
};
