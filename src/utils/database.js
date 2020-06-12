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
                dbName: 'loremaster'
            })
            .then(() => `Successfully connected to db`); 
    },
    CreateDocument: async (Model, payload) => {
        console.log(payload)
        const doc = new Model(payload);
        const savedDoc = doc.save()
            .catch( (error) => { throw new ApolloError(error) } );
        console.log(savedDoc);
        return savedDoc;
    },
    GetDocument: async (collection, query, fields = null) => {
        const doc = collection.findOne( query );
        
        if (!doc)
            throw new ApolloError("Document not found!");
       
        return doc;
    },
    GetDocuments: async (collection, query, fields) => {
        const docs = collection.find( query, fields);

        if (!docs)
            throw new ApolloError("No documents found!");
        
        return docs
    }
}