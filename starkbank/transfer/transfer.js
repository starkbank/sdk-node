const rest = require('../utils/rest.js');
const check = require('../utils/check.js');

class Transfer {
    /**
     *
     * Transfer object
     *
     * When you initialize a Transfer, the entity will not be automatically
     * created in the Stark Bank API. The 'create' function sends the objects
     * to the Stark Bank API and returns the list of created objects.
     *
     * Parameters (required):
     * amount [integer]: amount in cents to be transferred. ex: 1234 (= R$ 12.34)
     * name [string]: receiver full name. ex: 'Anthony Edward Stark'
     * tax_id [string]: receiver tax ID (CPF or CNPJ) with or without formatting. ex: '01234567890' or '20.018.183/0001-80'
     * bank_code [string]: receiver 1 to 3 digits of the bank institution in Brazil. ex: '200' or '341'
     * branch_code [string]: receiver bank account branch. Use '-' in case there is a verifier digit. ex: '1357-9'
     * account_number [string]: Receiver Bank Account number. Use '-' before the verifier digit. ex: '876543-2'
     *
     * Parameters (optional):
     * tags [list of strings]: list of strings for reference when searching for transfers. ex: ['employees', 'monthly']
     *
     * Attributes (return-only):
     * id [string, default None]: unique id returned when Transfer is created. ex: '5656565656565656'
     * fee [integer, default None]: fee charged when transfer is created. ex: 200 (= R$ 2.00)
     * status [string, default None]: current boleto status. ex: 'registered' or 'paid'
     * transaction_ids [list of strings, default None]: ledger transaction ids linked to this transfer (if there are two, second is the chargeback). ex: ['19827356981273']
     * created [string, default None]: creation datetime for the transfer. ex: '2020-03-10 10:30:00.000'
     * updated [string, default None]: latest update datetime for the transfer. ex: '2020-03-10 10:30:00.000'
     *
     */
    constructor({
                    amount, name, taxId, bankCode, branchCode, accountNumber, tags = null,
                    fee = null, status = null, created = null, updated = null,
                    transactionIds = null, id = null
                }) {
        this.amount = amount;
        this.name = name;
        this.taxId = taxId;
        this.bankCode = bankCode;
        this.branchCode = branchCode;
        this.accountNumber = accountNumber;
        this.tags = tags;
        this.fee = fee;
        this.status = status;
        this.created = created;
        this.updated = updated;
        this.transactionIds = transactionIds;
        this.id = id;
    }
}

exports.Transfer = Transfer;
let resource = exports.Transfer;

exports.create = async function (transfers, user = null) {
    /**
     *
     * Create Transfers
     *
     * Send a list of Transfer objects for creation in the Stark Bank API
     *
     * Parameters (required):
     * transfers [list of Transfer objects]: list of Transfer objects to be created in the API
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * list of Transfer objects with updated attributes
     *
     */
    return rest.post(resource, transfers, user);
};

exports.get = async function (id, user = null) {
    /**
     *
     * Retrieve a specific Transfer
     *
     * Receive a single Transfer object previously created in the Stark Bank API by passing its id
     *
     * Parameters (required):
     * id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * Transfer object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
};

exports.pdf = async function (id, user = null) {
    /**
     *
     * Retrieve a specific Transfer pdf file
     *
     * Receive a single Transfer pdf receipt file generated in the Stark Bank API by passing its id.
     * Only valid for transfers with 'processing' and 'success' status.
     *
     * Parameters (required):
     * id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * Transfer pdf file
     *
     */
    return rest.getPdf(resource, id, user);
};

exports.query = async function ({
                                    limit = null, status = null, tags = null, transactionIds = null,
                                    after = null, before = null, sort = null
                                }, user = null) {
    /**
     *
     * Retrieve Transfers
     *
     * Receive a generator of Transfer objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * limit [integer, default None]: maximum number of objects to be retrieved. Unlimited if None. ex: 35
     * status [string, default None]: filter for status of retrieved objects. ex: 'paid' or 'registered'
     * tags [list of strings, default None]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * transaction_ids [list of strings, default None]: list of Transaction ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * after [string, default None]: date filter for objects created only after specified date. ex: '2020-03-10'
     * before [string, default None]: date filter for objects only before specified date. ex: '2020-03-10'
     * sort [string, default '-created']: sort order considered in response. Valid options are 'created', '-created', 'updated' or '-updated'.
     * user [Project object, default None]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * generator of Transfer objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        status: status,
        tags: tags,
        transactionIds: transactionIds,
        after: after,
        before: before,
    };
    return rest.getList(resource, query, user);
};
