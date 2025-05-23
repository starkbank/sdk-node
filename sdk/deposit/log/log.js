const rest = require('../../utils/rest.js');
const check = require('starkcore').check;
const Resource = require('../../utils/resource.js').Resource;


class Log extends Resource {
    /**
     *
     * Deposit Log object
     *
     * @description Every time a Deposit entity is updated, a corresponding Deposit Log
     * is generated for the entity. This log is never generated by the
     * user, but it can be retrieved to check additional information
     * on the Deposit.
     *
     * Attributes:
     * @param id [string]: unique id returned when the log is created. ex: '5656565656565656'
     * @param deposit [Deposit]: Deposit entity to which the log refers to.
     * @param errors [list of strings]: list of errors linked to this Deposit event
     * @param type [string]: type of the Deposit event which triggered the log creation. ex: 'created'
     * @param created [string]: creation datetime for the log. ex: '2020-03-10 10:30:00.000'
     *
     */
    constructor({ created, type, errors, deposit, id }) {
        super(id);
        this.created = check.datetime(created);
        this.type = type;
        this.errors = errors;
        this.deposit = deposit;
    }
}

exports.Log = Log;
let resource = {'class': exports.Log, 'name': 'DepositLog'};


exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific Deposit Log
     *
     * @description Receive a single Deposit Log object previously created by the Stark Bank API by passing its id
     *
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns Deposit Log object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
};

exports.query = async function ({ limit, after, before, types, depositIds, user} = {}) {
    /**
     *
     * Retrieve Deposit Logs
     *
     * @description Receive a generator of Deposit Log objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param types [list of strings, default null]: filter for log event types. ex: 'created'
     * @param depositIds [list of strings, default null]: list of Deposit ids to filter logs. ex: ['5656565656565656', '4545454545454545']
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of Deposit Log objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        after: after,
        before: before,
        types: types,
        depositIds: depositIds,
    };
    return rest.getList(resource, query, user);
};


exports.page = async function ({ cursor, limit, after, before, types, depositIds, user} = {}) {
    /**
     *
     * Retrieve paged Deposit Logs
     *
     * @description Receive a list of up to 100 Deposit.Log objects previously created in the Stark Bank API and the cursor to the next page.
     * Use this function instead of query if you want to manually page your requests.
     *
     * Parameters (optional):
     * @param cursor [string, default null]: cursor returned on the previous page function call
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param types [list of strings, default null]: filter for log event types. ex: 'created'
     * @param depositIds [list of strings, default null]: list of Deposit ids to filter logs. ex: ['5656565656565656', '4545454545454545']
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of Deposit Log objects with updated attributes and cursor to retrieve the next page of Deposit.Log objects
     *
     */
    let query = {
        cursor: cursor,
        limit: limit,
        after: after,
        before: before,
        types: types,
        depositIds: depositIds,
    };
    return rest.getPage(resource, query, user);
};

exports.pdf = async function (id, {user} = {}) {
  /**
   *
   * Retrieve a specific reversal receipt pdf file
   *
   * @description Whenever a Deposit is successfully reversed, a reversed log will be created. To retrieve a specific reversal receipt, you can request the corresponding log PDF.
   *
   * Parameters (required):
   * @param id [string]: object unique id. ex: '5656565656565656'
   *
   * Parameters (optional):

   * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
   *
   * Return:
   * @returns Reversed deposit log pdf file
   *
   */
  return rest.getContent(resource, id, user, null, 'pdf');
};