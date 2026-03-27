const rest = require('../utils/rest.js');
const check = require('starkcore').check;
const Resource = require('starkcore').Resource;


class VerifiedAccount extends Resource {
    /**
     *
     * VerifiedAccount object
     *
     * @description When you initialize a VerifiedAccount, the entity will not be automatically
     * created in the Stark Bank API. The 'create' function sends the objects
     * to the Stark Bank API and returns the list of created objects.
     *
     * Parameters (required):
     * @param taxId [string]: receiver tax ID (CPF or CNPJ) with or without formatting. ex: '01234567890' or '20.018.183/0001-80'
     *
     * Parameters (conditionally required):
     * @param bankCode [string]: code of the receiver bank institution in Brazil. If an ISPB (8 digits) is informed, a Pix transfer will be created, else a TED will be issued. The bankCode parameter is required if verifying with bank details. ex: '20018183' or '341'
     * @param branchCode [string]: receiver bank account branch. Use '-' in case there is a verifier digit. ex: '1357-9'. The branchCode parameter is required if verifying with bank details.
     * @param keyId [string]: pix key identifier. ex: 'tony@starkbank.com', '012.345.678-90'. The keyId parameter is required if verifying with Pix key.
     * @param name [string]: receiver full name. ex: 'Anthony Edward Stark'. The name parameter is required if verifying with bank details.
     * @param number [string]: receiver bank account number. Use '-' before the verifier digit. ex: '876543-2'. The number parameter is required if verifying with bank details.
     * @param type [string]: verified account type. ex: 'checking', 'savings', 'salary' or 'payment'. The type parameter is required if verifying with bank details.
     *
     * Parameters (optional):
     * @param tags [list of strings, default []]: list of strings for reference when searching for verified accounts. ex: ['employees', 'monthly']
     *
     * Attributes (return-only):
     * @param id [string]: unique id returned when the VerifiedAccount is created. ex: '5656565656565656'
     * @param bankName [string]: bank name associated with the verified account. ex: 'Stark Bank'
     * @param status [string]: current verified account status. ex: 'creating', 'created', 'processing', 'active', 'failed' or 'canceled'
     * @param created [string]: creation datetime for the verified account. ex: '2020-03-10 10:30:00.000'
     * @param updated [string]: update datetime for the verified account. ex: '2020-03-10 10:30:00.000'
     *
     */
    constructor({
                    taxId, bankCode, branchCode, keyId, name, number, type, tags, id,
                    bankName, status, created, updated
                }) {
        super(id);
        this.taxId = taxId;
        this.bankCode = bankCode;
        this.branchCode = branchCode;
        this.keyId = keyId;
        this.name = name;
        this.number = number;
        this.type = type;
        this.tags = tags;
        this.bankName = bankName;
        this.status = status;
        this.created = check.datetime(created);
        this.updated = check.datetime(updated);
    }
}

exports.VerifiedAccount = VerifiedAccount;
let resource = {'class': exports.VerifiedAccount, 'name': 'VerifiedAccount'};

exports.create = async function (verifiedAccounts, {user} = {}) {
    /**
     *
     * Create VerifiedAccounts
     *
     * @description Send a list of VerifiedAccount objects for creation in the Stark Bank API
     *
     * Parameters (required):
     * @param verifiedAccounts [list of VerifiedAccount objects]: list of VerifiedAccount objects to be created in the API
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of VerifiedAccount objects with updated attributes
     *
     */
    return rest.post(resource, verifiedAccounts, user);
};

exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific VerifiedAccount
     *
     * @description Receive a single VerifiedAccount object previously created in the Stark Bank API by passing its id
     *
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns VerifiedAccount object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
};

exports.cancel = async function (id, {user} = {}) {
    /**
     *
     * Cancel a VerifiedAccount entity
     *
     * @description Cancel a VerifiedAccount entity previously created in the Stark Bank API
     *
     * Parameters (required):
     * @param id [string]: VerifiedAccount unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns canceled VerifiedAccount object
     *
     */
    return rest.deleteId(resource, id, user);
};

exports.query = async function ({limit, after, before, status, ids, tags, user} = {}) {
    /**
     *
     * Retrieve VerifiedAccounts
     *
     * @description Receive a generator of VerifiedAccount objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null]: date filter for objects created or updated only after specified date. ex: '2020-03-10'
     * @param before [string, default null]: date filter for objects created or updated only before specified date. ex: '2020-03-10'
     * @param status [string, default null]: filter for status of retrieved objects. ex: 'creating', 'created', 'processing', 'active', 'failed' or 'canceled'
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns generator of VerifiedAccount objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        after: after,
        before: before,
        status: status,
        ids: ids,
        tags: tags,
    };
    return rest.getList(resource, query, user);
};

exports.page = async function ({cursor, limit, after, before, status, ids, tags, user} = {}) {
    /**
     *
     * Retrieve paged VerifiedAccounts
     *
     * @description Receive a list of up to 100 VerifiedAccount objects previously created in the Stark Bank API and the cursor to the next page.
     * Use this function instead of query if you want to manually page your requests.
     *
     * Parameters (optional):
     * @param cursor [string, default null]: cursor returned on the previous page function call
     * @param limit [integer, default 100]: maximum number of objects to be retrieved. It must be an integer between 1 and 100. ex: 50
     * @param after [string, default null]: date filter for objects created or updated only after specified date. ex: '2020-03-10'
     * @param before [string, default null]: date filter for objects created or updated only before specified date. ex: '2020-03-10'
     * @param status [string, default null]: filter for status of retrieved objects. ex: 'creating', 'created', 'processing', 'active', 'failed' or 'canceled'
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of VerifiedAccount objects with updated attributes and cursor to retrieve the next page of VerifiedAccount objects
     *
     */
    let query = {
        cursor: cursor,
        limit: limit,
        after: after,
        before: before,
        status: status,
        ids: ids,
        tags: tags,
    };
    return rest.getPage(resource, query, user);
};
