const Ecdsa = require('@starkbank/ecdsa');
const rest = require('../../utils/rest.js');
const error = require('../../utils/error.js');

class Event {
    /**
     *
     * Webhook Event object
     *
     * An Event is the notification received from the subscription to the Webhook.
     * Events cannot be created, but may be retrieved from the Stark Bank API to
     * list all generated updates on entities.
     *
     * Attributes:
     * id [string]: unique id returned when the log is created. ex: '5656565656565656'
     * log [Log]: a Log object from one the subscription services (TransferLog, BoletoLog, BoletoPaymentlog or UtilityPaymentLog)
     * created [string]: creation datetime for the notification event. ex: '2020-03-10 10:30:00.000'
     * delivered [string]: delivery datetime when the notification was delivered to the user url. Will be None if no successful attempts to deliver the event occurred. ex: '2020-03-10 10:30:00.000'
     * subscription [string]: service that triggered this event. ex: 'transfer', 'utility-payment'
     *
     */
    constructor({created, delivered, subscription, log, id = null}) {
        this.log = log;
        this.created = created;
        this.delivered = delivered;
        this.subscription = subscription;
        this.id = id;
    }
}

exports.Event = Event;
let resource = exports.Event;

function verifySignature(content, signature, user = null, refresh = false) {
    signature = Ecdsa.Signature.fromBase64(signature);
    let publicKey = starkbank.cache['starkbank-public-key'];
    if (!publicKey || refresh) {
        let pem = rest.getPublicKey(user);
        publicKey = Ecdsa.PublicKey.fromPem(pem);
        starkbank.cache['starkbank-public-key'] = publicKey;
    }
    return Ecdsa.Ecdsa.verify(content, signature, publicKey);
}

exports.get = async function (id, user = null) {
    /**
     *
     * Retrieve a specific notification Event
     *
     * Receive a single notification Event object previously created in the Stark Bank API by passing its id
     *
     * Parameters (required):
     * id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * Event object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
};

exports.query = async function ({limit = null, status = null, tags = null, ids = null, after = null, before = null}, user = null) {
    /**
     *
     * Retrieve notification Events
     *
     * Receive a generator of notification Event objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * limit [integer, default None]: maximum number of objects to be retrieved. Unlimited if None. ex: 35
     * is_delivered [bool, default None]: bool to filter successfully delivered events. ex: True or False
     * after [string, default None]: date filter for objects created only after specified date. ex: '2020-03-10'
     * before [string, default None]: date filter for objects only before specified date. ex: '2020-03-10'
     * user [Project object, default None]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * generator of Event objects with updated attributes
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

exports.delete = async function (id, user = null) {
    /**
     *
     * Delete notification Events
     *
     * Delete a list of notification Event entities previously created in the Stark Bank API
     *
     * Parameters (required):
     * id [string]: Event unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * deleted Event with updated attributes
     *
     */
    return rest.deleteId(resource, id, user);
};

exports.update = function (id, {delivered: isDelivered}, user = null) {
    /**
     *
     * Set notification Event entity as delivered
     *
     * Set notification Event as delivered at the current timestamp (if it was not yet delivered) by passing id.
     * After this is set, the event will no longer be returned on queries with is_delivered=False.
     *
     * Parameters (required):
     * id [list of strings]: Event unique ids. ex: '5656565656565656'
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * target Event with updated attributes
     *
     */
    let payload = {
        isDelivered: isDelivered,
    };
    return rest.patchId(resource, id, payload, user);
};

exports.parse = async function ({content, signature}, user = null) {
    /**
     *
     * Create single notification Event from a content string
     *
     * Create a single Event object received from event listening at subscribed user endpoint.
     * If the provided digital signature does not check out with the StarkBank public key, a
     * starkbank.exception.InvalidSignatureException will be raised.
     *
     * Parameters (required):
     * content [string]: response content from request received at user endpoint (not parsed)
     * signature [string]: base-64 digital signature received at response header 'Digital-Signature'
     *
     * Parameters (optional):
     * user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * Event object with updated attributes
     *
     */

    let event = Object.assign(new Event({}), JSON.parse(content));
    if (verifySignature(content, signature, user)) {
        return event;
    }
    if (verifySignature(content, signature, user, true)) {
        return event;
    }
    throw new error.InvalidSignatureError('Provided signature and content do not match Stark Bank public key');
};