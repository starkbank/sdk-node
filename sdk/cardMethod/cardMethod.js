const SubResource = require('../utils/subResource').SubResource;
const rest = require('../utils/rest.js');

class CardMethod extends SubResource {
    /**
    * @description CardMethod's codes are used to define methods filters in CorporateRules.
    * 
    * Parameters (required):
    * @param code [string]: method's code. Options: "chip", "token", "server", "manual", "magstripe", "contactless"
    * 
    * Attributes (return-only):
    * @return name [string]: method's name. ex: "token"
    * @return number [string]: method's number. ex: "81"
    */

    constructor({ code, name = null, number = null  }) {
        super();

        this.code = code;
        this.name = name;
        this.number = number;
    }
}

exports.CardMethod = CardMethod;
exports.resource = {'class': exports.CardMethod, 'name': 'CardMethod'};

exports.query = async function ({ search, user} = {}) {
    /**
    * Retrieve CardMethods
    * 
    * @description Receive a generator of CardMethod objects previously created in the Stark Bank API
    * 
    * Parameters (optional):
    * @param search [string, default null]: keyword to search for code, name, number or shortCode
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
    * 
    * Return:
    * @return generator of CardMethod objects with updated attributes
    * 
    */
    let query = {
        search: search
    }
    return rest.getList(exports.resource, query, user);
}
