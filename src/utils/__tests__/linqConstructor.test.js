const { Where } = require('../linqConstructor');
const { ApolloError } = require('apollo-server');

test("Where returns a filter an appropriate filter object", () => {
    const And = {
        and: [{
            or: [{
                operation: "EQUALS",
                value: "google@gmail.com",
                property: "email"
            }]
        }]
    }
    
    expect(Where(And)).toEqual({ $and: [{ $or: [{ email : "google@gmail.com" } ] } ] } );
})

test("Where will throw an error when the operation does not exist", () => {
    const And = {
        and: [{
            or: [{
                operation: "NOTAOP",
                value: "google@gmail.com",
                property: "email"
            }]
        }]
    }
    try {
        Where(And);
    }
    catch(err) {
        expect(err).toEqual("Data type could not be properly compared! Error: NOT_AN_OP");
    }
})

test("Where clause is empty", () => {
    const And = {
        and: []
    }

    const g = Where(And)

    expect(g).toEqual(null)
})