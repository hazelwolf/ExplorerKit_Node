'use strict';
const http = require('http');
const port = process.argv[2] || 8000;
const url = require('url')
const fs = require('fs');
const path = require('path');
// Move to Export 
let mimes ={
    '.htm' : 'text/html',
    '.html' : 'text/html',
    '.css' : 'text/css',
    '.js' : 'text/javascript',
    '.gif' : 'image/gif',
    '.png' : 'image/png',
    '.jpg' : 'image/jpeg',
}

function webserver(req,res){
 let baseURI = url.parse(req.url);
 let filepath = __dirname + (baseURI.pathname === '/' ? '/index.htm' : baseURI.path);
 
 // Check requested file is accessible or not
 fs.access(filepath, fs.F_OK, error => {
     if(!error){
         fs.readFile(filepath, (error, content)=>{
             if(!error)
             {
                // Resolve the content type
                let contentType = mimes[path.extname(filepath)];
                // Serve the file from the buffer
                res.writeHead(200, {'Content-Type' : contentType});
                res.end(content, 'utf-8');
             }
             else
             {
                fileError(res);
             }
         });
     }
     else
     {
        fileError(res);
     }
 })
}

// Serve a 500 in case file is not found/ readable
function fileError(res){
    res.writeHead(500);
    res.end("The server could not read the file requested.")
}

http.createServer(webserver).listen(port, ()=>{
    console.log("Hosting directory on port :: " + port);
})