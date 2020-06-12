const starkbank = require('../../index.js');
const Ecdsa = require('starkbank-ecdsa').Ecdsa;
const pjson = require('../../package.json');
const error = require('../error.js');
const Check = require('./check.js');
const axios = require('axios').default;
const urlencode = require('./url.js').urlencode;


class Response {

    constructor({status, content}) {
        this.status = status;
        this.content = content;
    }

    json() {
        return JSON.parse(this.content);
    }
}

exports.fetch = async function ({method, path, payload = null, query = null, user = null, version = 'v2'}) {
    user = user || starkbank.user;
    language = Check.language(starkbank.language);

    if (!user) {
        throw Error('A user is required to access our API. Check our docs: https://github.com/starkbank/sdk-node/');
    }

    let baseUrl = {
        'production': 'https://api.starkbank.com/',
        'sandbox': 'https://sandbox.api.starkbank.com/'
    }[user.environment] + version;

    let queryString = urlencode(query)

    url = `${baseUrl}/${path}${queryString}`

    let agent = 'Node-' + process.versions['node'] + '-SDK-' + pjson.version;
    let accessTime = Math.round((new Date()).getTime() / 1000);
    let body = payload ? JSON.stringify(payload) : ""
    let message = user.accessId() + ':' + accessTime + ':' + body;
    let signature = Ecdsa.sign(message, user.privateKey()).toBase64();

    let request;
    try {
        request = await axios({
            url: url,
            method: method,
            data: body,
            transformResponse: res => res,
            headers: {
                'Access-Id': user.accessId(),
                'Access-Time': accessTime,
                'Access-Signature': signature,
                'Content-Type': 'application/json',
                'User-Agent': agent,
                'Accept-Language': language
            }
        });
    } catch (e) {
        request = await e.response;
    }

    let response = new Response({
        status: request.status,
        content: request.data,
    });

    if (response.status == 500) {
        throw new error.InternalServerError(response.content);
    }
    if (response.status == 400) {
        throw new error.InputErrors(response.json()["errors"]);
    }
    if (response.status != 200) {
        throw new error.UnknownError(response.content, response.status);
    }

    return response
}
