const Ecdsa = require('@starkbank/ecdsa');
const check = require('../utils/check.js')

class User extends require('../utils/resource.js').Resource {
    constructor(environment = null, id = null, privateKey = null) {
        super(id);
        this.pem = check.key(privateKey);
        this.environment = check.environment(environment);
    }

    accessId() {
        return this.constructor.name.toLowerCase() + '/' + this.id;
    }

    privateKey() {
        return Ecdsa.PrivateKey.fromPem(this.pem);
    }
}

exports.User = User;