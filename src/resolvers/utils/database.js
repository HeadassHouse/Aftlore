const mongoose = require('mongoose');

module.exports = {
  Connect: async () => {
    const username = process.env.MONGO_USERNAME;
    const password = process.env.MONGO_PASSWORD;
    const connectionString = process.env.MONGO_CONNECTION_STRING;
    const uri = `mongodb://${username}:${password}@${connectionString}`;

    try {
      mongoose.connect(
        uri, {
          useNewUrlParser: true,
          dbName: 'loremaster',
          useUnifiedTopology: true,
          useFindAndModify: false,
        },
      );
    } catch (_) { throw new Error('CONNECT_ERROR'); }
  },

  CreateDocument: async (Model, payload) => {
    const doc = new Model(payload).save();

    if (!doc) throw new Error('CREATE_ERROR');
    return doc;
  },

  DeleteDocument: async (Model, payload) => {
    const doc = await Model.deleteOne(payload);

    if (!doc) throw new Error('DELETE_ERROR');
    return doc;
  },

  DeleteDocuments: async (Model, query) => {
    const docs = await Model.deleteMany(query);

    if (!docs) throw new Error('DELETE_MUL_ERROR');
    return docs;
  },

  GetDocument: async (Model, query) => {
    const doc = Model.findOne(query);

    if (!doc) throw new Error('NOT_FOUND');
    return doc;
  },

  GetDocuments: async (Model, query) => {
    const docs = await Model.find(query);

    if (!docs) throw new Error('NOT_FOUND');
    return docs;
  },

  UpdateDocument: async (Model, query, update) => {
    const doc = await Model.findOneAndUpdate(query, update, {
      new: true,
      runValidators: true,
    });

    if (!doc) throw new Error('UPDATE_ERROR');
    return doc;
  },
};
