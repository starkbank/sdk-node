const rest = require('../utils/rest.js');
const check = require('../utils/check.js');
const Resource = require('../utils/resource.js').Resource


class BoletoPayment extends Resource {
    /**
     *
     * BoletoPayment object
     *
     * When you initialize a BoletoPayment, the entity will not be automatically
     * created in the Stark Bank API. The 'create' function sends the objects
     * to the Stark Bank API and returns the list of created objects.
     *
     * Parameters (conditionally required):
     * line [string, default null]: Number sequence that describes the payment. Either 'line' or 'bar_code' parameters are required. If both are sent, they must match. ex: '34191.09008 63571.277308 71444.640008 5 81960000000062'
     * barCode [string, default null]: Bar code number that describes the payment. Either 'line' or 'barCode' parameters are required. If both are sent, they must match. ex: '34195819600000000621090063571277307144464000'
     *
     * Parameters (required):
     * taxId [string]: receiver tax ID (CPF or CNPJ) with or without formatting. ex: '01234567890' or '20.018.183/0001-80'
     * description [string]: Text to be displayed in your statement (min. 10 characters). ex: 'payment ABC'
     *
     * Parameters (optional):
     * scheduled [string, default today]: payment scheduled date. ex: '2020-03-10'
     * tags [list of strings]: list of strings for tagging
     *
     * Attributes (return-only):
     * id [string, default null]: unique id returned when payment is created. ex: '5656565656565656'
     * status [string, default null]: current payment status. ex: 'registered' or 'paid'
     * amount [int, default null]: amount automatically calculated from line or bar_code. ex: 23456 (= R$ 234.56)
     * fee [integer, default null]: fee charged when boleto payment is created. ex: 200 (= R$ 2.00)
     * created [string, default null]: creation datetime for the payment. ex: '2020-03-10 10:30:00.000'
     *
     */
    constructor({ taxId, description, scheduled, line, barCode, tags, id, status, amount, fee, created }) {
        super(id);
        this.taxId = taxId;
        this.description = description;
        this.line = line;
        this.barCode = barCode;
        this.scheduled = check.date(scheduled);
        this.tags = tags;
        this.status = status;
        this.amount = amount;
        this.fee = fee;
        this.created = created;
    }
}

exports.BoletoPayment = BoletoPayment;
let resource = {'class': exports.BoletoPayment, 'name': 'BoletoPayment'};

exports.create = async function (payments, {user} = {}) {
    /**
     *
     * Create BoletoPayments
     *
     * Send a list of BoletoPayment objects for creation in the Stark Bank API
     *
     * Parameters (required):
     * payments [list of BoletoPayment objects]: list of BoletoPayment objects to be created in the API
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * list of BoletoPayment objects with updated attributes
     *
     */
    return rest.post(resource, payments, user);
};

exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific BoletoPayment
     *
     * Receive a single BoletoPayment object previously created by the Stark Bank API by passing its id
     *
     * Parameters (required):
     * id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * BoletoPayment object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
};

exports.pdf = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific BoletoPayment pdf file
     *
     * Receive a single BoletoPayment pdf file generated in the Stark Bank API by passing its id.
     * Only valid for boleto payments with 'success' status.
     *
     * Parameters (required):
     * id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * BoletoPayment pdf file
     *
     */
    return rest.getPdf(resource, id, user);
};

exports.query = async function ({ limit, after, before, tags, ids, status, user} = {}) {
    /**
     *
     * Retrieve BoletoPayments
     *
     * Receive a generator of BoletoPayment objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * before [string, default null] date filter for objects only before specified date. ex: '2020-03-10'
     * tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * status [string, default null]: filter for status of retrieved objects. ex: 'paid'
     * user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * generator of BoletoPayment objects with updated attributes
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

exports.delete = async function (id, {user} = {}) {
    /**
     *
     * Delete a BoletoPayment entity
     *
     * Delete a BoletoPayment entity previously created in the Stark Bank API
     *
     * Parameters (required):
     * id [string]: BoletoPayment unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * deleted BoletoPayment with updated attributes
     *
     */
    return rest.deleteId(resource, id, user);
};