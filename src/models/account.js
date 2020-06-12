const { model, Schema } = require('mongoose');

const AccountSchema = new Schema({
    userName: { type: String },
    name: { type: String },
    email: { type: String },
    password: { type: String },
    friends: { type: [ String ] }
});

module.exports = { 
    model: model('Account', AccountSchema), 
    schema: AccountSchema 
}