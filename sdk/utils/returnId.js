const {bacenId} = require('../../index');


exports.create = function (bankCode) {
    return 'D' + bacenId.create(bankCode);
}
