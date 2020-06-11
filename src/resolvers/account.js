const { CreateDocument, GetDocument } = require('../utils/database');
const { schema:Account } = require('../models/account');

module.exports = {
    Query: {
        getAccount: ( _, { userName, password } ) => {
            // Get the account info from the db, returning the account if the passwordhash and password match
            const account = await GetDocument( Account,  );
            
            // Check to make sure the password is correct
            const same = await bcrypt.compare(password, account);

            // If they are the same, we will return the account, otherwise we will return an error
            if (same) {
                return account;
            }
            else {
                return new Error("Incorrect login information");
            }
        }
    },
    Mutation: {
        createAccount: ( _, { account } ) => {

        }
    }
}