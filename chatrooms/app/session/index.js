'use strict';
const session = require('express-session');
const Mongostore = require('connect-mongo')(session);
const config = require('../config');
const db = require('../db');
// Store sessions data using monogo-connect
if(process.env.NODE_ENV == 'production'){
    module.exports = session({
        secret: config.sessionSecret,
        resave : false,
        saveUninitialized : false,
        store : new Mongostore({mongooseConnection: db.mongoose.connection})
    });
}
else{
    module.exports = session({
        secret: config.sessionSecret,
        resave : false,
        saveUninitialized : true
    });
}