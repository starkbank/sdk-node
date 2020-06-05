const starkbank = require('../../index.js');
const Ecdsa = require('starkbank-ecdsa').Ecdsa;
const pjson = require('../../package.json');
const error = require('../error.js');
const got = require('got');


class Response {

    constructor(status, content) {
        this.status = status;
        this.content = content;
    }

    json() {
        return JSON.parse(self.content);
    }
}

function preProcess(path, method, payload, query, user, version) {
    user = user || starkbank.user;

    if (!user) {
        throw Error('A user is required to access our API. Check our docs: https://github.com/starkbank/sdk-node/');
    }

    let hostname = {
        'production': 'https://api.starkbank.com/' + version,
        'sandbox': 'https://sandbox.api.starkbank.com/' + version
    }[user.environment];

    let options = {
        method: method,
    };

    let url = hostname + path;
    if (query) {
        let queryString = '';
        let separator = '?';
        for (let key in query) {
            if (query[key]) {
                queryString += separator + key + '=' + query[key];
                separator = '&';
            }
        }
        url += queryString;
    }
    let accessTime = Math.round((new Date()).getTime() / 1000);
    let message = user.accessId() + ':' + accessTime + ':';

    if (payload && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        let body = JSON.stringify(payload);
        message += body;
        options['body'] = body;
    }

    options['headers'] = {
        'Access-Id': user.accessId(),
        'Access-Time': accessTime,
        'Access-Signature': Ecdsa.sign(message, user.privateKey()).toBase64(),
        'User-Agent': 'Node-' + process.versions['node'] + '-SDK-' + pjson.version,
        'Content-Type': 'application/json'
    };

    return [url, options]
}

exports.fetch = async function (path, method = 'GET', payload = null, query = null, user = null, version = 'v2') {
    let url;
    let options;
    [url, options] = preProcess(path, method, payload, query, user, version);

    let response;
    let content;
    let status;
    try {
        response = await got(url, options);
        content = response.body;
        status = response.statusCode;
    } catch (e) {
        if (!e.response) {
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

exports.fetchBuffer = async function (path, method = 'GET', payload = null, query = null, user = null, version = 'v2') {
    let url;
    let options;
    [url, options] = preProcess(path, method, payload, query, user, version);

    let content;
    let status;
    try {
        const responsePromise = got(url, options);
        const bufferPromise = responsePromise.buffer();
        content = await bufferPromise;
        status = 200;
    } catch (e) {
        if (!e.response) {
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

