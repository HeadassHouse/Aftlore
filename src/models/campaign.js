const { model, Schema, ObjectId } = require('mongoose');

const CampaignSchema = new Schema({
    name: String,
    dm: ObjectId,
    description: String,
    characters: [ObjectId],
    rule: ObjectId,
    maps: [ObjectId]
});

module.exports = { 
    model: model('Campaign', CampaignSchema), 
    schema: CampaignSchema 
}