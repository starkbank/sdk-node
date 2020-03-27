const rest = require('../../utils/rest.js');

class BoletoLog {
    constructor(created, type, errors) {
        this.created = created; // TODO check datetime
        this.type = type;
        this.errors = errors;
        this.boleto = null;
    }
}

exports.BoletoLog = BoletoLog;
let resource = exports.BoletoLog;


exports.get = async function (id, user = null) {
    return rest.getId(resource, id, user);
};
