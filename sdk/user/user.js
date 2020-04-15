const PrivateKey = require('starkbank-ecdsa').PrivateKey;
const check = require('../utils/check.js')


class User extends require('../utils/resource.js').Resource {

    constructor(id = null, privateKey = null, environment = null) {
        super(id);
        this.pem = check.key(privateKey);
        this.environment = check.environment(environment);
    }

    accessId() {
        return this.constructor.name.toLowerCase() + '/' + this.id;
    }

    privateKey() {
        return PrivateKey.fromPem(this.pem);
    }
}

exports.User = User;