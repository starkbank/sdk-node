const SubResource = require('../../utils/subResource').SubResource


class Rule extends SubResource {
    /**
     *
     * Transfer.Rule object
     *
     * @description The Transfer.Rule object modifies the behavior of Transfer objects when passed as an argument upon their creation.
     *
     * Parameters (required):
     * @param key [string]: Rule to be customized, describes what Transfer behavior will be altered. ex: "resendingLimit"
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
