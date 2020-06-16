const args = require('../proccessCommandLineArgs');

test("args will contain the 'verbose' tag when included", () => {
    process.argv.push('verbose');
    
    const clargs = args();

    expect(clargs.verbose).toEqual( true );
})