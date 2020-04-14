const rest = require('../../utils/rest.js');
const check = require('../../utils/check.js');


class BoletoLog {
    /**
     *
     * BoletoLog object
     *
     * Every time a Boleto entity is updated, a corresponding BoletoLog
     * is generated for the entity. This log is never generated by the
     * user, but it can be retrieved to check additional information
     * on the Boleto.
     *
     * Attributes:
     * id [string]: unique id returned when the log is created. ex: '5656565656565656'
     * boleto [Boleto]: Boleto entity to which the log refers to.
     * errors [list of strings]: list of errors linked to this Boleto event
     * type [string]: type of the Boleto event which triggered the log creation. ex: 'registered' or 'paid'
     * created [string]: creation datetime for the boleto. ex: '2020-03-10 10:30:00.000'
     *
     */
    constructor({created, type, errors, boleto, id}) {
        this.created = check.date(created);
        this.type = type;
        this.errors = errors;
        this.boleto = boleto;
        this.id = id;
    }
}

exports.BoletoLog = BoletoLog;
let resource = exports.BoletoLog;


exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific BoletoLog
     *
     * Receive a single BoletoLog object previously created by the Stark Bank API by passing its id
     *
     * Parameters (required):
     * id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * BoletoLog object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
};

exports.query = async function ({limit, status, tags, ids, after, before, user} = {}) {
    /**
     *
     * Retrieve BoletoLogs
     *
     * Receive a generator of BoletoLog objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * limit [integer, default None]: maximum number of objects to be retrieved. Unlimited if None. ex: 35
     * boleto_ids [list of strings, default None]: list of Boleto ids to filter logs. ex: ['5656565656565656', '4545454545454545']
     * types [list of strings, default None]: filter for log event types. ex: 'paid' or 'registered'
     * after [string, default None] date filter for objects created only after specified date. ex: '2020-03-10'
     * before [string, default None] date filter for objects only before specified date. ex: '2020-03-10'
     * user [Project object, default None]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * list of BoletoLog objects with updated attributes
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
