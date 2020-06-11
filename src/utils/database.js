const { mongoose } = require('mongoose');

module.exports = {
    Connect: () => {
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
        const doc = new Model(payload);
        const savedDoc = doc.save()
            .catch( (error) => { throw new ApolloError(error) } );
        
        return savedDoc;
    },
    GetDocument: async (collection, id) => {
        const doc = collection.findOne( { _id: id});
        
        if (!doc)
            throw new ApolloError("Document not found!");
       
        return doc;
    },
    GetDocuments: async (collection, query, fields) => {
        const docs = collection.find(query, fields);

        if (!docs)
            throw new ApolloError("No documents found!");
        
        return docs
    }
}