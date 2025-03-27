const SubResource = require('starkcore').SubResource;
const rest = require('../utils/rest.js')

class MerchantCountry extends SubResource {
    /**
    * 
    * MerchantCountry object
    * 
    * @description MerchantCountry's codes are used to define countries filters in CorporateRules.
    * 
    * Parameters (required):
    * @param code [string]: country's code. ex: "BRA"
    * 
    * Attributes (return-only):
    * @return name [string]: country's name. ex: "Brazil"
    * @return number [string]: country's number. ex: "076"
    * @return shortCode [string]: country's short code. ex: "BR"
    */

    constructor ({
        code, name = null, number = null, shortCode = null
    }) {
        super();
        this.code = code;
        this.name = name;
        this.number = number;
        this.shortCode = shortCode;
    }
}

exports.MerchantCountry = MerchantCountry;
let resource = {"class": exports.MerchantCountry, "name": "MerchantCountry"}

exports.query = async function ({search, user} = {}) {
    /**
    * 
    * Retrieve MerchantCountries
    * 
    * @description Receive a generator of MerchantCountry objects previously created in the Stark Bank API
    * 
    * Parameters (optional):
    * @param search [string, default null]: keyword to search for code, name, number or shortCode
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
    * 
    * Return:
    * @return generator of MerchantCountry objects with updated attributes
    */

    let query = {
        search: search,
    }
    
    return rest.getList(resource, query, user)
}
