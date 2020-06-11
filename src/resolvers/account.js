const { CreateDocument, GetDocument } = require('../utils/database');
const { schema:Account } = require('../models/account');
const { bcrypt } = require('bcrypt');


module.exports = {
    Query: {
        getAccount: ( _, { userName, password } ) => {
            return GetDocument( Account, { userName: userName } )
                .then( (result) => {
                    const same = await bcrypt.compare(password, result.password);
                    if (same) {
                        return result;
                    }
                    else {
                        return new Error("Incorrect login information");
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
        createAccount: ( _, { account } ) => {
            account.password = await bcrypt.hash(String(account.password),10);

            return CreateDocument(Account, account)
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
        }
    }
}