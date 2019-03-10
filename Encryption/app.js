const cipher = require('./cipher');
const ci = new cipher("thisstringistherawkey01234567890");
let encodeString = ci.encode("Don't panic!");
let decodeString = ci.decode("YNfHvoZngojGpSek.x9bbb9KPzL4YNq85x1YJaA==");
console.log("Encode string :: " + encodeString);
console.log("Decode string :: " + decodeString);