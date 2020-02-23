'use strict';
const passport = require('passport');
const config = require('../config');
const db = require('../db');
const h = require('../helpers');
const TwitterStrategy = require('passport-twitter').Strategy;
module.exports = () => {

    passport.serializeUser((user,done)=>{
        done(null,user.id);
    })

    passport.deserializeUser((id,done)=>{
        console.log(id);
        h.findById(id)
        .then(user=> done(null,user))
        .catch(err=> console.log(err));
    })

    let authProcessor =  (accessToken,refreshToken,profile,done)=>{
        //Find a user in the local db using profile.id
        h.findOne(profile.id).then(result =>{
            // If the user is found, return user data
            if(result){
                done(null, result);
            }
            // If user is not found, create one in local db and return
            else{
                h.createNewUser(profile)
                .then(newChatUser => done (null, newChatUser))
                .catch (err=> {
                    console.log(err);
                })
            }
        })
    };
    passport.use(new TwitterStrategy(config.twitter, authProcessor));
}