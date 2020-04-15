const rest = require('../utils/rest.js');
const check = require('../utils/check.js');


class UtilityPayment {
    /**
     *
     * UtilityPayment object
     *
     * When you initialize a UtilityPayment, the entity will not be automatically
     * created in the Stark Bank API. The 'create' function sends the objects
     * to the Stark Bank API and returns the list of created objects.
     *
     * Parameters (conditionally required):
     * line [string, default None]: Number sequence that describes the payment. Either 'line' or 'bar_code' parameters are required. If both are sent, they must match. ex: '34191.09008 63571.277308 71444.640008 5 81960000000062'
     * bar_code [string, default None]: Bar code number that describes the payment. Either 'line' or 'barCode' parameters are required. If both are sent, they must match. ex: '34195819600000000621090063571277307144464000'
     *
     * Parameters (required):
     * description [string]: Text to be displayed in your statement (min. 10 characters). ex: 'payment ABC'
     *
     * Parameters (optional):
     * scheduled [string, default today]: payment scheduled date. ex: '2020-03-10'
     * tags [list of strings]: list of strings for tagging
     *
     * Attributes (return-only):
     * id [string, default None]: unique id returned when payment is created. ex: '5656565656565656'
     * status [string, default None]: current payment status. ex: 'registered' or 'paid'
     * amount [int, default None]: amount automatically calculated from line or bar_code. ex: 23456 (= R$ 234.56)
     * fee [integer, default None]: fee charged when utility payment is created. ex: 200 (= R$ 2.00)
     * created [string, default None]: creation datetime for the payment. ex: '2020-03-10 10:30:00.000'
     *
     */
    constructor({
                    description, scheduled, line, barCode,
                    tags, amount, status, created,
                    fee, id,
                }) {
        this.barCode = barCode;
        this.line = line;
        this.description = description;
        this.scheduled = check.date(scheduled);
        this.tags = tags;
        this.amount = amount;
        this.status = status;
        this.created = created;
        this.status = status;
        this.amount = amount;
        this.fee = fee;
        this.id = id;
    }
}

exports.UtilityPayment = UtilityPayment;
let resource = {'class': exports.UtilityPayment, 'name': 'UtilityPayment'};


exports.create = async function (payments, {user} = {}) {
    /**
     *
     * Create UtilityPayments
     *
     * Send a list of UtilityPayment objects for creation in the Stark Bank API
     *
     * Parameters (required):
     * payments [list of UtilityPayment objects]: list of UtilityPayment objects to be created in the API
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     * Return:
     * list of UtilityPayment objects with updated attributes
     *
     */
    return rest.post(resource, payments, user);
};

exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific UtilityPayment
     *
     * Receive a single UtilityPayment object previously created by the Stark Bank API by passing its id
     *
     * Parameters (required):
     * id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     */
    return rest.getId(resource, id, user);
};

exports.pdf = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific UtilityPayment pdf file
     *
     * Receive a single UtilityPayment pdf file generated in the Stark Bank API by passing its id.
     * Only valid for utility payments with 'success' status.
     *
     * Parameters (required):
     * id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * UtilityPayment pdf file
     *
     */
    return rest.getPdf(resource, id, user);
};

exports.query = async function ({limit, status, tags, ids, after, before, user} = {}) {
    /**
     *
     * Retrieve UtilityPayments
     *
     * Receive a generator of UtilityPayment objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * limit [integer, default None]: maximum number of objects to be retrieved. Unlimited if None. ex: 35
     * status [string, default None]: filter for status of retrieved objects. ex: 'paid'
     * tags [list of strings, default None]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * ids [list of strings, default None]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * user [Project object, default None]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * generator of UtilityPayment objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        status: status,
        tags: tags,
        ids: ids,
        after: after,
        before: before,
    };
    return rest.getList(resource, query, user);
};

exports.delete = async function (id, {user} = {}) {
    /**
     *
     * Delete a UtilityPayment entity
     *
     * Delete a UtilityPayment entity previously created in the Stark Bank API
     *
     * Parameters (required):
     * id [string]: UtilityPayment unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * deleted UtilityPayment with updated attributes
     *
     */
    return rest.deleteId(resource, id, user);
};