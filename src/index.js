const { Connect } = require('./resolvers/utils/database');
const app = require('./app');

const port = process.env.PORT || 4000;

Promise.all([Connect()])
  .then(() => {
    app().listen(port, () => {
      console.log(`Server ready at http://localhost:${port}`);
      console.log(`Subscriptions ready at ws://localhost:${port}`);
    });
  })
  .catch((err) => console.error(`Error starting server: ${err}`));
