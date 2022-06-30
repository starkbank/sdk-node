const starkbank = require("../index.js")

let privateKey, publicKey;

[privateKey, publicKey] = starkbank.key.create();

// or, to also save .pem files in a specific path
[privateKey, publicKey] = starkbank.key.create('file/keys/');
