const { Connect }  = require('./utils/database')
const app = require('./app');

const port = process.env.PORT || 4000;

Promise.all([Connect()])
    .then( () => { app().listen(port, console.log(`Running on port ${port}`))})
    .catch( err => console.error(`Error starting server: ${err}`));