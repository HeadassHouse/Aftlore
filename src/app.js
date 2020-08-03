const express = require('express');
const http = require('http');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');
const resolver = require('./resolvers/resolver');
const campaign = require('../jsonTemplates/campaign');

const createApp = () => {
  const app = express();

  app.use(cors());
  app.use('/campaign', (_, res) => {
    res.send(campaign);
  });

  const server = new ApolloServer({
    typeDefs: importSchema('src/schemas/schema.graphql'),
    resolvers: resolver,
    subscriptions: {
      onConnect: () => 'connected',
    },
    debug: false,
  });

  server.applyMiddleware({ app });

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  return httpServer;
};

module.exports = createApp;
