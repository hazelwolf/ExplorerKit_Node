"use strict";
const crypto = require("crypto");

class cipher{
    constructor(key){
        this.key = key;
    }
    encode(str){
        // Strengthens the encoding and generates random intialization vector which creates random encrpted key each time
        //const iv = crypto.randomBytes(16); 
        /* Here, we’re using the randomBytes() method from the crypto module to generate a 16
        bytes long random variable. Why 16? Because, aes-256 algorithm demands a 16-byte
        initialization vector, as a mandatory requirement.*/
        //This can be further strengthened by
        const iv = crypto.pbkdf2Sync(this.key, crypto.randomBytes(16),10000, 16, 'sha512');
        /*This method, known as the Password Based Key Derivation Function – 2 is a system which
        takes in two keys namely a password and a randomly and uniquely generated salt. It then
        uses an algorithm known as a digest algorithm to iterate through a function that ultimately
        produces a highly unique and secure key, which can then be used for encryption purposes.*/
        const key =  this.key;
        const encoder = crypto.createCipheriv('aes-256-ctr', key, iv);
        let encodedText = encoder.update(str, 'utf8', 'base64');
        //encoder.final() will return any remaining enciphered data
        encodedText+=encoder.final();
        return encodedText + "."+ iv.toString('base64');
    }
    decode(str){
        const encodedString = str.split(".")[0];
        const iv = Buffer.from(str.split(".")[1],'base64');
        const key = Buffer.from(this.key, 'binary');
        let decoder = crypto.createDecipheriv('aes-256-ctr', key, iv);
        let decodedtext = decoder.update(encodedString, 'base64');
        decodedtext += decoder.final();
        return decodedtext;
    }
} 

module.exports = cipher;