const { model, Schema } = require('mongoose');

const AccountSchema = new Schema({
  userName: String,
  name: String,
  email: String,
  password: String,
  friends: [String],
});

module.exports = {
  model: model('Account', AccountSchema),
  schema: AccountSchema,
};
