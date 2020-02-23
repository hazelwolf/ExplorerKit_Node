'use strict';
// Basic db setup based on configuration
const config = require('../config');
const mongoose = require('mongoose');
console.log(config.dbURI);
mongoose.connect(config.dbURI,{useNewUrlParser: true, useUnifiedTopology: true}).catch((error)=>{
console.log(error);
});
mongoose.connection.once('open',()=>{
    console.log('Connected to db');
});
mongoose.connection.on('error',(error)=>{
    console.log(error);
});

// Create a scema that defines the structure for storing user data
const chatUser = new mongoose.Schema({
    profileId: String,
    fullName: String,
    profilePic: String
});

// Turn schema into usable model 
let userModel = mongoose.model('chatUser', chatUser);
module.exports = {
    mongoose,
    userModel
}