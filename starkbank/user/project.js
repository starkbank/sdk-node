const Ecdsa = require('@starkbank/ecdsa');
const User = require('./user').User;

class Project extends User {
    constructor(environment, id, privateKey, name = '', allowedIps = null) {
        super(environment, id, privateKey);
        this.name = name;
        this.allowedIps = allowedIps;
    }
}

exports.Project = Project;