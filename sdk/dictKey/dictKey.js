const rest = require('../utils/rest.js');
const check = require('../utils/check.js');
const Resource = require('../utils/resource.js').Resource


class DictKey extends Resource {
    /**
     *
     * DictKey object
     *
     * @description DictKey represents a PIX key registered in Bacen's DICT system.
     *
     * Parameters (required):
     * @param id [string]: DictKey object unique id and PIX key itself. ex: 'tony@starkbank.com', '722.461.430-04', '20.018.183/0001-80', '+5511988887777', 'b6295ee1-f054-47d1-9e90-ee57b74f60d9'
     *
     * Attributes (return-only):
     * @param type [string, default null]: PIX key type. ex: 'email', 'cpf', 'cnpj', 'phone' or 'evp'
     * @param accountCreated [string, default null]: creation datetime of the bank account associated with the PIX key. ex: '2020-11-05T14:55:08.812665+00:00'
     * @param accountType [string, default null]: bank account type associated with the PIX key. ex: 'checking', 'saving', 'salary' or 'payment'
     * @param name [string, default null]: account owner full name. ex: 'Tony Stark'
     * @param taxId [string, default null]: tax ID (CPF or CNPJ) with or without formatting. ex: '01234567890' or '20.018.183/0001-80'
     * @param ownerType [string, default null]: PIX key owner type. ex 'naturalPerson' or 'legalPerson'
     * @param ispb [string, default null]: ISPB code used for transactions. ex: '20018183'
     * @param branchCode [string, default null]: bank account branch code associated with the PIX key. ex: '9585'
     * @param accountNumber [string, default null]: bank account number associated with the PIX key. ex: '9828282578010513'
     * @param status [string, default null]: current PIX key status. ex: 'created', 'registered', 'canceled' or 'failed'
     * @param owned [string, default null]: datetime since when the current owner hold this PIX key. ex : '2020-11-05T14:55:08.812665+00:00'     
     * @param created [string, default null]: creation datetime for the PIX key. ex: '2020-11-05T14:55:08.812665+00:00'
     *
     */
    constructor({
                    id, type = null, accountCreated = null, accountType = null, name = null, taxId = null,
                    ownerType = null, ispb = null, branchCode = null, accountNumber = null, status = null,
                    owned = null, created = null
                }) {
        super(id);
        this.type = type;
        this.accountCreated = check.date(accountCreated);
        this.accountType = accountType;
        this.name = name;
        this.taxId = taxId;
        this.ownerType = ownerType;
        this.ispb = ispb;
        this.branchCode = branchCode;
        this.accountNumber = accountNumber;
        this.status = status;
        this.owned = check.date(owned);
        this.created = check.date(created);
    }
}

exports.DictKey = DictKey;
let resource = {'class': exports.DictKey, 'name': 'DictKey'};

exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific DictKey
     *
     * @description Receive a single DictKey object by passing its id
     *
     * Parameters (required):
     * @param id [string]: DictKey object unique id and PIX key itself. ex: 'tony@starkbank.com', '722.461.430-04', '20.018.183/0001-80', '+5511988887777', 'b6295ee1-f054-47d1-9e90-ee57b74f60d9'
     * 
     * Parameters (optional):
     * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     * 
     * Return:
     * @returns DictKey object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
};

exports.query = async function ({ limit, after, before, status, tags, ids, user} = {}) {
    /**
     *
     * Retrieve DictKeys
     *
     * @description Receive a generator of DictKey objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param status [string, default null]: filter for status of retrieved objects. ex: 'success'
     * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns generator of DictKey objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        after: after,
        before: before,
        status: status,
        tags: tags,
        ids: ids,
    };
    return rest.getList(resource, query, user);
};
