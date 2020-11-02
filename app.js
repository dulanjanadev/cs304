const express = require('express');
const helmet = require('helmet'); 
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cors = require('cors');

const roles = require('./routes/roles');
const statuses = require('./routes/statuses');
const users = require('./routes/users');
const institutes = require('./routes/institutes');
const employees = require('./routes/employees');
const cardtypes = require('./routes/card_types');
const cards = require('./routes/cards');
const distributions = require('./routes/distributions');
const reports = require('./routes/reports')
const distcards = require('./routes/distribution_cards')
const home = require('./routes/home'); 
const pagenotfound = require('./routes/pagenotfound');

const models = require('./models');

const app = express();

var corsOptions = {
    origin: 'http://localhost/8081'
};

// Useful built-in middleware functions
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));  // to serve static content
app.use(helmet());   // Helps secure your apps by setting various HTTP headers.
app.use(morgan());

//-------------------------------------- Router Middlewares --------------------------------
// Major routes of the app
app.use('/api/roles', roles);
app.use('/api/statuses', statuses);
app.use('/api/users', users);
app.use('/api/institutes', institutes);
app.use('/api/employees', employees);
app.use('/api/cardtypes', cardtypes);
app.use('/api/cards', cards);
app.use('/api/distributions', distributions);
app.use('/api/reports', reports);
app.use('/api/distcards', distcards);
app.use('/', home);
app.use('/', pagenotfound);
//------------------------------------------------------------------------------------------

// Models
models
.sequelize
.sync()
.then(function() {
    console.log('Nice! Database looks fine.');
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
}).catch(function(err) {
    console.log(err);
});

