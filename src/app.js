const express = require('express');
const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');
const resolver = require('./resolvers/resolver')
const campaign = require('../jsonTemplates/campaign')

const create = () => {
    const server = new ApolloServer({
        typeDefs: importSchema('src/schemas/schema.graphql'),
        resolvers: resolver,
        subscriptions: {
            onConnect: (connectionParams, webSocket) => {
                return "connected";
            },
        },
    });

    const app = express();
    app.use('/campaign', (_, res) => {
        res.send(campaign);
    });

    server.applyMiddleware({app})

    const httpServer = http.createServer(app);
    server.installSubscriptionHandlers(httpServer);

    return httpServer;
}

module.exports = create;