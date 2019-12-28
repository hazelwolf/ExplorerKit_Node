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

function FileAccess(filepath){
    return new Promise((resolve, reject) => {
        fs.access(filepath, fs.F_OK, error =>{
            if(!error){
                resolve(filepath);
            }
            else
            {
                reject(error);
            }
        })
    })
}

function StreamFile(filepath){
    return new Promise((resolve,reject)=>{
       let fileStream = fs.createReadStream(filepath);

       fileStream.on("open", ()=>{
           resolve(fileStream);
       })

       fileStream.on('error', error=>{
           reject(error);
       })
    })
}

function WebServer(req,res){
// Load reuesdted files
 let baseURI = url.parse(req.url);
 let filepath = __dirname + (baseURI.pathname === '/' ? '/index.htm' : baseURI.path);
 let contentType = mimes[path.extname(filepath)];
 
 // Check requested file is accessible or not
 FileAccess(filepath)
 .then(StreamFile)
 .then(filestream =>{
     res.writeHead(200,{"Content-Type" : contentType});
     filestream.pipe(res);
 })
 .catch(error=>{
    res.writeHead(404);
    res.end(JSON.stringify(error));
 })
};

http.createServer(WebServer).listen(port, ()=>{
    console.log("Hosting directory on port :: " + port);
})