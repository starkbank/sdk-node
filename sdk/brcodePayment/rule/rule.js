const SubResource = require('../../utils/subResource').SubResource


class Rule extends SubResource {
    /**
     *
     * BrcodePayment.Rule object
     *
     * @description The BrcodePayment.Rule object modifies the behavior of BrcodePayment objects when passed as an argument upon their creation.
     *
     * Parameters (required):
     * @param key [string]: Rule to be customized, describes what BrcodePayment behavior will be altered. ex: "resendingLimit"
     * @param value [integer]: Value of the rule. ex: 5
     * 
     */
    constructor({key, value}) {
        super();
        this.key = key;
        this.value = value;
    }
}

exports.Rule = Rule;
exports.subResource = {'class': exports.Rule, 'name': 'Rule'};
