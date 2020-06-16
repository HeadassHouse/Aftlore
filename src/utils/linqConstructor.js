/// The structure that the following would interpret would look something like this:
// {
//     "where": {
//         "and": [{
//             "or": [{
//                 "operation": "EQUALS",
//                 "property": "_id",
//                 "value": "kjd8ddf9isd93k3-d-3-d3e3ed3-3dds"
//             },
//             {
//                 "operation": "EQUALS",
//                 "property": "_id",
//                 "value": "zsdsdsdsdsdcksj-d-3-d3e3ed3-3dds"
//             }]
//         }]
//     }
// }
//
// This translates to 
// The WHERE clause is built by the following functions
const getArgs = require('./proccessCommandLineArgs')

const Or = ( { operation, value, property } ) => { 
    try {
        switch(operation) {
            case "EQUALS": // EQUALS operation
                return { [property]: value };
            case "CONTAINS": // CONTAINS operation
                return { [property]: `/${value}/` };
            case "LT": // LT operation
                return { [property]: { $lt: value } };                    
            case "LTE": // LTE operation
                return { [property]: { $lte: value } };                                        
            case "GT": // GT operation
                return { [property]: { $gt: value } };                                                    
            case "GTE": // GTE operation
                return { [property]: { $gte: value } };   
            case "NE": // NE operation
                return { [property]: { $ne: value } }    
            default:
                throw `NOT_AN_OP`;                          
        }
    }
    catch(err) {
        throw `Data type could not be properly compared! Error: ${err}`
    }
    
}

const And = (ORList) => {
    let or = null; 
    ORList.or.forEach(OR => {
        if (or){
            or.push(Or(OR) );
        } else {
            or = [ Or(OR) ];
        }
    });
    return { $or: or };
}
    
module.exports = {
    Where: (ANDList) => {
        let and = null; 
        if (ANDList.and) {
            ANDList.and.forEach(AND => {
                if (and){
                    and.$and.push(And(AND) );
                } else {
                    and = { ["$and"]: [ And(AND) ] };
                }
            });
        }
        
        if ( getArgs().verbose )
            console.log(JSON.stringify(and));
        return (and) ? and : { };
    }
}