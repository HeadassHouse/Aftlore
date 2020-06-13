const { ApolloError } = require('apollo-server');
const { CreateDocument, GetDocument, GetDocuments } = require('../utils/database');
const { schema:Map } = require('../models/map');
const { Where } = require('../utils/linqConstructor');
const mongoose = require('mongoose');

module.exports = {
    Query: {
        getMap: ( _, { _id, where } ) => {
            if (_id && where) {
                throw new ApolloError("Cannot specify id and where clause!");
            } 
            else if (_id) {    
                return GetDocument(mongoose.model('Map', Map),{ _id: _id } )
                .then( async (result) => {
                    return [result]
                })
                .catch( (error) => {
                    return {
                        code: 400,
                        message: error
                    }
                });        
            } 
            else if (where){
                return GetDocuments(mongoose.model('Map', Map), Where(where) )
                .then( async (result) => {
                    return result
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
    Mutation: {
        createMap: ( _ , { map }) => {
            return CreateDocument(mongoose.model('Map', Map), map)
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
        }
    }
}