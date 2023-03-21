const rest = require('../utils/rest.js');
const check = require('../utils/check.js');
const Resource = require('../utils/resource.js').Resource


class UtilityPayment extends Resource {
    /**
     *
     * UtilityPayment object
     *
     * @description When you initialize a UtilityPayment, the entity will not be automatically
     * created in the Stark Bank API. The 'create' function sends the objects
     * to the Stark Bank API and returns the list of created objects.
     *
     * Parameters (conditionally required):
     * @param line [string, default null]: Number sequence that describes the payment. Either 'line' or 'barCode' parameters are required. If both are sent, they must match. ex: '34191.09008 63571.277308 71444.640008 5 81960000000062'
     * @param barCode [string, default null]: Bar code number that describes the payment. Either 'line' or 'barCode' parameters are required. If both are sent, they must match. ex: '34195819600000000621090063571277307144464000'
     *
     * Parameters (required):
     * @param description [string]: Text to be displayed in your statement (min. 10 characters). ex: 'payment ABC'
     *
     * Parameters (optional):
     * @param scheduled [string, default today]: payment scheduled date. ex: '2020-03-10'
     * @param tags [list of strings, default null]: list of strings for tagging
     *
     * Attributes (return-only):
     * @param id [string]: unique id returned when payment is created. ex: '5656565656565656'
     * @param status [string]: current payment status. ex: 'success' or 'failed'
     * @param amount [int]: amount automatically calculated from line or barCode. ex: 23456 (= R$ 234.56)
     * @param fee [integer]: fee charged when the utility payment is created. ex: 200 (= R$ 2.00)
     * @param type [string]: payment type. ex: "utility"
     * @param transactionIds [list of strings]: ledger transaction ids linked to this UtilityPayment. ex: ['19827356981273']
     * @param created [string]: creation datetime for the payment. ex: '2020-03-10 10:30:00.000'
     * @param updated [string]: latest update datetime for the payment. ex: '2020-03-10 10:30:00.000'
     */
    constructor({
                    description, scheduled, line, barCode,
                    tags, amount, status, transactionIds, created,
                    fee, type, id, updated
                }) {
        super(id);
        this.line = line;
        this.barCode = barCode;
        this.description = description;
        this.scheduled = check.date(scheduled);
        this.tags = tags;
        this.status = status;
        this.amount = amount;
        this.fee = fee;
        this.type = type;
        this.transactionIds = transactionIds;
        this.created = check.datetime(created);
        this.updated = check.datetime(updated);
    }
}

exports.UtilityPayment = UtilityPayment;
let resource = {'class': exports.UtilityPayment, 'name': 'UtilityPayment'};


exports.create = async function (payments, {user} = {}) {
    /**
     *
     * Create UtilityPayments
     *
     * @description Send a list of UtilityPayment objects for creation in the Stark Bank API
     *
     * Parameters (required):
     * @param payments [list of UtilityPayment objects]: list of UtilityPayment objects to be created in the API
     * @param Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     * 
     * Return:
     * @returns list of UtilityPayment objects with updated attributes
     *
     */
    return rest.post(resource, payments, user);
};

exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific UtilityPayment
     *
     * @description Receive a single UtilityPayment object previously created by the Stark Bank API by passing its id
     *
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @returns user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     */
    return rest.getId(resource, id, user);
};

exports.pdf = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific UtilityPayment pdf file
     *
     * @description Receive a single UtilityPayment pdf file generated in the Stark Bank API by passing its id.
     * Only valid for utility payments with 'success' status.
     *
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns UtilityPayment pdf file
     *
     */
    return rest.getPdf(resource, id, null, user);
};

exports.query = async function ({ limit, after, before, tags, ids, status, user} = {}) {
    /**
     *
     * Retrieve UtilityPayments
     *
     * @description Receive a generator of UtilityPayment objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param status [string, default null]: filter for status of retrieved objects. ex: 'success'
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns generator of UtilityPayment objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        after: after,
        before: before,
        tags: tags,
        ids: ids,
        status: status,
    };
    return rest.getList(resource, query, user);
};

exports.page = async function ({ cursor, limit, after, before, tags, ids, status, user} = {}) {
    /**
     *
     * Retrieve paged UtilityPayments
     *
     * @description Receive a list of up to 100 UtilityPayment objects previously created in the Stark Bank API and the cursor to the next page.
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
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of UtilityPayment objects with updated attributes and cursor to retrieve the next page of UtilityPayment objects
     *
     */
    let query = {
        cursor: cursor,
        limit: limit,
        after: after,
        before: before,
        tags: tags,
        ids: ids,
        status: status,
    };
    return rest.getPage(resource, query, user);
};

exports.delete = async function (id, {user} = {}) {
    /**
     *
     * Delete a UtilityPayment entity
     *
     * @description Delete a UtilityPayment entity previously created in the Stark Bank API
     *
     * Parameters (required):
     * @param id [string]: UtilityPayment unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns deleted UtilityPayment object
     *
     */
    return rest.deleteId(resource, id, user);
};
