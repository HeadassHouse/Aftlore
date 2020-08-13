/* eslint-disable no-console */
const { proccessCommandLineArgs } = require('..');

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
    `('should return $expected for $tag', ({ tag, expected, accessor }) => {
    process.argv.push(tag);
    const arg = proccessCommandLineArgs()[accessor];
    expect(arg).toEqual(expected);
  });
  describe('help', () => {
    beforeEach(() => {
      console.error = jest.fn();
      process.exit = jest.fn();
    });

    ['help', 'h'].forEach((tag) => {
      it('should print help message', () => {
        process.argv.push(tag);

        proccessCommandLineArgs();

        expect(console.error).toBeCalled();
        expect(process.exit).toBeCalled();
      });
    });
  });
});
