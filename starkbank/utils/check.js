const Ecdsa = require('@starkbank/ecdsa');

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

exports.date = function (input) {
    if (typeof input === 'string') {
        return input;
    }
    let date = new Date(input);

    return formatDate(date);
};

exports.key = function (key) {
    try {
        Ecdsa.PrivateKey.fromPem(key);
    } catch (e) {
        throw new Error('Invalid private key, try another one');
    }
    return key;
};

exports.environment = function (environment) {
    let validEnvironments = ["production", "sandbox"];
    if (validEnvironments.includes(environment)){
        return environment;
    }
    throw Error(`Invalid environment, please choose among ${validEnvironments}`);
};