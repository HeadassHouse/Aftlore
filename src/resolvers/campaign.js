const { ApolloError, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
const db = require('../utils/database');
const { schema:Campaign } = require('../models/campaign');
const { Where } = require('../utils/linqConstructor');

const pubsub = new PubSub();
const CAMPAIGN_UPDATED = 'CAMPAIGN_UPDATED';

module.exports = {
    Query: {
        getCampaign: ( _, { _id, where } ) => {
            
            if (_id && where) {
                throw new ApolloError("Cannot specify id and where clause!");
            } 
            else if (_id) {    
                return db.GetDocument(mongoose.model('Campaign', Campaign),{ _id: _id } )
                .then( async (result) => {
                    console.log(result)
                    return [result]
                })
                .catch( (error) => {
                    return [ ]
                });        
            } 
            else if (where){
                return db.GetDocuments(mongoose.model('Campaign', Campaign), Where(where) )
                .then( async (result) => {
                    return result
                })
                .catch( (error) => {
                    return [ ];
                }); 
            } 
            else {
                throw new ApolloError("Must provide an id or a where clause!");
            }
        }
    },
    Mutation: {
        createCampaign: ( _ , { campaign }) => {
            console.log(campaign)
            return db.CreateDocument(mongoose.model('Campaign', Campaign), campaign)
                .then( () => { 
                    return {
                        code: 200,
                        message: "Successfully inserted campaign"
                    }
                })
                .catch( (error) => {
                    return {
                        code: 400,
                        message: error
                    }
                });
        },
        editCampaign: async ( _, { _id, update } ) => {
            return db.UpdateDocument(mongoose.model('Campaign', Campaign), { _id: _id }, update )
                .then( ( result ) => {
                    pubsub.publish(CAMPAIGN_UPDATED, { campaignUpdated: result } );
                    return result;
                })
                .catch( (error) => {
                    return new ApolloError("Error updating the campaign!")
                });
        },
        deleteCampaign: async ( _, { _id, where } ) => {
            if (_id && where) {
                throw new ApolloError("Cannot specify id and where clause!");
            }
            else if(_id){
                return db.DeleteDocument(mongoose.model('Campaign', Campaign), { _id : _id } )
                .then( ( ) => {
                    return {
                        code: 200,
                        message: "Successfully deleted campaign",
                    }
                })
                .catch( (error) => {
                    return {
                        code: 400,
                        message: error
                    }
                });
            }
            else if(where){
                return db.DeleteDocuments(mongoose.model('Campaign', Campaign), Where(where) )
                .then( async (result) => {
                    return {
                        code: 200,
                        message: JSON.stringify(result)
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
                throw new ApolloError("Must provide an id or a where clause!");
            }
            
        }
    },
    // Subscription: {
    //     campaignUpdated: { 
    //         subscribe: () => pubsub.asyncIterator([CAMPAIGN_UPDATED])
    //     }
    // }
}