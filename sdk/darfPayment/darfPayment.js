const rest = require('../utils/rest');
const check = require('../utils/check');
const Resource = require('../utils/resource').Resource;

class DarfPayment extends Resource {

        /**
     *
     * DarfPayment object
     *
     * @description When you initialize a DarfPayment, the entity will not be automatically
     * created in the Stark Bank API. The 'create' function sends the objects
     * to the Stark Bank API and returns the list of created objects.
     * 
     * Parameters (required):
     * @param description [string]: Text to be displayed in your statement (min. 10 characters). ex: "payment ABC"
     * @param revenueCode [string]: 4-digit tax code assigned by Federal Revenue. ex: "5948"
     * @param taxId [string]: tax id (formatted or unformatted) of the payer. ex: "12.345.678/0001-95"
     * @param competence [string]: competence month of the service. ex: ex: '2020-03-10'
     * @param nominalAmount [int]: amount due in cents without fee or interest. ex: 23456 (= R$ 234.56)
     * @param fineAmount [int]: fixed amount due in cents for fines. ex: 234 (= R$ 2.34)
     * @param interestAmount [int]: amount due in cents for interest. ex: 456 (= R$ 4.56)
     * @param due [string]: due date for payment. ex: ex: '2020-03-10'
     *
     * Parameters (optional):
     * @param referenceNumber [string, default null]: number assigned to the region of the tax. ex: "08.1.17.00-4"
     * @param scheduled [string, default today]: payment scheduled date. ex: '2020-03-10'
     * @param tags [list of strings, default null]: list of strings for tagging
     *
     * Attributes (return-only):
     * @param id [string]: unique id returned when payment is created. ex: "5656565656565656"
     * @param status [string]: current payment status. ex: "success" or "failed"
     * @param amount [int]: Total amount due calculated from other amounts. ex: 24146 (= R$ 241.46)
     * @param fee [integer]: fee charged when the DarfPayment is processed. ex: 0 (= R$ 0.00)
     * @param transactionIds [list of strings]: ledger transaction ids linked to this DarfPayment. ex: ['19827356981273']
     * @param updated [string]: latest update datetime for the payment. ex: '2020-03-10 10:30:00.000'
     * @param created [string]: creation datetime for the payment. ex: '2020-03-10 10:30:00.000'
     *
     */
    constructor({
        revenueCode, taxId, competence, referenceNumber, fineAmount, interestAmount,
        due, description, tags, scheduled, status, amount, nominalAmount, fee, 
        transactionIds, updated, created, id
    }) {
        super(id);
        this.description = description;
        this.revenueCode = revenueCode;
        this.taxId = taxId;
        this.competence = check.date(competence);
        this.nominalAmount = nominalAmount;
        this.fineAmount = fineAmount;
        this.interestAmount = interestAmount;
        this.due = check.date(due);
        this.referenceNumber = referenceNumber;
        this.scheduled = check.date(scheduled);
        this.tags = tags;
        this.status = status;
        this.amount = amount;
        this.fee = fee;
        this.transactionIds = transactionIds;
        this.updated = check.datetime(updated);
        this.created = check.datetime(created);
    }
}

exports.DarfPayment = DarfPayment;
let resource = { 'class': exports.DarfPayment, 'name': 'DarfPayment' };


exports.create = async function (payments, { user } = {}) {
    /**
     *
     * Create DarfPayments
     *
     * @description Send a list of DarfPayment objects for creation in the Stark Bank API
     *
     * Parameters (required):
     * @param payments [list of DarfPayment objects]: list of DarfPayment objects to be created in the API
     * 
     * Parameters (optional):
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     * 
     * Return:
     * @returns list of DarfPayment objects with updated attributes
     *
     */
    return rest.post(resource, payments, user);
};

exports.get = async function (id, { user } = {}) {
    /**
     *
     * Retrieve a specific DarfPayment
     *
     * @description Receive a single DarfPayment object previously created by the Stark Bank API by passing its id
     *
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     */
    return rest.getId(resource, id, user);
};

exports.pdf = async function (id, { user } = {}) {
    /**
     *
     * Retrieve a specific DarfPayment pdf file
     *
     * @description Receive a single DarfPayment pdf file generated in the Stark Bank API by passing its id.
     * Only valid for tax payments with 'success' status.
     *
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns DarfPayment pdf file
     *
     */
    return rest.getPdf(resource, id, null, user);
};

exports.query = async function ({ limit, after, before, tags, ids, status, user } = {}) {
    /**
     *
     * Retrieve DarfPayments
     *
     * @description Receive a generator of DarfPayment objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param status [string, default null]: filter for status of retrieved objects. ex: 'success'
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns generator of DarfPayment objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        after: after,
        before: before,
        tags: tags,
        ids, ids,
        status: status,
    };
    return rest.getList(resource, query, user);
};

exports.page = async function ({ cursor, limit, after, before, tags, ids, status, user } = {}) {
    /**
     *
     * Retrieve paged DarfPayments
     *
     * @description Receive a list of up to 100 DarfPayment objects previously created in the Stark Bank API and the cursor to the next page.
     * Use this function instead of query if you want to manually page your requests.
     *
     * Parameters (optional):
     * @param cursor [string, default null]: cursor returned on the previous page function call
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param status [string, default null]: filter for status of retrieved objects. ex: 'success'
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of DarfPayment objects with updated attributes and cursor to retrieve the next page of DarfPayment objects
     *
     */
    let query = {
        cursor: cursor,
        limit: limit,
        after: after,
        before: before,
        tags: tags,
        ids, ids,
        status: status,
    };
    return rest.getPage(resource, query, user);
};

exports.delete = async function (id, { user } = {}) {
    /**
     *
     * Delete a DarfPayment entity
     *
     * @description Delete a DarfPayment entity previously created in the Stark Bank API
     *
     * Parameters (required):
     * @param id [string]: DarfPayment unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns deleted DarfPayment object
     *
     */
    return rest.deleteId(resource, id, user);
};
