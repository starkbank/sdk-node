const rest = require('../utils/rest.js');
const check = require('starkcore').check;
const Resource = require('starkcore').Resource;


class SplitReceiver extends Resource {
    /**
     * 
     * SplitReceiver object
     * 
     * @description When you initialize a SplitReceiver, the entity will not be automatically
     * sent to the Stark Bank API. The 'create' function sends the objects
     * to the Stark Bank API and returns the list of created objects.
     *
     * Parameters (required):
     * @param name [string]: receiver full name. ex: 'Anthony Edward Stark'
     * @param taxId [string]: receiver tax ID (CPF or CNPJ) with or without formatting. ex: '01234567890' or '20.018.183/0001-80'
     * @param bankCode [string]: code of the receiver bank institution in Brazil. ex: '20018183'
     * @param branchCode [string]: receiver bank account branch. Use '-' in case there is a verifier digit. ex: '1357-9'
     * @param accountNumber [string]: receiver Bank Account number. Use '-' before the verifier digit. ex: '876543-2'
     * @param accountType [string]: Receiver bank account type. This parameter only has effect on Pix Transfers. ex: 'checking', 'savings', 'salary' or 'payment'
     * 
     * Parameters (optional):
     * @param tags [list of strings, default []]: list of strings for tagging. ex: ['travel', 'food']
     *
     * Attributes (return-only):
     * @param id [string]: unique id returned when SplitReceiver is created. ex: '5656565656565656'
     * @param status [string]: current SplitReceiver status. ex: 'created', 'canceled', 'updated'
     * @param created [string]: creation datetime for the SplitReceiver. ex: '2020-03-10 10:30:00.000000+00:00'
     * @param updated [string]: update datetime for the SplitReceiver. ex: '2020-03-10 10:30:00.000000+00:00'
     * 
     */

    constructor({
        name, taxId, bankCode, branchCode, accountNumber, accountType, tags = null,
        id = null, status = null, created = null, updated = null
    }) {
        super(id);
        this.name = name;
        this.taxId = taxId;
        this.bankCode = bankCode;
        this.branchCode = branchCode;
        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.tags = tags;
        this.status = status;
        this.created = check.datetime(created);
        this.updated = check.datetime(updated);
    }
};

exports.SplitReceiver = SplitReceiver;
let resource = {'class': exports.SplitReceiver, 'name': 'SplitReceiver'};

exports.create = async function (receivers, {user} = {}) {
    /**
     *
     * Create SplitReceivers
     * 
     * @description Send a list of SplitReceiver objects for creation in the Stark Bank API
     * 
     * Parameters (required):
     * @param receivers [list of SplitReceiver objects]: list of SplitReceiver objects to be created in the API
     * 
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     * 
     * Return:
     * @returns list of SplitReceiver objects with updated attributes
     * 
     */
    return rest.post(resource, receivers, user);
};

exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific SplitReceiver
     * 
     * @description Receive a single SplitReceiver object previously created in the Stark Bank API by its id
     * 
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     * 
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     * 
     * Return:
     * @returns SplitReceiver object with updated attributes
     * 
     */
    return rest.getId(resource, id, user);
};

exports.query = async function ({limit, after, before, transactionIds, tags, ids, status, taxId, receiverIds, user} = {}) {
    /**
     * 
     * Retrieve SplitReceivers
     * 
     * @description Receive a generator of SplitReceiver objects previously created in the Stark Bank API
     * 
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param status [string, default null]: filter for status of retrieved objects. ex: 'created', 'canceled', 'updated'
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     * 
     * Return:
     * @returns generator of SplitReceiver objects with updated attributes
     * 
     */
    let query = {
        limit: limit,
        after: check.date(after),
        before: check.date(before),
        tags: tags,
        ids: ids,
        status: status,
    };
    return rest.getList(resource, query, user);
};

exports.page = async function ({cursor, limit, after, before, transactionIds, tags, ids, status, taxId, receiverIds, user} = {}) {
    /**
     * 
     * Retrieve paged SplitReceivers
     * 
     * @description Receive a list of up to 100 SplitReceiver objects previously created in the Stark Bank API and the cursor to the next page.
     * Use this function instead of query if you want to manually page your requests.
     * 
     * Parameters (optional):
     * @param cursor [string, default null]: cursor returned on the previous page function call
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param status [string, default null]: filter for status of retrieved objects. ex: 'created', 'canceled', 'updated'
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     * 
     * Return:
     * @returns list of SplitReceiver objects with updated attributes and cursor to retrieve the next page of SplitReceiver objects
     * 
     */
    let query = {
        cursor: cursor,
        limit: limit,
        after: check.date(after),
        before: check.date(before),
        tags: tags,
        ids: ids,
        status: status,
    };
    return rest.getPage(resource, query, user);
};
