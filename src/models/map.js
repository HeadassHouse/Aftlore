const { model, Schema, ObjectId } = require('mongoose');

const MapSchema = new Schema({
    imageLink: { type: String },
    name: { type: String },
    tiles: { 
        type: [ 
            {
                x: Number,
                y: Number ,
                height: Number,
                width: Number,
                type: {
                    type: String,
                    enum: [
                        'IMPASSABLE',
                        'PASSABLE',
                        'ROUGH',
                        'SLIPPERY'
                    ]
                },
                entities: [ 
                    { 
                        type: {
                            type: String, 
                            enum: [
                                "CHARACTER", 
                                "NPC",
                                "ITEM"
                            ]
                        },
                        associatedId: ObjectId
                    } 
                ]
            } 
        ] 
    }
});

module.exports = { 
    model: model('Map', MapSchema), 
    schema: MapSchema 
}