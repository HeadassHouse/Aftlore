const { ApolloServer } = require('apollo-server');
const { importSchema } = require('graphql-import');


const server = () => {
    const typeDefs = importSchema('src/schemas/schema.graphql');

    return new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers
    })
}

module.exports = server;