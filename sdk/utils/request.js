const starkbank = require('../../index.js');
const Ecdsa = require('starkbank-ecdsa').Ecdsa;
const pjson = require('../../package.json');
const error = require('../error.js');
const Check = require('./check.js');
const Url = require('./url.js');
const axios = require('axios').default;


class Response {

    constructor(status, content) {
        this.status = status;
        this.content = content;
    }

    json() {
        return this.content;
    }
}

function preProcess(path, method, payload, query, user, version) {
    user = user || starkbank.user;
    let language = Check.language(starkbank.language);

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

    let url = hostname + path + Url.encode(query);
    let accessTime = Math.round((new Date()).getTime() / 1000);
    let message = user.accessId() + ':' + accessTime + ':';

    if (payload && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        let body = JSON.stringify(payload);
        message += body;
        options['data'] = body;
    }

    options['headers'] = {
        'Access-Id': user.accessId(),
        'Access-Time': accessTime,
        'Access-Signature': Ecdsa.sign(message, user.privateKey()).toBase64(),
        'User-Agent': 'Node-' + process.versions['node'] + '-SDK-' + pjson.version,
        'Content-Type': 'application/json',
        'Accept-Language': language
    };
    options['url'] = url

    return options
}

exports.fetch = async function (path, method = 'GET', payload = null, query = null, user = null, version = 'v2') {
    let options = preProcess(path, method, payload, query, user, version);
    let response;
    let content;
    let status;
    try {
        response = await axios(options);
        content = response.data;
        status = response.status;
    } catch (e) {
        if (!e.response) {
            throw e;
        }
        response = await e.response;
        content = response.data;
        status = response.status;
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
    let options = preProcess(path, method, payload, query, user, version);
    options['responseType'] = 'arraybuffer';
    options['responseEncoding'] = 'binary'
    let content;
    let status;
    let response;
    try {
        response = await axios(options);
        content = await Buffer.from(response.data, 'binary');
        status = response.status;
    } catch (e) {
        if (!e.response) {
            throw e;
        }
        response = await e.response;
        content = response.data;
        status = response.status;
        switch (status) {
            case 400:
            case 404:
                throw new error.InputErrors(JSON.parse(content.toString()), status);
            case 500:
                throw new error.InternalServerError(content.toString(), status);
            default:
                throw e;
        }
    }
    return new Response(status, content);
};

