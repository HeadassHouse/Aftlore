const { CreateDocument, GetDocument, UpdateDocument } = require('../utils/database');
const { ApolloError } = require('apollo-server');
const { schema:Account } = require('../models/account');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

module.exports = {
    Query: {
        login: async ( _, { userName, password } ) => {
            return GetDocument( mongoose.model('Account', Account), { userName: userName } )
                .then( async (result) => {
                    if (!result)
                        return new Error("userName not found");
                    const same = await bcrypt.compare(password, result.password);
                    if (same) {
                        return result;
                    }
                    else {
                        return new ApolloError("Incorrect login information");
                    }
                })
                .catch( (error) => {
                    return {
                        code: 400,
                        message: error
                    }
                });            
        }
    },
    Mutation: {
        createAccount: async ( _, { account } ) => {
            account.password = await bcrypt.hash(String(account.password),10);
            return CreateDocument(mongoose.model('Account', Account), account)
                .then( () => { 
                    return {
                        code: 200,
                        message: "Successfully inserted Account"
                    }
                })
                .catch( (error) => {
                    return {
                        code: 400,
                        message: error
                    }
                });
        },
        editAccount: async ( _, { _id, update: { property, value} } ) => {
            if (property == "password")
                return new ApolloError("Must use changePassword for updating password");
            
            return UpdateDocument(mongoose.model('Account', Account), _id, { [property]: value} )
                .then( ( ) => { 
                    return {
                        code: 200,
                        message: "Successfully edited Account"
                    }
                })
                .catch( (error) => {
                    return {
                        code: 400,
                        message: error
                    }
                });
        },
        changePassword: async ( _, { _id, oldPassword, newPassword } ) => {
            const account = await GetDocument( mongoose.model('Account', Account), { _id: _id } );

            if ( account && await bcrypt.compare(oldPassword, account.password) ){
                newPassword = await bcrypt.hash(String(newPassword), 10);
                return UpdateDocument(mongoose.model('Account', Account), { _id: _id } , { password: newPassword} )
                    .then( ( ) => { 
                        return {
                            code: 200,
                            message: "Successfully changed password"
                        }
                    })
                    .catch( (error) => {
                        return {
                            code: 400,
                            message: error
                        }
                    });
            }
            else {
                return new ApolloError("Old password is not correct");
            }
        }
    }
}