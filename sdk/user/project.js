const Ecdsa = require('starkbank-ecdsa');
const User = require('./user').User;


class Project extends User {
    /**
     *
     * Project object
     *
     * @description The Project object is an authentication entity for the SDK that is permanently
     * linked to a specific Workspace.
     * All requests to the Stark Bank API must be authenticated via an SDK user,
     * which must have been previously created at the Stark Bank website
     * [https://sandbox.web.starkbank.com] or [https://web.starkbank.com]
     * before you can use it in this SDK. Projects may be passed as the user parameter on
     * each request or may be defined as the default user at the start (See README).
     *
     * Parameters (required):
     * @param id [string]: unique id required to identify project. ex: '5656565656565656'
     * @param privateKey [string]: PEM string of the private key linked to the project. ex: '-----BEGIN PUBLIC KEY-----\nMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEyTIHK6jYuik6ktM9FIF3yCEYzpLjO5X/\ntqDioGM+R2RyW0QEo+1DG8BrUf4UXHSvCjtQ0yLppygz23z0yPZYfw==\n-----END PUBLIC KEY-----'
     * @param environment [string]: environment where the project is being used. ex: 'sandbox' or 'production'
     *
     * Attributes (return-only):
     * @param name [string, default '']: project name. ex: 'MyProject'
     * @param allowedIps [list of strings]: list containing the strings of the ips allowed to make requests on behalf of this project. ex: ['190.190.0.50']
     * @param pem [string]: private key in pem format. ex: '-----BEGIN PUBLIC KEY-----\nMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEyTIHK6jYuik6ktM9FIF3yCEYzpLjO5X/\ntqDioGM+R2RyW0QEo+1DG8BrUf4UXHSvCjtQ0yLppygz23z0yPZYfw==\n-----END PUBLIC KEY-----'
     *
     */
    constructor({id, privateKey, environment, name = '', allowedIps = []}) {
        super({id, privateKey, environment});
        this.name = name;
        this.allowedIps = allowedIps;
    }

    accessId() {
        return 'project/' + this.id;
    }
}

exports.Project = Project;
