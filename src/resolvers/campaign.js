const { ApolloError, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
const db = require('./utils/database');
const { schema: Campaign } = require('../models/campaign');
const { Where } = require('./utils/linqConstructor');

const pubsub = new PubSub();
const CAMPAIGN_UPDATED = 'CAMPAIGN_UPDATED';

module.exports = {
  Query: {
    getCampaign: (_, { _id, where }) => {
      if (_id && where) {
        throw new ApolloError('Cannot specify id and where clause!');
      } else if (_id) {
        return db.GetDocument(mongoose.model('Campaign', Campaign), { _id })
          .then(async (result) => [result])
          .catch(() => []);
      } else if (where) {
        return db.GetDocuments(mongoose.model('Campaign', Campaign), Where(where))
          .then(async (result) => result)
          .catch(() => []);
      } else {
        throw new ApolloError('Must provide an id or a where clause!');
      }
    },
  },
  Mutation: {
    createCampaign: (_, { campaign }) => db.CreateDocument(mongoose.model('Campaign', Campaign), campaign)
      .then(() => ({
        code: 200,
        message: 'Successfully inserted campaign',
      }))
      .catch((error) => ({
        code: 400,
        message: error,
      })),
    editCampaign: async (_, { _id, update }) => db.UpdateDocument(mongoose.model('Campaign', Campaign), { _id }, update)
      .then((result) => {
        pubsub.publish(CAMPAIGN_UPDATED, { campaignUpdated: result });
        return result;
      })
      .catch(() => new ApolloError('Error updating the campaign!')),
    deleteCampaign: async (_, { _id, where }) => {
      if (_id && where) {
        throw new ApolloError('Cannot specify id and where clause!');
      } else if (_id) {
        return db.DeleteDocument(mongoose.model('Campaign', Campaign), { _id })
          .then(() => ({
            code: 200,
            message: 'Successfully deleted campaign',
          }))
          .catch((error) => ({
            code: 400,
            message: error,
          }));
      } else if (where) {
        return db.DeleteDocuments(mongoose.model('Campaign', Campaign), Where(where))
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
  // Subscription: {
  //     campaignUpdated: {
  //         subscribe: () => pubsub.asyncIterator([CAMPAIGN_UPDATED])
  //     }
  // }
};
