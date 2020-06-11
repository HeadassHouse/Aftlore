const { model, Schema } = require('mongoose');

const Friend = new Schema({
    userName: { type: String },
    name: { type: String }
})

const AccountSchema = new Schema({
    userName: { type: String },
    name: { type: String },
    email: { type: String },
    friends: { type: [ Friend ] }
});

module.exports = { 
    model: model('Account', AccountSchema), 
    schema: AccountSchema 
}