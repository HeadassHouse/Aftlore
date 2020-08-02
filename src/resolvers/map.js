const { ApolloError, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
const db = require('./utils/database');
const { schema: Map } = require('../models/map');
const { Where } = require('./utils/linqConstructor');

const pubsub = new PubSub();
const MAP_UPDATED = 'MAP_UPDATED';

module.exports = {
  Query: {
    getMap: (_, { _id, where }) => {
      if (_id && where) {
        throw new ApolloError('Cannot specify id and where clause!');
      } else if (_id) {
        return db.GetDocument(mongoose.model('Map', Map), { _id })
          .then(async (result) => [result])
          .catch((error) => []);
      } else if (where) {
        return db.GetDocuments(mongoose.model('Map', Map), Where(where))
          .then(async (result) => result)
          .catch((error) => []);
      } else {
        throw new ApolloError('Must provide an id or a where clause!');
      }
    },
  },
  Mutation: {
    createMap: (_, { map }) => db.CreateDocument(mongoose.model('Map', Map), map)
      .then(() => ({
        code: 200,
        message: 'Successfully inserted Map',
      }))
      .catch((error) => ({
        code: 400,
        message: error,
      })),
    editMap: async (_, { _id, update }) => db.UpdateDocument(mongoose.model('Map', Map), { _id }, update)
      .then((result) => {
        pubsub.publish(MAP_UPDATED, { mapUpdated: result });
        return result;
      })
      .catch((error) => new ApolloError('Error updating the map!')),
    deleteMap: async (_, { _id, where }) => {
      if (_id && where) {
        throw new ApolloError('Cannot specify id and where clause!');
      } else if (_id) {
        return db.DeleteDocument(mongoose.model('Map', Map), { _id })
          .then(() => ({
            code: 200,
            message: 'Successfully deleted Map',
          }))
          .catch((error) => ({
            code: 400,
            message: error,
          }));
      } else if (where) {
        return db.DeleteDocuments(mongoose.model('Map', Map), Where(where))
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

const f = {
  fieldName: 'login',
  fieldNodes: [{
    kind: 'Field',
    name: { kind: 'Name', value: 'login', loc: { start: 4, end: 9 } },
    arguments: [{
      kind: 'Argument',
      name: { kind: 'Name', value: 'userName', loc: { start: 10, end: 18 } },
      value: {
        kind: 'StringValue', value: 'rmarks6767', block: false, loc: { start: 20, end: 32 },
      },
      loc: { start: 10, end: 32 },
    }, {
      kind: 'Argument',
      name: { kind: 'Name', value: 'password', loc: { start: 34, end: 42 } },
      value: {
        kind: 'StringValue', value: 'password', block: false, loc: { start: 44, end: 54 },
      },
      loc: { start: 34, end: 54 },
    }],
    directives: [],
    selectionSet: {
      kind: 'SelectionSet',
      selections: [{
        kind: 'Field', name: { kind: 'Name', value: 'userName', loc: { start: 62, end: 70 } }, arguments: [], directives: [], loc: { start: 62, end: 70 },
      }, {
        kind: 'Field', name: { kind: 'Name', value: 'email', loc: { start: 75, end: 80 } }, arguments: [], directives: [], loc: { start: 75, end: 80 },
      }, {
        kind: 'Field', name: { kind: 'Name', value: '_id', loc: { start: 85, end: 88 } }, arguments: [], directives: [], loc: { start: 85, end: 88 },
      }],
      loc: { start: 56, end: 92 },
    },
    loc: { start: 4, end: 92 },
  }],
  returnType: 'Account',
  parentType: 'Query',
  path: { key: 'login' },
  schema: {
    __validationErrors: [],
    __allowedLegacyNames: [],
    _queryType: 'Query',
    _mutationType: 'Mutation',
    _subscriptionType: 'Subscription',
    _directives: ['@cacheControl', '@skip', '@include', '@deprecated'],
    _typeMap: {
      Query: 'Query', String: 'String', And: 'And', Or: 'Or', RequestFilter: 'RequestFilter', Operation: 'Operation', Map: 'Map', ID: 'ID', Tile: 'Tile', Terrain: 'Terrain', Entity: 'Entity', EntityType: 'EntityType', Account: 'Account', Campaign: 'Campaign', Character: 'Character', Stat: 'Stat', Int: 'Int', AssocSkill: 'AssocSkill', Characteristic: 'Characteristic', Item: 'Item', Boolean: 'Boolean', Ability: 'Ability', Ruleset: 'Ruleset', CharacterDefinition: 'CharacterDefinition', StatDefinition: 'StatDefinition', CharacteristicDefinition: 'CharacteristicDefinition', CharacteristicValue: 'CharacteristicValue', CharacteristicMod: 'CharacteristicMod', ItemDefinition: 'ItemDefinition', ItemUseInfo: 'ItemUseInfo', Effect: 'Effect', AbilityDefinition: 'AbilityDefinition', UseRestriction: 'UseRestriction', AbilityOnUse: 'AbilityOnUse', Mutation: 'Mutation', MapInput: 'MapInput', TileInput: 'TileInput', EntityInput: 'EntityInput', StatusCode: 'StatusCode', MapUpdate: 'MapUpdate', AccountInput: 'AccountInput', UpdateAny: 'UpdateAny', CampaignInput: 'CampaignInput', RulesetInput: 'RulesetInput', CharacterDefinitionInput: 'CharacterDefinitionInput', StatDefinitionInput: 'StatDefinitionInput', CharacteristicDefinitionInput: 'CharacteristicDefinitionInput', CharacteristicValueInput: 'CharacteristicValueInput', CharacteristicModInput: 'CharacteristicModInput', ItemDefinitionInput: 'ItemDefinitionInput', ItemUseInfoInput: 'ItemUseInfoInput', EffectInput: 'EffectInput', AbilityDefinitionInput: 'AbilityDefinitionInput', UseRestrictionInput: 'UseRestrictionInput', AbilityOnUseInput: 'AbilityOnUseInput', CampaignEdit: 'CampaignEdit', CharacterInput: 'CharacterInput', StatInput: 'StatInput', AssocSkillInput: 'AssocSkillInput', CharacteristicInput: 'CharacteristicInput', ItemInput: 'ItemInput', AbilityInput: 'AbilityInput', CharacterEdit: 'CharacterEdit', RulesetEdit: 'RulesetEdit', Subscription: 'Subscription', __Schema: '__Schema', __Type: '__Type', __TypeKind: '__TypeKind', __Field: '__Field', __InputValue: '__InputValue', __EnumValue: '__EnumValue', __Directive: '__Directive', __DirectiveLocation: '__DirectiveLocation', CacheControlScope: 'CacheControlScope', Upload: 'Upload',
    },
    _possibleTypeMap: {},
    _implementations: {},
    _extensionsEnabled: true,
  },
  fragments: {},
  operation: {
    kind: 'OperationDefinition',
    operation: 'query',
    variableDefinitions: [],
    directives: [],
    selectionSet: {
      kind: 'SelectionSet',
      selections: [{
        kind: 'Field',
        name: { kind: 'Name', value: 'login', loc: { start: 4, end: 9 } },
        arguments: [{
          kind: 'Argument',
          name: { kind: 'Name', value: 'userName', loc: { start: 10, end: 18 } },
          value: {
            kind: 'StringValue', value: 'rmarks6767', block: false, loc: { start: 20, end: 32 },
          },
          loc: { start: 10, end: 32 },
        }, {
          kind: 'Argument',
          name: { kind: 'Name', value: 'password', loc: { start: 34, end: 42 } },
          value: {
            kind: 'StringValue', value: 'password', block: false, loc: { start: 44, end: 54 },
          },
          loc: { start: 34, end: 54 },
        }],
        directives: [],
        selectionSet: {
          kind: 'SelectionSet',
          selections: [{
            kind: 'Field', name: { kind: 'Name', value: 'userName', loc: { start: 62, end: 70 } }, arguments: [], directives: [], loc: { start: 62, end: 70 },
          }, {
            kind: 'Field', name: { kind: 'Name', value: 'email', loc: { start: 75, end: 80 } }, arguments: [], directives: [], loc: { start: 75, end: 80 },
          }, {
            kind: 'Field', name: { kind: 'Name', value: '_id', loc: { start: 85, end: 88 } }, arguments: [], directives: [], loc: { start: 85, end: 88 },
          }],
          loc: { start: 56, end: 92 },
        },
        loc: { start: 4, end: 92 },
      }],
      loc: { start: 0, end: 94 },
    },
    loc: { start: 0, end: 94 },
  },
  variableValues: {},
  cacheControl: { cacheHint: { maxAge: 0 } },
};
