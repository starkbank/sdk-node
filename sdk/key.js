const fs = require('fs');
const PrivateKey = require('starkbank-ecdsa').PrivateKey;


exports.create = function (path = null) {
    let newPrivateKey = new PrivateKey();
    let newPublicKey = newPrivateKey.publicKey();

    let newPrivatePem = newPrivateKey.toPem();
    let newPublicPem = newPublicKey.toPem();

    if (!path) {
        fs.writeFile('private-key.pem', newPrivatePem, function (err) {
            if (err) return console.log(err);
        });
        fs.writeFile('public-key.pem', newPublicPem, function (err) {
            if (err) return console.log(err);
        });
    }
    return [newPrivatePem, newPublicPem];
};