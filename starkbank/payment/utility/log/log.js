const rest = require('../../../utils/rest.js');

class UtilityPaymentLog {
    constructor(created, type, errors){
    this.created = created; // TODO check datetime
    this.type = type;
    this.errors = errors;
    this.payment = null;
    }
}

exports.UtilityPaymentLog = UtilityPaymentLog;
let resource = exports.UtilityPaymentLog;


exports.get = async function (id, user = null) {
    return rest.getId(resource, id, user)
};
