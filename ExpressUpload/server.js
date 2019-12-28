const express = require("express");
const app = express();
const http = require("http").Server(app).listen(80);
const upload = require("express-fileupload");
app.use(upload());
console.log("Server started");
app.get('/', function(req,res){
    res.sendfile(__dirname + '\\index.html');
})
app.post('/',function(req,res){
    if(req.files){
        console.log(req.files.myfile.name);
        res.send("file recieved");
    }
    else{
        res.send("No files");
    }
})

