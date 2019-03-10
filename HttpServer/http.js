"use strict";
const http = require('http');
/* Simple http server */
http 
    .createServer((req,res)=>{
        res.writeHead(200,{'Content-type':'text/html'});
        res.end('<h1>Hello Node JS</h1>');
    })
    .listen(3000, ()=>console.log("Server started on Port 3000"));
    