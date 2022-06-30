const starkbank = require('starkbank');
const uniqueId = require('./uniqueId.js').uniqueId;


exports.generateExampleWorkspace = function () {
    id = uniqueId();
    return new starkbank.Workspace({
        username: 'starkv2-' + id,
        name: 'Stark V2: ' + id,
    });
};
