'use strict';
/* If environment is production return 
env variables elese return json data for dvelopment*/ 
if(process.env.NODE_ENV === 'production'){
    // offer production stage environment
    module.exports = {
        host: process.env.host || "",
        dbURI : process.env.dbURI,
        sessionsSecret: process.env.sessionsSecret
    }
}
else{
    // offer dev stage settings and data
    module.exports = require('./development.json');
}