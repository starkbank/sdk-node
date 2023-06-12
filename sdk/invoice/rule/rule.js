const SubResource = require('../../utils/subResource').SubResource;

class Rule extends SubResource {
    /**
    * Invoice.Rule object
    * 
    * @description The Invoice.Rule object modifies the behavior of Invoice objects when passed as an argument upon their creation.
    * 
    * Parameters (required):
    * @param key [string]: Rule to be customized, describes what Invoice behavior will be altered. ex: "allowedTaxIds"
    * @param value [list of string]: Value of the rule. ex: ["012.345.678-90", "45.059.493/0001-73"]
    * 
    */

    constructor({ key, value }){
        super();
        this.key = key;
        this.value = value;
    }

}

exports.Rule = Rule;
exports.resource = {'class': exports.Rule, 'name': 'Rule'};
