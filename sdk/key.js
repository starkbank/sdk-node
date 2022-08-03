const fs = require('fs');
const PrivateKey = require('mecanizou-sb-ecdsa').PrivateKey;


exports.create = function (path = null) {
    let newPrivateKey = new PrivateKey();
    let newPublicKey = newPrivateKey.publicKey();

    let newPrivatePem = newPrivateKey.toPem();
    let newPublicPem = newPublicKey.toPem();

    if (!path) {
        fs.writeFile('privateKey.pem', newPrivatePem, function (err) {
            if (err) return console.log(err);
        });
        fs.writeFile('publicKey.pem', newPublicPem, function (err) {
            if (err) return console.log(err);
        });
    }
    return [newPrivatePem, newPublicPem];
};