const { ApolloError, PubSub } = require('apollo-server');
const db = require('../utils/database');
const { schema:Map } = require('../models/map');
const { Where } = require('../utils/linqConstructor');
const mongoose = require('mongoose');

const pubsub = new PubSub();
const MAP_UPDATED = 'MAP_UPDATED';

module.exports = {
    Query: {
        getMap: ( _, { _id, where } ) => {
            if (_id && where) {
                throw new ApolloError("Cannot specify id and where clause!");
            } 
            else if (_id) {    
                return db.GetDocument(mongoose.model('Map', Map),{ _id: _id } )
                .then( async (result) => {
                    return [result]
                })
                .catch( (error) => {
                    return [ ]
                });        
            } 
            else if (where){
                return db.GetDocuments(mongoose.model('Map', Map), Where(where) )
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
        createMap: ( _ , { map }) => {
            return db.CreateDocument(mongoose.model('Map', Map), map)
                .then( () => { 
                    return {
                        code: 200,
                        message: "Successfully inserted Map"
                    }
                })
                .catch( (error) => {
                    return {
                        code: 400,
                        message: error
                    }
                });
        },
        editMap: async ( _, { _id, update } ) => {
            return db.UpdateDocument(mongoose.model('Map', Map), { _id: _id }, update )
                .then( ( result ) => {
                    pubsub.publish(MAP_UPDATED, { mapUpdated: result } );
                    return result;
                })
                .catch( (error) => {
                    return new ApolloError("Error updating the map!")
                });
        },
        deleteMap: async ( _, { _id, where } ) => {
            if (_id && where) {
                throw new ApolloError("Cannot specify id and where clause!");
            }
            else if(_id){
                return db.DeleteDocument(mongoose.model('Map', Map), { _id : _id } )
                .then( ( ) => {
                    return {
                        code: 200,
                        message: "Successfully deleted Map",
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
                return db.DeleteDocuments(mongoose.model('Map', Map), Where(where) )
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
    Subscription: {
        mapUpdated: { 
            subscribe: () => pubsub.asyncIterator([MAP_UPDATED])
        }
    }
}