const Ecdsa = require('@starkbank/ecdsa');
const got = require('got');
const pjson = require('./package.json');

class Response {
    constructor(status, content) {
        this.status = status;
        this.content = content;
    }

    json() {
        return JSON.parse(self.content);
    }
}

exports.apiFetch = function (user, path, method = 'GET', payload = null,
                             query = null, version = 'v2') {
    let hostname = {
        'production': 'https://api.starkbank.com/' + version,
        'sandbox': 'https://sandbox.api.starkbank.com/' + version,
        'development': 'https://development.api.starkbank.com/' + version,
    }[user.environment];

    let options = {
        method: method,
        json: false
    };

    let url = hostname + path;
    if (query) {
        let queryString = '?';
        for (let key in query) {
            queryString += key + '=' + query[key];
        }
        url += queryString;
    }

    let accessTime = Math.round((new Date()).getTime() / 1000);
    let message = user.accessId() + ':' + accessTime + ':';

    if (payload && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        let body = JSON.stringify(payload);
        message += body;
        options['body'] = body
    }

    options['headers'] = {
        'Access-Id': user.accessId(),
        'Access-Time': accessTime,
        'Access-Signature': Ecdsa.Ecdsa.sign(message, user.privateKey()).toBase64(),
        'Content-Type': 'application/json',
        'User-Agent': 'Node-' + process.versions['node'] + '-SDK-' + pjson.version,
    };

    let response = null;
    (async () => {
        try {
            response = await got(url, options);
        } catch (error) {
            console.log(error.response.body);
        }
    })();

    return new Response(response.status, response.content);
};
