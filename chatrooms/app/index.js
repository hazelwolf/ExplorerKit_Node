'use static';
// Social authentication
require('./auth')();

// Create an IO server instance
let ioServer = app =>{
    app.locals.chatrooms = [];
    const server = require('http').Server(app);
    const io = require('socket.io')(server);
    require('./socket')(io, app);
    return server;
}
// include all features here
module.exports = {
    router : require('./routes')(),
    session: require('./session'),
    ioServer
}