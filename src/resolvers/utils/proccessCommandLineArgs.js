module.exports = () => {
  const args = {
    verbose: false,
    env: 'dev',
  };

  process.argv.forEach((arg) => {
    // eslint-disable-next-line default-case
    switch (arg) {
      case 'verbose':
      case 'v':
        args.verbose = true;
        break;
      case 'dev':
      case 'd':
        args.env = 'dev';
        break;
      case 'prod':
      case 'p':
        args.env = 'prod';
        break;
      case 'help':
      case 'h':
        // eslint-disable-next-line no-console
        console.error('Usage:\n\tnpm <start>\nOptions:\n\t[v / verbose]\n\t[d / dev]\n\t[p / prod]\n\t[h / help]');
        process.exit();
    }
  });

  return args;
};
