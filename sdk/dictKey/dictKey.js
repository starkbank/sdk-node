const rest = require('../utils/rest.js');
const check = require('../utils/check.js');
const Resource = require('../utils/resource.js').Resource


class DictKey extends Resource {
    /**
     *
     * DictKey object
     *
     * @description DictKey represents a Pix key registered in Bacen's DICT system.
     *
     * Parameters (required):
     * @param id [string]: DictKey object unique id and Pix key itself. ex: 'tony@starkbank.com', '722.461.430-04', '20.018.183/0001-80', '+5511988887777', 'b6295ee1-f054-47d1-9e90-ee57b74f60d9'
     *
     * Attributes (return-only):
     * @param type [string, default null]: Pix key type. ex: 'email', 'cpf', 'cnpj', 'phone' or 'evp'
     * @param name [string, default null]: account owner full name. ex: 'Tony Stark'
     * @param taxId [string, default null]: tax ID (CPF or CNPJ) with or without formatting. ex: '01234567890' or '20.018.183/0001-80'
     * @param ownerType [string, default null]: Pix key owner type. ex 'naturalPerson' or 'legalPerson'
     * @param bankName [string, null null]: bank name associated with the DICT key. ex: 'Stark Bank'
     * @param ispb [string, default null]: ISPB code used for transactions. ex: '20018183'
     * @param branchCode [string, default null]: bank account branch code associated with the Pix key. ex: '9585'
     * @param accountNumber [string, default null]: bank account number associated with the Pix key. ex: '9828282578010513'
     * @param accountType [string, default null]: bank account type associated with the Pix key. ex: 'checking', 'saving', 'salary' or 'payment'
     * @param status [string, default null]: current Pix key status. ex: 'created', 'registered', 'canceled' or 'failed'
     * @param accountCreated [string, default null]: creation datetime of the bank account associated with the Pix key. ex: '2020-11-05T14:55:08.812665+00:00'
     * @param owned [string, default null]: datetime since when the current owner hold this Pix key. ex : '2020-11-05T14:55:08.812665+00:00'     
     * @param created [string, default null]: creation datetime for the Pix key. ex: '2020-11-05T14:55:08.812665+00:00'
     *
     */
    constructor({
                    id, type = null, accountCreated = null, accountType = null, name = null, taxId = null,
                    ownerType = null, bankName = null, ispb = null, branchCode = null, accountNumber = null, 
                    status = null, owned = null, created = null
                }) {
        super(id);
        this.type = type;
        this.accountCreated = check.date(accountCreated);
        this.accountType = accountType;
        this.name = name;
        this.taxId = taxId;
        this.ownerType = ownerType;
        this.bankName = bankName;
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
     * @param id [string]: DictKey object unique id and Pix key itself. ex: 'tony@starkbank.com', '722.461.430-04', '20.018.183/0001-80', '+5511988887777', 'b6295ee1-f054-47d1-9e90-ee57b74f60d9'
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

exports.query = async function ({ limit, after, before, status, type, ids, user} = {}) {
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
     * @param type [string, default null]: DictKey type. ex: "cpf", "cnpj", "phone", "email" or "evp"
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
        type: type,
        ids: ids,
    };
    return rest.getList(resource, query, user);
};

exports.page = async function ({ cursor, limit, after, before, status, type, ids, user} = {}) {
    /**
     *
     * Retrieve paged DictKeys
     *
     * @description Receive a list of up to 100 DictKey objects previously created in the Stark Bank API and the cursor to the next page.
     * Use this function instead of query if you want to manually page your requests.
     *
     * Parameters (optional):
     * @param cursor [string, default null]: cursor returned on the previous page function call
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param status [string, default null]: filter for status of retrieved objects. ex: 'success'
     * @param type [string, default null]: DictKey type. ex: "cpf", "cnpj", "phone", "email" or "evp"
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of DictKey objects with updated attributes and cursor to retrieve the next page of DictKey objects
     *
     */
    let query = {
        cursor: cursor,
        limit: limit,
        after: after,
        before: before,
        status: status,
        type: type,
        ids: ids,
    };
    return rest.getPage(resource, query, user);
};
