const { Query: AccountQuery, Mutation: AccountMutation } = require('./account');
const { Query: MapQuery, Mutation: MapMutation } = require('./map');

module.exports = {
    resolver: {
        Query:{
            getAccount: AccountQuery.getAccount,
            getMap: MapQuery.getMap
        }, 
        Mutation: {
            createAccount: AccountMutation.createAccount,
            createMap: MapMutation.createMap
        }
    }
}


