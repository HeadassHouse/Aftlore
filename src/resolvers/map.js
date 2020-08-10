const { PubSub, ApolloError } = require('apollo-server');
const db = require('./utils/database');
const { model: MapModel } = require('../models/map');
const { Where } = require('./utils/queryBuilder');
const buildPaginationObject = require('./utils/buildPaginationObject');

const pubsub = new PubSub();
const MAP_UPDATED = 'MAP_UPDATED';

module.exports = {
  Query: {
    map: async (_, { _id }) => db.GetDocument(MapModel, { _id }),
    maps: async (_, {
      where, first, last, before, after,
    }) => {
      const start = new Date().getMilliseconds();

      const maps = await db.GetDocuments(MapModel, Where(where));

      const pageObject = buildPaginationObject(maps, first, last, before, after);

      console.log((new Date().getMilliseconds()) - start);

      return pageObject;
    },
  },
  Mutation: {
    createMap: async (_, { map }) => {
      const createdMap = await db.CreateDocument(MapModel, map);

      if (createdMap) return createdMap;

      throw new ApolloError(
        'An error occurred while trying to create the map',
        'CREATE_MAP_ERROR',
      );
    },
    editMap: async (_, { _id, update }) => {
      const mapUpdated = await db.UpdateDocument(MapModel, { _id }, update);

      if (mapUpdated) {
        pubsub.publish(MAP_UPDATED, { mapUpdated });
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
        const deletedMap = await db.DeleteDocument(MapModel, { _id });

        if (deletedMap) return deletedMap;

        throw new ApolloError(
          `An error occurred while trying to delete map with supplied _id: ${_id}`,
          'DELETE_MAP_ERROR',
        );
      } else if (where) {
        const deletedMaps = await db.DeleteDocuments(MapModel, Where(where));

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
      subscribe: () => pubsub.asyncIterator([MAP_UPDATED]),
    },
  },
};
