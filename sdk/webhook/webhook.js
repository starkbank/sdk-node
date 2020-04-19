const rest = require('../utils/rest.js');
const Resource = require('../utils/resource.js').Resource


class Webhook extends Resource {
    /**
     *
     * Webhook subscription object
     *
     * A Webhook is used to subscribe to notification events on a user-selected endpoint.
     * Currently available services for subscription are transfer, boleto, boleto-payment,
     * and utility-payment
     *
     * Parameters (required):
     * url [string]: Url that will be notified when an event occurs.
     * subscriptions [list of strings]: list of any non-empty combination of the available services. ex: ['transfer', 'boleto-payment']
     * Attributes:
     * id [string, default null]: unique id returned when the log is created. ex: '5656565656565656'
     *
     */
    constructor({url, subscriptions, id}) {
        super(id);
        this.url = url;
        this.subscriptions = subscriptions;
    }
}

exports.Webhook = Webhook;
let resource = {'class': exports.Webhook, 'name': 'Webhook'};

exports.create = async function ({url, subscriptions, user} = {}) {
    /**
     *
     * Create Webhook subscription
     *
     * Send a single Webhook subscription for creation in the Stark Bank API
     *
     * Parameters (required):
     * url [string]: url to which notification events will be sent to. ex: 'https://webhook.site/60e9c18e-4b5c-4369-bda1-ab5fcd8e1b29'
     * subscriptions [list of strings]: list of any non-empty combination of the available services. ex: ['transfer', 'boleto-payment']
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * Webhook object with updated attributes
     *
     */
    let options = {url, subscriptions};

    return rest.postSingle(resource, options, user);
};

exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific Webhook subscription
     *
     * Receive a single Webhook subscription object previously created in the Stark Bank API by passing its id
     *
     * Parameters (required):
     * id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * Webhook object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
};

exports.query = async function ({limit, user} = {}) {
    /**
     *
     * Retrieve Webhook subcriptions
     *
     * Receive a generator of Webhook subcription objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * generator of Webhook objects with updated attributes
     *
     */
    let query = {limit};

    return rest.getList(resource, query, user);
};

exports.delete = async function (id, {user} = {}) {
    /**
     *
     * Delete a Webhook subscription entity
     *
     * Delete a Webhook subscription entity previously created in the Stark Bank API
     *
     * Parameters (required):
     * id [string]: Webhook unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * deleted Webhook with updated attributes
     *
     */
    return rest.deleteId(resource, id, user);
};