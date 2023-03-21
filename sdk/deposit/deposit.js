const rest = require('../utils/rest.js');
const check = require('../utils/check.js');
const Resource = require('../utils/resource.js').Resource;


class Deposit extends Resource {
    /**
     * 
     * Deposit object
     * 
     * @description Deposits represent passive cash-in received by your account from external transfers
     * 
     * Parameters (return-only):
     * @param id [string]: unique id associated with a Deposit when it is created. ex: '5656565656565656'
     * @param name [string]: payer name. ex: 'Iron Bank S.A.'
     * @param taxId [string]: payer tax ID (CPF or CNPJ). ex: '012.345.678-90' or '20.018.183/0001-80'
     * @param bankCode [string]: payer bank code in Brazil. ex: '20018183' or '341'
     * @param branchCode [string]: payer bank account branch. ex: '1357-9'
     * @param accountNumber [string]: payer bank account number. ex: '876543-2'
     * @param accountType [string]: payer bank account type. ex: 'checking'
     * @param amount [integer]: Deposit value in cents. ex: 1234 (= R$ 12.34)
     * @param type [string]: type of settlement that originated the deposit. ex: 'pix' or 'ted'
     * @param status [string]: current Deposit status. ex: 'created'
     * @param tags [list of strings]: list of strings that are tagging the deposit. ex: ['reconciliationId', 'taxId']
     * @param fee [integer]: fee charged when a deposit is created. ex: 50 (= R$ 0.50)
     * @param transactionIds [list of strings]: ledger transaction ids linked to this deposit (if there are more than one, all but first are reversals). ex: ['19827356981273']
     * @param created [string]: creation datetime for the Deposit. ex: '2020-03-10 10:30:00.000'
     * @param updated [string]: latest update datetime for the Deposit. ex: '2020-03-10 10:30:00.000'
     */
    constructor({
                    id, name, taxId, bankCode, branchCode, accountNumber, accountType, amount,
                    type, status, tags, fee, transactionIds, created, updated
                }) {
        super(id);
        this.name = name;
        this.taxId = taxId;
        this.bankCode = bankCode;
        this.branchCode = branchCode;
        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.amount = amount;
        this.type = type;
        this.status = status;
        this.tags = tags;
        this.fee = fee;
        this.transactionIds = transactionIds;
        this.created = check.datetime(created);
        this.updated = check.datetime(updated);
    }
}

exports.Deposit = Deposit;
let resource = {'class': exports.Deposit, 'name': 'Deposit'};

exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific Deposit
     *
     * @description Receive a single Deposit object previously created in the Stark Bank API by passing its id
     *
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     * 
     * Parameters (optional):
     * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     * 
     * Return:
     * @returns Deposit object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
};
  
exports.query = async function ({ limit, after, before, status, sort, tags, ids, user} = {}) {
    /**
     *
     * Retrieve Deposits
     *
     * @description Receive a generator of Deposit objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param status [string, default null]: filter for status of retrieved objects. ex: 'created'
     * @param sort [string, default '-created']: sort order considered in response. Valid options are 'created' or '-created'.
     * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns generator of Deposit objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        after: after,
        before: before,
        status: status,
        sort: sort,
        tags: tags,
        ids: ids,
    };
    return rest.getList(resource, query, user);
};

exports.page = async function ({ cursor, limit, after, before, status, sort, tags, ids, user} = {}) {
    /**
     *
     * Retrieve paged Deposits
     *
     * @description Receive a list of up to 100 Deposit objects previously created in the Stark Bank API and the cursor to the next page.
     * Use this function instead of query if you want to manually page your requests.
     *
     * Parameters (optional):
     * @param cursor [string, default null]: cursor returned on the previous page function call
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param status [string, default null]: filter for status of retrieved objects. ex: 'created'
     * @param sort [string, default '-created']: sort order considered in response. Valid options are 'created' or '-created'.
     * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of Deposit objects with updated attributes and cursor to retrieve the next page of Deposit objects
     *
     */
    let query = {
        cursor: cursor,
        limit: limit,
        after: after,
        before: before,
        status: status,
        sort: sort,
        tags: tags,
        ids: ids,
    };
    return rest.getPage(resource, query, user);
};
