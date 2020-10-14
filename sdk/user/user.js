const PrivateKey = require('starkbank-ecdsa').PrivateKey;
const Resource = require('../utils/resource.js').Resource
const check = require('../utils/check.js')


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