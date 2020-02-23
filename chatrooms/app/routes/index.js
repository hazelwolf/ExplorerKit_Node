'use strict';
const h = require('../helpers');
const passport = require('passport');
module.exports = () => {
    let routes = {
        'get': {
            '/': (req, res, next) => {
                res.render('login', {
                    pageTitle: 'Login Page'
                });
            },
            '/rooms': (req, res, next) => {
                console.log(JSON.stringify((req.user)));
                res.render('rooms',{
                    user : req.user, 
                });
            },
            '/chat': (req, res, next) => {
                res.render('chatroom');
            },
            '/getsession' : (req, res, next)=>{
                res.send("My fav color : " + req.session.color)
            },
            '/setsession' : (req, res, next)=>{
                req.session.color = "red";
                res.send("session color set");
            },
            '/auth/twitter' : passport.authenticate('twitter'),
            '/auth/twitter/callback' : passport.authenticate('twitter',{
                successRedirect : '/rooms',
                failureRedirect : '/'
            }),
            '/logout' : (req,res,next)=>{
                // method by passport
                req.logout();
                res.redirect('/');
            }
        },
        'post': {},
        'NA' : (req,res,next)=>{
            res.status(404).sendFile(process.cwd()+'/views/404.htm')
        }
    }

    return h.route(routes);
}
