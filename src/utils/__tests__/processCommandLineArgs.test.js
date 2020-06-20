const args = require('../proccessCommandLineArgs');

describe("Verbose command line argument is set", () => {
    test("'v' tag is included", () => {
        process.argv.push('v');
        
        const clargs = args();

        expect(clargs.verbose).toBeTruthy();
    });

    test("'verbose' tag is included", () => {
        process.argv.push('verbose');
        
        const clargs = args();

        expect(clargs.verbose).toBeTruthy();
    });
});

describe("Environment command line argument is set", () => {
    describe("Default environment is dev", () => {
        test("No tag is included", () => {            
            const clargs = args();
    
            expect(clargs.env).toEqual( 'dev' );
        });

        test("'prod' tag is included", () => {
            process.argv.push('prod');
            
            const clargs = args();
    
            expect(clargs.env).toEqual( 'prod' );
        });
    });
    
    describe("Develop tag is active", () => {
        test("'d' tag is included", () => {
            process.argv.push('d');
            
            const clargs = args();
    
            expect(clargs.env).toEqual( 'dev' );
        });

        test("'dev' tag is included", () => {
            process.argv.push('dev');
            
            const clargs = args();
    
            expect(clargs.env).toEqual( 'dev' );
        });
    });

    describe("Production tag is active", () => {
        test("'p' tag is included", () => {
            process.argv.push('p');
            
            const clargs = args();
    
            expect(clargs.env).toEqual( 'prod' );
        });

        test("'prod' tag is included", () => {
            process.argv.push('prod');
            
            const clargs = args();
    
            expect(clargs.env).toEqual( 'prod' );
        });
    });
});