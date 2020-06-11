const { Connect }  = require('./utils/database')
const app = require('./app');

const port = process.env.PORT || 3000;

Promise.call(Connect())
    .then( () => { app().listen(port, console.log(`Running on port ${port}`))})
    .catch( err => console.error(`Error starting server: ${err}`));