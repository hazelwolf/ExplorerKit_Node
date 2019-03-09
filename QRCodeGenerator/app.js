"use strict";
const qr = require('qr-image');
const fs = require('fs');

// node "encode this string" "QRImage.png"

let dataToEncode = process.argv[2] || null;
let fileName = process.argv[3] || null;
if(fileName && dataToEncode){
    qr.image(dataToEncode,{
        type : 'png',
        size : 20
    }).pipe(fs.createWriteStream(fileName));
    console.log("image is generated");
}
else{
 console.log("Please specify the correct arguments");
}