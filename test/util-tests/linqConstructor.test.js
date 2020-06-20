const assert = require('assert');
const { Where } = require('../../src/utils/linqConstructor');

describe("Where filter", () => {
    describe("Where with proper fields", () => {
        it("Should return an appropriate MongoDB filter", () => {
            const And = {
                and: [{
                    or: [{
                        operation: "EQUALS",
                        value: "google@gmail.com",
                        property: "email"
                    }]
                }]
            }

            const whereObj = JSON.stringify(Where(And));
            const shouldBe = JSON.stringify({ $and: [{ $or: [{ email : "google@gmail.com" } ] } ] });

            assert.equal( whereObj, shouldBe );
        });
    });

    describe("Where with a non existent operation", () => {
        it("Should throw an error", () => {
            const And = {
                and: [{
                    or: [{
                        operation: "NOTANOP",
                        value: "google@gmail.com",
                        property: "email"
                    }]
                }]
            }
            try {
                Where(And);
            }
            catch(err) {
                assert.equal( err, "Data type could not be properly compared! Error: NOT_AN_OP" );
            }
        });
    });

    describe("Where with an empty body", () => {
        it("Should return an empty filter object", () => {
            const And = {}

            const whereObj = JSON.stringify(Where(And));
            const shouldBe = JSON.stringify({});

            assert.equal( whereObj, shouldBe );
        });
    });
});