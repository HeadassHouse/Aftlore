const { Where } = require('../linqConstructor');

describe('Where filter', () => {
    let where;
    beforeEach(() => {
        where = {
            and: [{ 
                or: [{
                    property: 'name',
                    value: 'Bob',
                    operation: 'EQUALS'
                },
                {
                    property: 'name',
                    value: 'Bob',
                    operation: 'CONTAINS'
                },
                {
                    property: 'name',
                    value: 'Bob',
                    operation: 'LT'
                },
                {
                    property: 'name',
                    value: 'Bob',
                    operation: 'NE'
                }], 
            },
            { 
                or: [{
                    property: 'name',
                    value: 'Bob',
                    operation: 'LTE'
                },
                {
                    property: 'name',
                    value: 'Bob',
                    operation: 'GT'
                },
                {
                    property: 'name',
                    value: 'Bob',
                    operation: 'GTE'
                }], 
            }],
        }
    });
    it('should return an appropriate MongoDB filter', () => {
        const whereObj = JSON.stringify(Where(where));
        const shouldBe = JSON.stringify({
            $and:[{
                $or:[
                    { name: 'Bob' },
                    { name: '/Bob/' },
                    { name: { $lt: 'Bob' } },
                    { name: { $ne: 'Bob' } }
                ]
            },
            {
                $or:[
                    { name: { $lte: 'Bob' } },
                    { name: { $gt: 'Bob' } },
                    { name: { $gte: 'Bob' } }
                ]
            }]
        });

        expect(whereObj).toEqual(shouldBe);
    });
    it('should throw an error when non existent operation', () => {
        const And = {
            and: [{
                or: [{
                    operation: 'NOTANOP',
                    value: 'google@gmail.com',
                    property: 'email'
                }]
            }]
        }
        try {
            Where(And);
        }
        catch(err) {
            expect(err).toEqual('Data type could not be properly compared! Error: NOT_AN_OP' );
        }
    });
    it('should return an empty filter object when empty body supplied', () => {
        const And = {}

        const whereObj = JSON.stringify(Where(And));
        const shouldBe = JSON.stringify({});

        expect(whereObj).toEqual(shouldBe);
    });
    it('should log the and clause when verbose tag is set', () => {
        process.argv.push('v');
        console.log = jest.fn();
        Where({});
        expect(console.log).toBeCalled();
    });
});