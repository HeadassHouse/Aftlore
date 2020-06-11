const { model, Schema } = require('mongoose');

const Tile = new Schema({
    x: { type: Number },
    y: { type: Number },
    height: { type: Number },
    width: { type: Number },
    type: { 
        type: String,
        enum: [
            'IMPASSABLE',
            'PASSABLE',
            'ROUGH',
            'SLIPPERY'
        ]
    }
});

const MapSchema = new Schema({
    imageLink: { type: String },
    name: { type: String },
    tiles: { type: [ Tile] }
});

module.exports = { 
    model: model('Map', MapSchema), 
    schema: MapSchema 
}