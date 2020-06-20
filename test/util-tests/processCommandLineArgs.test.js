const assert = require('assert');
const args = require('../../src/utils/proccessCommandLineArgs');

describe("Processing command line arguments", () => {
    describe("Verbose command line argument is set", () => {
        describe("'v' tag is included", () => {
            it("Should have verbose set to true", () => {
                process.argv.push('v');
    
                const clargs = args();
                
                assert.equal( clargs.verbose, true);
            });
        });
    
        describe("'verbose' tag is included", () => {
            it("Should have verbose set to true", () => {
                process.argv.push('verbose');
            
                const clargs = args();
    
                assert.equal( clargs.verbose, true);
            });
        });
    });
    
    describe("Environment command line argument is set", () => {
        describe("Default environment is dev", () => {
            describe("No tag is included", () => {   
                it("Should have env set to dev", () => {
                    const clargs = args();
    
                    assert.equal( clargs.env, "dev");
                });
            });
        });
        
        describe("Develop tag is active", () => {
            describe("'d' tag is included", () => {
                it("Should have env set to dev", () => {
                    process.argv.push('d');
                    
                    const clargs = args();
            
                    assert.equal( clargs.env, "dev");
                });
            });
    
            describe("'dev' tag is included", () => {
                it("Should have env set to dev", () => {
                    process.argv.push('dev');
                    
                    const clargs = args();
            
                    assert.equal( clargs.env, "dev");
                });
            });
        });
    
        describe("Production tag is active", () => {
            describe("'p' tag is included", () => {
                it("Should have env set to prod", () => {
                    process.argv.push('p');
                    
                    const clargs = args();
            
                    assert.equal( clargs.env, "prod");
                });
            });
    
            describe("'prod' tag is included", () => {
                it("Should have env set to prod", () => {
                    process.argv.push('prod');
                    
                    const clargs = args();
            
                    assert.equal( clargs.env, "prod");
                });
            });
        });
    });
});
