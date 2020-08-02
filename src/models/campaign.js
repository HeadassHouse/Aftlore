const { model, Schema, ObjectId } = require('mongoose');
const { schema: RuleSetSchema } = require('./ruleset');

const CampaignSchema = new Schema({
  name: String,
  dm: ObjectId,
  description: String,
  characters: [ObjectId],
  ruleSet: RuleSetSchema,
  maps: [ObjectId],
});

module.exports = {
  model: model('Campaign', CampaignSchema),
  schema: CampaignSchema,
};

