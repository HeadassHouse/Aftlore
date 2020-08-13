const { model, Schema, ObjectId } = require('mongoose');

const CampaignSchema = new Schema({
  name: String,
  dm: ObjectId,
  description: String,
  characters: [ObjectId], // Need a seperate collection for active char sheets
  ruleSet: ObjectId, // Set the Ruleset as something in a different place
  maps: [ObjectId], // Same for the maps ( sep coll )
});

module.exports = {
  model: model('Campaign', CampaignSchema),
  schema: CampaignSchema,
};
