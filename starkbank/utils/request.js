const Ecdsa = require('@starkbank/ecdsa');
const got = require('got');
const pjson = require('../../package.json');
const error = require('./error.js');

class Response {
    constructor(status, content) {
        this.status = status;
        this.content = content;
    }

    json() {
        return JSON.parse(self.content);
    }
}

exports.apiFetch = async function (user, path, method = 'GET', payload = null,
                                   query = null, version = 'v2') {
    let hostname = {
        'production': 'https://api.starkbank.com/' + version,
        'sandbox': 'https://sandbox.api.starkbank.com/' + version,
        'development': 'https://development.api.starkbank.com/' + version,
    }[user.environment];

    let options = {
        method: method,
    };

    let url = hostname + path;
    if (query) {
        let queryString = '?';
        for (let key in query) {
            queryString += key + '=' + query[key];
        }
        url += queryString;
    }
    console.log(url);
    let accessTime = Math.round((new Date()).getTime() / 1000);
    let message = user.accessId() + ':' + accessTime + ':';

    if (payload && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        let body = JSON.stringify(payload);
        message += body;
        options['body'] = body;
    }

    options['headers'] = {
        'Access-Id': user.accessId(),
        'User-Agent': 'Node-' + process.versions['node'] + '-SDK-' + pjson.version,
        'Access-Time': accessTime,
        'Content-Type': 'application/json',
        'Access-Signature': Ecdsa.Ecdsa.sign(message, user.privateKey()).toBase64(),
    };
    let response;
    let content;
    let status;
    try {
        response = await got(url, options);
        content = response.body;
        status = response.statusCode;
    } catch (e) {
        if (e instanceof TypeError) {
            throw e;
        }
        content = e.response.body;
        status = e.response.statusCode;
        switch (status) {
            case 400:
            case 404:
                throw new error.InputErrors(content, status);
            case 500:
                throw new error.InternalServerError(content, status);
            default:
                throw e;
        }
    }
    return new Response(status, content);
};
