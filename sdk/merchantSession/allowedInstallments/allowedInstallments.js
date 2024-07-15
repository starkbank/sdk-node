const SubResource = require('../../utils/subResource').SubResource;

class AllowedInstallment extends SubResource {
    constructor({totalAmount, count}){
        super()
        this.totalAmount = totalAmount
        this.count = count
    }
}

exports.AllowedInstallment = AllowedInstallment;
exports.resource = {'class': exports.AllowedInstallment, 'name': 'AllowedInstallments'};
