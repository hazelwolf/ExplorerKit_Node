'use strict';
const express = require('express');
const app = express();
const chatrooms = require('./app');
const passport = require('passport');

app.set('port',process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(chatrooms.session);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', chatrooms.router);

app.listen(app.get('port'),()=>{
    console.log("Express running on port : " + app.get('port'));
});