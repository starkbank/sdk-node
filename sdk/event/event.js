const error = require('../error.js');
const rest = require('../utils/rest.js');
const check = require('starkcore').check;
const starkbank = require('../../index.js');
const Ellipticcurve = require('starkbank-ecdsa');
const Resource = require('starkcore').Resource;


class Event extends Resource {
    /**
     *
     * Webhook Event object
     *
     * @description An Event is the notification received from the subscription to the Webhook.
     * Events cannot be created, but may be retrieved from the Stark Bank API to
     * list all generated updates on entities.
     *
     * Attributes (return-only):
     * @param id [string]: unique id returned when the event is created. ex: '5656565656565656'
     * @param log [Log]: a Log object from one the subscription services (Transfer Log, Boleto Log, BoletoHolmes Log, BoletoPayment Log, BrcodePayment Log, Deposit Log, Invoice Log or UtilityPayment Log)
     * @param created [string]: creation datetime for the notification event. ex: '2020-03-10 10:30:00.000'
     * @param isDelivered [bool]: true if the event has been successfully delivered to the user url. ex: False
     * @param subscription [string]: service that triggered this event. ex: 'transfer', 'utility-payment'
     * @param workspaceId [string]: ID of the Workspace that generated this event. Mostly used when multiple Workspaces have Webhooks registered to the same endpoint. ex: '4545454545454545'
     *
     */
    constructor({created, isDelivered, subscription, log, id, workspaceId} = {}) {
        super(id);
        this.log = log;
        this.created = check.datetime(created);
        this.isDelivered = isDelivered;
        this.subscription = subscription;
        this.workspaceId = workspaceId;
    }
}

exports.Event = Event;
let resource = {'class': exports.Event, 'name': 'Event'};

async function verifySignature(content, signature, user = starkBank.user, refresh = false) {
    let publicKey = starkbank.cache['starkbank-public-key'];
    if (!publicKey || refresh) {
        let pem = await rest.getPublicKey(user);
        publicKey = Ellipticcurve.PublicKey.fromPem(pem);
        starkbank.cache['starkbank-public-key'] = publicKey;
    }
    return Ellipticcurve.Ecdsa.verify(content, signature, publicKey);
}

exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific notification Event
     *
     * @description Receive a single notification Event object previously created in the Stark Bank API by passing its id
     *
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns Event object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
};

exports.query = async function ({limit, after, before, isDelivered, user} = {}) {
    /**
     *
     * Retrieve notification Events
     *
     * @description Receive a generator of notification Event objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null]: date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null]: date filter for objects created only before specified date. ex: '2020-03-10'
     * @param isDelivered [bool, default null]: bool to filter successfully delivered events. ex: true or false
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns generator of Event objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        after: after,
        before: before,
        isDelivered: check.queryBool(isDelivered),
    };
    return rest.getList(resource, query, user);
};

exports.page = async function ({ cursor, limit, after, before, isDelivered, user } = {} ) {
    /**
     *
     * Retrieve notification Events
     *
     * @description Receive a list of up to 100 Event objects previously created in the Stark Bank API and the cursor to the next page.
     * Use this function instead of query if you want to manually page your requests.
     *
     * Parameters (optional):
     * @param cursor [string, default null]: cursor returned on the previous page function call
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null]: date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null]: date filter for objects created only before specified date. ex: '2020-03-10'
     * @param isDelivered [bool, default null]: bool to filter successfully delivered events. ex: true or false
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of Event objects with updated attributes and cursor to retrieve the next page of Event objects
     *
     */
    let query = {
        cursor: cursor,
        limit: limit,
        after: after,
        before: before,
        isDelivered: check.queryBool(isDelivered),
    };
    return rest.getPage(resource, query, user);
};

exports.delete = async function (id, {user} = {}) {
    /**
     *
     * Delete notification Events
     *
     * @description Delete a list of notification Event entities previously created in the Stark Bank API
     *
     * Parameters (required):
     * @param id [string]: Event unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns deleted Event object
     *
     */
    return rest.deleteId(resource, id, user);
};

exports.update = async function (id, {isDelivered, user} = {}) {
    /**
     *
     * Set notification Event entity as delivered
     *
     * @description Set notification Event as delivered at the current timestamp (if it was not yet delivered) by passing id.
     * After this is set, the event will no longer be returned on queries with isDelivered=false.
     *
     * Parameters (required):
     * @param id [list of strings]: Event unique ids. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns target Event with updated attributes
     *
     */
    let payload = {
        isDelivered: isDelivered,
    };
    return rest.patchId(resource, id, payload, user);
};

exports.parse = async function ({content, signature, user} = {}) {
    /**
     *
     * Create single notification Event from a content string
     *
     * @description Create a single Event object received from event listening at subscribed user endpoint.
     * If the provided digital signature does not check out with the StarkBank public key, a
     * starkbank.exception.InvalidSignatureException will be raised.
     *
     * Parameters (required):
     * @param content [string]: response content from request received at user endpoint (not parsed)
     * @param signature [string]: base-64 digital signature received at response header 'Digital-Signature'
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns Event object with updated attributes
     *
     */

    let event = Object.assign(new Event(), JSON.parse(content)['event']);

    try {
        signature = Ellipticcurve.Signature.fromBase64(signature);
    } catch (e) {
        throw new error.InvalidSignatureError('The provided signature is not valid');
    }

    if (await verifySignature(content, signature, user)) {
        return event;
    }
    if (await verifySignature(content, signature, user, true)) {
        return event;
    }
    throw new error.InvalidSignatureError('Provided signature and content do not match Stark Bank public key');
};
