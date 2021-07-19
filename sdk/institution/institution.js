const rest = require('../utils/rest.js');
const check = require('../utils/check.js');
const SubResource = require('../utils/subResource.js').SubResource;


class Institution extends SubResource {
    
    constructor({ displayName = null, name = null, spiCode = null, strCode = null }) {
        super();
        this.displayName = displayName;
        this.name = name;
        this.spiCode = spiCode;
        this.strCode = strCode;
    }
}

exports.Institution = Institution;
let subResource = {'class': exports.Institution, 'name': 'Institution'};

exports.query = async function ({ limit, search, spiCodes, strCodes, user} = {}) {
    /**
     *
     * Retrieve DictKeys
     *
     * @description Receive a list of Institution objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param search [string, default null]: part of the institution name to be searched. ex: 'stark'
     * @param spiCodes [list of strings, default null]: list of SPI (Pix) codes to be searched. ex: ['20018183']
     * @param strCodes [list of strings, default null]: list of STR (TED) codes to be searched. ex: ['260']
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of Institution objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        search: search,
        spiCodes: spiCodes,
        strCodes: strCodes
    };
    return (await rest.getPage(subResource, query, user))[0];
};
