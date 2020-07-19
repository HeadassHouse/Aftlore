const args = require('../proccessCommandLineArgs');

describe('args should return expected', () => {
    afterEach(() => {
        process.argv = [];
    });
    
    it.each`
        tag          | expected  | accessor
        ${'v'}       | ${true}   | ${'verbose'}
        ${'verbose'} | ${true}   | ${'verbose'}
        ${'d'}       | ${'dev'}  | ${'env'}
        ${'dev'}     | ${'dev'}  | ${'env'}
        ${'p'}       | ${'prod'} | ${'env'}
        ${'prod'}    | ${'prod'} | ${'env'}
    `
    ('should return $expected for $tag', ({tag, expected, accessor}) => {
        process.argv.push(tag);
        const arg = args()[accessor];
        expect(arg).toEqual(expected);
    });
    describe('help', () => {
        beforeEach(() => {
            console.log = jest.fn();
            process.exit = jest.fn();
        });

        ['help', 'h'].forEach(tag => {
            it('should print help message', () => {
                process.argv.push(tag);

                args();

                expect(console.log).toBeCalled();
                expect(process.exit).toBeCalled();
            });
        });
    })
});
