"use strict";
const http = require('http');
const url = require('url');
const qs = require('querystring');
let routes = {
    'GET' : {
        '/': (req,res)=>{
            res.writeHead(200,{'Content-type' : 'text/html'});
            res.end("<h1>Hello Router</h1>")
        },
        '/about' : (req,res)=>{
            res.writeHead(200,{'Content-type' : 'text/html'});
            res.end("<h1>This is the about page</h1>")
        },
        '/getinfo' : (req,res)=>{
            res.writeHead(200,{'Content-type' : 'application/json'});
            res.end(JSON.stringify(req.queryParams));
        }
    }, 
    'POST':{
        '/api/login' : (req,res)=>{
            let body = '';
            req.on('data',data=>{
                body +=data;
                //This give the size of data being posted over to server
                console.log(body.length);
                //check if size of data is greater then 2MB
                if(body.length > 2097152){
                    res.writeHead(413, {'Content-type' : 'text/html'});
                    //In case the file is greater then 2MB stop request and show error
                    res.end('<h3> Error : the file exceeds 2MB Limit</h3>', 
                    ()=>req.connection.destroy());
                }
            })
            req.on('end',()=>{
                let params = qs.parse(body);
                console.log("Username :: " + params['username']);
                console.log("Password :: " + params['password']);
                res.end("End of response");
            })
        }

    },
    'NA': (req,res) =>{
        res.writeHead(404);
        res.end('Content not found');
    }
}
//Handles the routing
function router(req,res){
    let baseURI = url.parse(req.url,true); // true ensures query returns a useable json object
    //assign the method as first key and second key as child object
    let resolveRoute= routes[req.method][baseURI.pathname];
    if(resolveRoute != undefined){
        req.queryParams = baseURI.query;
        resolveRoute(req,res);
    }
    else{
        routes['NA'](req,res);
    }
}
http.createServer(router).listen(3000, ()=> console.log("Server is running on port 3000"));
