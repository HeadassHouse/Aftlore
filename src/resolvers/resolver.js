const { Query: AccountQuery, Mutation: AccountMutation } = require('./account');
const { Query: MapQuery, Mutation: MapMutation } = require('./map');

module.exports = {
    resolver: {
        Query:{
            login: AccountQuery.login,
            getMap: MapQuery.getMap,
        }, 
        Mutation: {
            createAccount: AccountMutation.createAccount,
            createMap: MapMutation.createMap,
            editAccount: AccountMutation.editAccount,
            editMap: MapMutation.editMap,
            deleteMap: MapMutation.deleteMap,
        }
    }
}


