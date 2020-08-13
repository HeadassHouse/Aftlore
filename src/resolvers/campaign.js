const { ApolloError, PubSub } = require('apollo-server');
const {
  database,
  buildPaginationObject,
  queryBuilder,
} = require('./utils');
const { CampaignModel } = require('../models');
const { Query: { maps: mapsResolver } } = require('./map');
const { Query: { characterSheets: characterSheetsResolver } } = require('./characterSheet');
// const { Query: { ruleSet: ruleSetResolver } } = require('./ruleset');

const pubsub = new PubSub();

const buildCampaignObject = ({
  characters, ruleSet, maps, ...campaign
}) => ({
  ...campaign,
  characters: ({
    first, last, before, after,
  }) => {
    const where = {
      and: [{
        or: characters.map((id) => ({
          property: '_id',
          operation: 'EQUALS',
          value: id,
        })),
      }],
    };

    return characterSheetsResolver(null, {
      where, first, last, before, after,
    });
  },
  ruleSet: () => null,
  maps: async ({
    first, last, before, after,
  }) => {
    const where = {
      and: [{
        or: maps.map((id) => ({
          property: '_id',
          operation: 'EQUALS',
          value: id,
        })),
      }],
    };

    return mapsResolver(null, {
      where, first, last, before, after,
    });
  },
});

module.exports = {
  Query: {
    campaign: async (_, { _id }) => {
      const { _doc } = { ...await database.GetDocument(CampaignModel, { _id }) };

      return buildCampaignObject(_doc);
    },
    campaigns: async (_, {
      where, first, last, after, before,
    }) => {
      let campaigns = await database.GetDocuments(CampaignModel, queryBuilder(where));

      campaigns = campaigns.map((campaign) => {
        const { _doc } = { ...campaign };

        return buildCampaignObject(_doc);
      });

      return buildPaginationObject(campaigns, first, last, after, before);
    },
  },
  Mutation: {
    createCampaign: (_, { campaign }) => {
      const createdCampaign = database.CreateDocument(CampaignModel, campaign);

      if (createdCampaign) return createdCampaign;

      throw new ApolloError('ah', 'AH');
    },
    editCampaign: async (_, { _id, update }) => {
      const campaignUpdated = database.UpdateDocument(CampaignModel, { _id }, update);

      if (campaignUpdated) {
        pubsub.publish('CAMPAIGN_UPDATED', { campaignUpdated });
        return campaignUpdated;
      }

      throw new ApolloError('Error updating the campaign!', 'CAMPAIGN_UPDATE_ERROR');
    },
    deleteCampaign: async (_, { _id, where }) => {
      if (_id && where) {
        throw new ApolloError('Cannot specify id and where clause!');
      } else if (_id) {
        return database.DeleteDocument(CampaignModel, { _id })
          .then(() => ({
            code: 200,
            message: 'Successfully deleted campaign',
          }))
          .catch((error) => ({
            code: 400,
            message: error,
          }));
      } else if (where) {
        return database.DeleteDocuments(CampaignModel, queryBuilder(where))
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
