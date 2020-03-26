const Ecdsa = require('@starkbank/ecdsa');
const https = require('https');

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
                             query = null, version = 'v2', callback) {
    let hostname = {
        'production': 'https://api.starkbank.com/' + version,
        'sandbox': 'https://sandbox.api.starkbank.com/' + version,
        'development': 'https://development.api.starkbank.com/' + version,
    }[user.environment];
    if (query) {
        let queryString = '';
        queryString = '?';
        for (let key in query) {
            queryString += key + '=' + query[key];
        }
        path += queryString;
    }
    url = hostname + path;
    let accessTime = Math.round((new Date()).getTime() / 1000);
    let body = null;
    let message = user.accessId() + ':' + accessTime + ':';
    if (payload && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        body = JSON.stringify(payload);
        message += body;
    }

    headers = {
        'Access-Id': user.accessId(),
        'Access-Time': accessTime,
        'Access-Signature': Ecdsa.Ecdsa.sign(message, user.privateKey()).toBase64(),
        'Content-Type': 'application/json',
        'User-Agent': 'Node-' + process.versions['node'] + '-SDK-2.0.0',
    };
    console.log('Method:', method);
    console.log('Message:', message);
    let options = {
        'headers': headers,
        'method': method,
    };
    console.log(url);
    let request = https.request(url, options, (response) => {
        // Add timeout.
        request.setTimeout(10000, function () {
            request.abort();
        });
        let body = '';
        response.on('data', function (chunk) {
            body += chunk;
        });
        response.on('end', function () {
            let resp = new Response(response.statusCode, body);
            console.log(-1);
            console.log(resp.content);
            console.log(0);
            callback(resp);
        });
    });
    request.end();
    return request;
};
