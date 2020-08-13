const { model: AccountModel } = require('./account');
const { model: MapModel } = require('./map');
const { RuleSetModel, CharacterModel } = require('./ruleset');
const { model: CampaignModel } = require('./campaign');

module.exports = {
  AccountModel,
  MapModel,
  RuleSetModel,
  CharacterModel,
  CampaignModel,
};
