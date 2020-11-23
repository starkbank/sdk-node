const rest = require('../utils/rest.js');
const check = require('../utils/check.js');
const Resource = require('../utils/resource.js').Resource


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
     * @param bankCode [string]: code of the receiver bank institution in Brazil. If an ISPB (8 digits) is informed, a PIX transfer will be created, else a TED will be issued. ex: '20018183' or '341'
     * @param branchCode [string]: receiver bank account branch. Use '-' in case there is a verifier digit. ex: '1357-9'
     * @param accountNumber [string]: Receiver Bank Account number. Use '-' before the verifier digit. ex: '876543-2'
     *
     * Parameters (optional):
     * @param tags [list of strings]: list of strings for reference when searching for transfers. ex: ['employees', 'monthly']
     * @param scheduled [string, default now]: date or datetime when the transfer will be processed. May be pushed to next business day if necessary. ex: '2020-11-12T00:14:22.806+00:00' or '2020-11-30'
     *
     * Attributes (return-only):
     * @param id [string, default null]: unique id returned when Transfer is created. ex: '5656565656565656'
     * @param fee [integer, default null]: fee charged when transfer is created. ex: 200 (= R$ 2.00)
     * @param status [string, default null]: current transfer status. ex: 'processing' or 'success'
     * @param transactionIds [list of strings, default null]: ledger transaction ids linked to this transfer (if there are two, second is the chargeback). ex: ['19827356981273']
     * @param created [string, default null]: creation datetime for the transfer. ex: '2020-03-10 10:30:00.000'
     * @param updated [string, default null]: latest update datetime for the transfer. ex: '2020-03-10 10:30:00.000'
     *
     */
    constructor({
                    amount, name, taxId, bankCode, branchCode, accountNumber, scheduled, tags, fee, status,
                    created, updated, transactionIds, id
                }) {
        super(id);
        this.amount = amount;
        this.name = name;
        this.taxId = taxId;
        this.bankCode = bankCode;
        this.branchCode = branchCode;
        this.accountNumber = accountNumber;
        this.scheduled = scheduled;
        this.tags = tags;
        this.fee = fee;
        this.status = status;
        this.created = created;
        this.updated = updated;
        this.transactionIds = transactionIds;
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
     * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
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
     * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
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
     * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
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
     * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns Transfer pdf file
     *
     */
    return rest.getPdf(resource, id, user);
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
