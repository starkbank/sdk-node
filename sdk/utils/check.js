const PrivateKey = require('mecanizou-sb-ecdsa').PrivateKey;


function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function formatDatetime(datetime) {
    return datetime.toISOString().replace('Z', '+00:00');
}

exports.date = function (input) {
    if (!input) {
        return null;
    }
    if (typeof input === 'string') {
        return input;
    }
    return formatDate(new Date(input));
};

exports.datetime = function (input) {
    if (!input) {
        return null;
    }
    if (typeof input === 'string') {
        return input;
    }
    return formatDatetime(new Date(input));
};

exports.datetimeOrDate = function (input) {
    if (!input) {
        return null;
    }
    if (typeof input === 'string') {
        return input;
    }
    let date = new Date(input);
    let time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    if (time == '0:0:0') {
        return formatDate(date);
    }
    return formatDatetime(new Date(input));
};

exports.key = function (key) {
    try {
        PrivateKey.fromPem(key);
    } catch (e) {
        throw new Error('Invalid private key, try another one');
    }
    return key;
};

exports.environment = function (environment) {
    let validEnvironments = ['production', 'sandbox'];
    if (validEnvironments.includes(environment)){
        return environment;
    }
    throw Error(`Invalid environment, please choose among ${validEnvironments}`);
};

exports.language = function (language) {
    let acceptedLanguages = ['en-US', 'pt-BR'];
    if (acceptedLanguages.includes(language)) {
        return language;
    }
    throw Error(`Invalid language, please choose among ${acceptedLanguages}`);
}

exports.queryBool = function (bool) {
    return typeof bool === 'undefined' ? null : bool.toString();
}
