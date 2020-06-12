const { ApolloServer } = require('apollo-server');
const { importSchema } = require('graphql-import');
const { resolver } = require('./resolvers/resolver')

const server = () => {
    return new ApolloServer({
        typeDefs: importSchema('src/schemas/schema.graphql'),
        resolvers: resolver
    })
}

module.exports = server;