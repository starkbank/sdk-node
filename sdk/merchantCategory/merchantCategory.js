const SubResource = require('starkcore').SubResource;
const rest = require('../utils/rest.js')

class MerchantCategory extends SubResource {
    /**
    * 
    * MerchantCategory object
    * 
    * @description MerchantCategory's codes and types are used to define categories filters in CorporateRules.
    * A MerchantCategory filter must define exactly one parameter between code and type.
    * A type, such as "food", "services", etc., defines an entire group of merchant codes,
    * whereas a code only specifies a specific MCC.
    * 
    * Parameters (conditionally required):
    * @param code [string, default null]: category's code. ex: "veterinaryServices", "fastFoodRestaurants"
    * @param type [string, default null]: category's type. ex: "pets", "food"
    * 
    * Attributes (return-only):
    * @return name [string]: category's name. ex: "Veterinary services", "Fast food restaurants"
    * @return number [string]: category's number. ex: "742", "5814"
    */

    constructor (code = null, type = null, name = null, number = null) {
        super();
        this.code = code
        this.type = type
        this.name = name
        this.number = number
    }
}

exports.MerchantCategory = MerchantCategory;
exports.resource = {"class": exports.MerchantCategory, "name": "MerchantCategory"}

exports.query = async function ({search, user} = {}) {
    /**
    * 
    * Retrieve MerchantCategories
    * 
    * @description Receive a generator of MerchantCategory objects previously created in the Stark Bank API
    * 
    * Parameters (optional):
    * @param search [string, default null]: keyword to search for code, type, name or number
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
    * 
    * Return:
    * @return generator of MerchantCategory objects with updated attributes
    */

    let query = {
        search: search,
    }

    return rest.getList(exports.resource, query, user)
}
