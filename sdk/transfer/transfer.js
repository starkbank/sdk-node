const rest = require('../utils/rest.js');
const check = require('../utils/check.js');
const parseObjects = require('../utils/parse.js').parseObjects;
const Resource = require('../utils/resource.js').Resource
const { Rule } = require('./rule/rule.js');
const ruleResource = require('./rule/rule.js').subResource;


class Transfer extends Resource {
    /**
     *
     * Transfer object
     *
     * @description When you initialize a Transfer, the entity will not be automatically
     * created in the Stark Bank API. The 'create' function sends the objects
     * to the Stark Bank API and returns the list of created objects.
     *
     * Parameters (required):
     * @param amount [integer]: amount in cents to be transferred. ex: 1234 (= R$ 12.34)
     * @param name [string]: receiver full name. ex: 'Anthony Edward Stark'
     * @param taxId [string]: receiver tax ID (CPF or CNPJ) with or without formatting. ex: '01234567890' or '20.018.183/0001-80'
     * @param bankCode [string]: code of the receiver bank institution in Brazil. If an ISPB (8 digits) is informed, a Pix transfer will be created, else a TED will be issued. ex: '20018183' or '341'
     * @param branchCode [string]: receiver bank account branch. Use '-' in case there is a verifier digit. ex: '1357-9'
     * @param accountNumber [string]: Receiver Bank Account number. Use '-' before the verifier digit. ex: '876543-2'
     * 
     * Parameters (optional):
     * @param accountType [string, default 'checking']: Receiver bank account type. This parameter only has effect on Pix Transfers. ex: 'checking', 'savings', 'salary' or 'payment'
     * @param externalId [string, default null]: url safe string that must be unique among all your transfers. Duplicated externalIds will cause failures. By default, this parameter will block any transfer that repeats amount and receiver information on the same date. ex: 'my-internal-id-123456'
     * @param scheduled [string, default now]: date or datetime when the transfer will be processed. May be pushed to next business day if necessary. ex: '2020-11-12T00:14:22.806+00:00' or '2020-11-30'
     * @param description [string, default null]: optional description to override default description to be shown in the bank statement. ex: 'Payment for service #1234'
     * @param tags [list of strings, default []]: list of strings for reference when searching for transfers. ex: ['employees', 'monthly']
     * @param rules [list of Transfer.Rules, default []]: list of Transfer.Rule objects for modifying transfer behaviour. ex: [Transfer.Rule(key="resendingLimit", value=5)]
     *
     * Attributes (return-only):
     * @param id [string]: unique id returned when Transfer is created. ex: '5656565656565656'
     * @param fee [integer]: fee charged when transfer is created. ex: 200 (= R$ 2.00)
     * @param status [string]: current transfer status. ex: 'processing' or 'success'
     * @param transactionIds [list of strings]: ledger transaction ids linked to this transfer (if there are two, second is the chargeback). ex: ['19827356981273']
     * @param metadata [dictionary object]: dictionary object used to store additional information about the Transfer object.
     * @param created [string]: creation datetime for the transfer. ex: '2020-03-10 10:30:00.000'
     * @param updated [string]: latest update datetime for the transfer. ex: '2020-03-10 10:30:00.000'
     *
     */
    constructor({
                    amount, name, taxId, bankCode, branchCode, accountNumber, accountType, 
                    externalId, scheduled, description, tags, rules, id, fee, status, 
                    transactionIds, metadata, created, updated
                }) {
        super(id);
        this.amount = amount;
        this.name = name;
        this.taxId = taxId;
        this.bankCode = bankCode;
        this.branchCode = branchCode;
        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.externalId = externalId;
        this.scheduled = scheduled;
        this.description = description;
        this.tags = tags;
        this.rules = parseObjects(rules, ruleResource, Rule);
        this.fee = fee;
        this.status = status;
        this.transactionIds = transactionIds;
        this.metadata = metadata;
        this.created = check.datetime(created);
        this.updated = check.datetime(updated);
    }
}

