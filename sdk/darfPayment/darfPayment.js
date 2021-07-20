const rest = require('../utils/rest');
const check = require('../utils/check');
const Resource = require('../utils/resource').Resource;

class DarfPayment extends Resource {

    constructor({
        revenueCode, taxId, competence, referenceNumber, fineAmount, interestAmount,
        due, description, tags, scheduled, status, amount, nominalAmount, id
    }) {
        super(id);
        this.revenueCode = revenueCode;
        this.taxId = taxId;
        this.competence = check.date(competence);
        this.referenceNumber = referenceNumber;
        this.fineAmount = fineAmount;
        this.interestAmount = interestAmount;
        this.due = check.date(due);
        this.description = description;
        this.tags = tags;
        this.scheduled = check.date(scheduled);
        this.status = status;
        this.amount = amount;
        this.nominalAmount = nominalAmount;
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
    return rest.getPdf(resource, id, user);
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
