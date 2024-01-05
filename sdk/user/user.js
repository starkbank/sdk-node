const check = require('starkcore').check;
const Resource = require('starkcore').Resource;
const PrivateKey = require('starkbank-ecdsa').PrivateKey;


class User extends Resource {

    constructor({id, privateKey, environment}) {
        super(id);
        this.pem = check.key(privateKey);
        this.environment = check.environment(environment);
    }

    privateKey() {
        return PrivateKey.fromPem(this.pem);
    }
}

exports.User = User;