const mongoose = require('mongoose');
const { ApolloError } = require('apollo-server');

module.exports = {
    Connect: async () => {
        const username = process.env.MONGO_USERNAME || 'user';
        const password = process.env.MONGO_PASSWORD || 'password';
        const connectionString = process.env.MONGO_CONNECTION_STRING || 'localhost:27017/data';
        const uri = `mongodb://${username}:${password}@${connectionString}`

        mongoose
            .connect(uri, {
                useNewUrlParser: true,
                dbName: 'loremaster',
                useUnifiedTopology: true 
            })
            .then( () => `Successfully connected to db`)
            .catch( (error) => `Could not connect to db. Error: ${error}`); 
    },

    CreateDocument: async (Model, payload) => {
        return new Model(payload).save()
            .catch( (error) => { throw new ApolloError(error) } );
    },

    DeleteDocument: async (Model, payload) => {
        const doc = Model.deleteOne( payload )
        if (!doc)
            throw new ApolloError("Document not found!");
        else
            return doc;
    },

    // DeleteDocuments: async (Model, payload) => {
    //     return new Model(payload).deleteOne( payload )
    //         .catch( (error) => { throw new ApolloError(error) } );
    // },

    GetDocument: async (Model, query, fields = null) => {
        const doc = Model.findOne( query );
        
        if (!doc)
            throw new ApolloError("Document not found!");
        else
            return doc;
    },

    GetDocuments: async (Model, query) => {
        const docs = await Model.find( query );

        if (!docs)
            throw new ApolloError("No documents found!");
        else
            return docs
    },

    UpdateDocument: async (Model, _id, update) => {
        return await Model.findOneAndUpdate( { _id: _id }, update, {
            new: true,
            runValidators: true
        });
    }
}