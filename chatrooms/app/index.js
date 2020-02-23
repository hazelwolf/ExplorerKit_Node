'use static';
// Social authentication
require('./auth')();

// include all features here
module.exports = {
    router : require('./routes')(),
    session: require('./session')
}