exports.Transfer = Transfer;
let resource = {'class': exports.Transfer, 'name': 'Transfer'};

exports.create = async function (transfers, {user} = {}) {
    /**
     *
     * Create Transfers
     *
     * @description Send a list of Transfer objects for creation in the Stark Bank API
     *
     * Parameters (required):
     * @param transfers [list of Transfer objects]: list of Transfer objects to be created in the API
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of Transfer objects with updated attributes
     *
     */
    return rest.post(resource, transfers, user);
};

exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific Transfer
     *
     * @description Receive a single Transfer object previously created in the Stark Bank API by passing its id
     *
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns Transfer object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
};

exports.delete = async function (id, { user } = {}) {
    /**
     *
     * Delete a Transfer entity
     *
     * @description Delete a Transfer entity previously created in the Stark Bank API
     *
     * Parameters (required):
     * @param id [string]: Transfer unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns deleted Transfer object
     *
     */
    return rest.deleteId(resource, id, user);
};

exports.pdf = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific Transfer pdf file
     *
     * @description Receive a single Transfer pdf receipt file generated in the Stark Bank API by passing its id.
     * Only valid for transfers with 'processing' and 'success' status.
     *
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns Transfer pdf file
     *
     */
    return rest.getPdf(resource, id, null, user);
};

exports.query = async function ({ limit, after, before, transactionIds, status, taxId, sort, tags, ids, user} = {}) {
    /**
     *
     * Retrieve Transfers
     *
     * @description Receive a generator of Transfer objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null]: date filter for objects created or updated only after specified date. ex: '2020-03-10'
     * @param before [string, default null]: date filter for objects created or updated only before specified date. ex: '2020-03-10'
     * @param transactionIds [list of strings, default null]: list of transaction IDs linked to the desired transfers. ex: ['5656565656565656', '4545454545454545']
     * @param status [string, default null]: filter for status of retrieved objects. ex: 'success' or 'failed'
     * @param taxId [string, default null]: filter for transfers sent to the specified tax ID.ex: '012.345.678-90'
     * @param sort [string, default '-created']: sort order considered in response. Valid options are 'created', '-created', 'updated' or '-updated'.
     * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns generator of Transfer objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        after: after,
        before: before,
        transactionIds: transactionIds,
        status: status,
        taxId: taxId,
        sort: sort,
        tags: tags,
        ids: ids
    };
    return rest.getList(resource, query, user);
};

exports.page = async function ({ cursor, limit, after, before, transactionIds, status, taxId, sort, tags, ids, user} = {}) {
    /**
     *
     * Retrieve paged Transfers
     *
     * @description Receive a list of up to 100 Transfer objects previously created in the Stark Bank API and the cursor to the next page.
     * Use this function instead of query if you want to manually page your requests.
     *
     * Parameters (optional):
     * @param cursor [string, default null]: cursor returned on the previous page function call
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null]: date filter for objects created or updated only after specified date. ex: '2020-03-10'
     * @param before [string, default null]: date filter for objects created or updated only before specified date. ex: '2020-03-10'
     * @param transactionIds [list of strings, default null]: list of transaction IDs linked to the desired transfers. ex: ['5656565656565656', '4545454545454545']
     * @param status [string, default null]: filter for status of retrieved objects. ex: 'success' or 'failed'
     * @param taxId [string, default null]: filter for transfers sent to the specified tax ID.ex: '012.345.678-90'
     * @param sort [string, default '-created']: sort order considered in response. Valid options are 'created', '-created', 'updated' or '-updated'.
     * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of Transfer objects with updated attributes and cursor to retrieve the next page of Transfer objects
     *
     */
    let query = {
        cursor: cursor,
        limit: limit,
        after: after,
        before: before,
        transactionIds: transactionIds,
        status: status,
        taxId: taxId,
        sort: sort,
        tags: tags,
        ids: ids
    };
    return rest.getPage(resource, query, user);
};
