const rest = require('../utils/rest.js');
const check = require('starkcore').check;
const Resource = require('starkcore').Resource;

class MerchantInstallment extends Resource {
    /**
     *
     * MerchantInstallment object
     *
     * @description Created for every installment in a purchase; tracks its own due date and settlement lifecycle.
     *
     * Attributes (return-only):
     * @param amount [integer]: installment amount in cents.
     * @param fee [integer]: fee charged in cents.
     * @param fundingType [string]: Options: 'credit', 'debit'
     * @param network [string]: card network.
     * @param purchaseId [string]: id of the MerchantPurchase linked to the installment.
     * @param status [string]: Options: 'created', 'paid', 'canceled', 'voided'
     * @param transactionIds [list of strings]: ledger transaction ids linked to this installment.
     * @param tags [list of strings]
     * @param due [string]: expected settlement date.
     * @param created, updated [string]
     *
     */

    constructor({
        amount, fee, fundingType, network, purchaseId, status, transactionIds, tags,  due, created, updated
    }) {
        super();
        this.amount = amount;
        this.fee = fee;
        this.fundingType = fundingType;
        this.network = network;
        this.purchaseId = purchaseId;
        this.status = status;
        this.transactionIds = transactionIds;
        this.tags = tags;
        this.due = check.datetime(due);
        this.created = check.datetime(created);
        this.updated = check.datetime(updated);
    }
}

exports.MerchantInstallment = MerchantInstallment;
let resource = {'class': exports.MerchantInstallment, 'name': 'MerchantInstallment'};

exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific MerchantInstallment
     *
     * @description Receive a single MerchantInstallment object previously created in the Stark Bank API by passing its id
     *
     * Parameters (required):
     * @param id [string]: object unique id.
     *
     * Parameters (optional):
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns MerchantInstallment object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
}

exports.query = async function ({limit, after, before, status, purchaseIds, tags, ids, user} = {}) {
    /**
     *
     * Retrieve MerchantInstallments
     *
     * @description Receive a generator of MerchantInstallment objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null.
     * @param after [string, default null]: date filter for objects created only after specified date.
     * @param before [string, default null]: date filter for objects created only before specified date.
     * @param status [string, default null]: filter for status of retrieved objects. Options: 'created', 'paid', 'canceled', 'voided'
     * @param purchaseIds [list of strings, default null]: list of MerchantPurchase ids to filter installments.
     * @param tags [list of strings, default null]: tags to filter retrieved objects.
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects.
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns generator of MerchantInstallment objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        after: check.date(after),
        before: check.date(before),
        status: status,
        tags: tags,
        ids: ids,
        purchaseIds: purchaseIds,
    };
    return rest.getList(resource, query, user);
}

exports.page = async function ({cursor, limit, after, before, status, purchaseIds, tags, ids, user} = {}) {
    /**
     *
     * Retrieve paged MerchantInstallments
     *
     * @description Receive a list of up to 100 MerchantInstallment objects previously created in the Stark Bank API and the cursor to the next page. Use this function instead of query if you want to manually page your requests.
     *
     * Parameters (optional):
     * @param cursor [string, default null]: cursor returned on the previous page function call
     * @param limit, after, before, status, purchaseIds, tags, ids, user: same as query()
     *
     * Return:
     * @returns list of MerchantInstallment objects with updated attributes and cursor to retrieve the next page
     *
     */
    let query = {
        cursor: cursor,
        limit: limit,
        after: check.date(after),
        before: check.date(before),
        status: status,
        tags: tags,
        ids: ids,
        purchaseIds: purchaseIds,
    };
    return rest.getPage(resource, query, user);
}
