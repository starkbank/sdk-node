const Ecdsa = require('@starkbank/ecdsa');

class User extends require('../utils/resource.js').Resource {
    constructor(environment = null, id = null, privateKey = null) {
        super(id);
        this.pem = privateKey; // TODO check key
        this.environment = environment; //TODO check env
    }

    accessId() {
        return this.constructor.name.toLowerCase() + '/' + this.id;
    }

    privateKey() {
        return Ecdsa.PrivateKey.fromPem(this.pem);
    }
}

exports.User = User;