const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');
const { resolver } = require('./resolvers/resolver')
const campaign = require('../jsonTemplates/campaign')

const create = () => {
    const server = new ApolloServer({
        typeDefs: importSchema('src/schemas/schema.graphql'),
        resolvers: resolver
    });

    const app = express();
    app.use('/campaign', ( _, res ) => {
        res.send(campaign);
    });

    server.applyMiddleware({ app });
    return app;
}

module.exports = create;