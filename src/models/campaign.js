const { model, Schema, ObjectId } = require('mongoose');

const CampaignSchema = new Schema({
    name: {type: String},
    dm: {type: ObjectId},
    description: {type: String},
    characters: {type: [ObjectId]},
    rule: {type: ObjectId},
    maps: {type: [ObjectId]}
});

module.exports = { 
    model: model('Campaign', CampaignSchema), 
    schema: CampaignSchema 
}