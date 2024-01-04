const check = require('core-node').check;
const Resource = require('core-node').Resource;
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