const check = require('starkcore').check;
const Resource = require('starkcore').Resource;
const rest = require('../utils/rest.js');
const api = require('starkcore').api;
const { AllowedInstallment } = require('./allowedInstallments/allowedInstallments.js');
const allowedInstallmentResource = require('./allowedInstallments/allowedInstallments.js').resource;
const purchaseResource = require('./purchase.js').resource;
const parseObjects = require('../utils/parse.js').parseObjects;

class MerchantSession extends Resource {
    /**
     * Check out our API Documentation at https://starkbank.com/docs/api#merchant-session
     */

    constructor({
        allowedFundingTypes, allowedInstallments, expiration, allowedIps=null, challengeMode=null, created=null, 
        status=null, tags=null, updated=null, uuid=null, softDescriptor=null, id=null, holderId=null
    }) {
        super(id) 
        this.allowedFundingTypes = allowedFundingTypes;
        this.allowedInstallments = parseObjects(allowedInstallments, allowedInstallmentResource, AllowedInstallment);
        this.allowedIps = allowedIps;
        this.challengeMode = challengeMode;
        this.created = created;
        this.expiration = expiration;
        this.holderId = holderId;
        this.status = status;
        this.tags = tags;
        this.updated = updated;
        this.uuid = uuid;
        this.softDescriptor = softDescriptor;
    }
}

exports.MerchantSession = MerchantSession;
let resource = {'class': exports.MerchantSession, 'name': 'MerchantSession'};

exports.create = async function (merchantSession, {user} = {}) {
    /**
     *
     * Create MerchantSessions
     *
     * @description Create a session the card holder's application can use to create a new Purchase (via purchase()). The session's uuid must be used for that call; after 'expiration' seconds, it can no longer be used.
     *
     * Parameters (required):
     * @param allowedFundingTypes [list of strings]: 'credit' and/or 'debit'
     * @param allowedInstallments [list of dictionaries]: allowed amount/installment-count combinations.
     * @param expiration [integer]: seconds from creation until the session expires. ex: 3600 (1 hour)
     *
     * Parameters (optional):
     * @param allowedIps [list of strings, default null]: IPs allowed to create a purchase with this session.
     * @param challengeMode [string, default 'enabled']: whether 3DS holder verification is required. Options: 'enabled', 'disabled'
     * @param tags [list of strings, default null]
     *
     * Return:
     * @returns list of MerchantSession objects with updated attributes (including uuid)
     *
     */
    return rest.postSingle(resource=resource, query=merchantSession, user=user)
}

exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific MerchantSession
     *
     * @description Receive a single MerchantSession object previously created in the Stark Bank API by passing its id
     *
     * Parameters (required):
     * @param id [string]: object unique id.
     *
     * Parameters (optional):
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns MerchantSession object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
};

exports.query = async function ({limit, after, before, status, tags, ids, holderId, user} = {}) {
    /**
     *
     * Retrieve MerchantSessions
     *
     * @description Receive a generator of MerchantSession objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null.
     * @param after [string, default null]: date filter for objects created only after specified date.
     * @param before [string, default null]: date filter for objects created only before specified date.
     * @param status [string, default null]: filter for status of retrieved objects. Options: 'active', 'expired', 'success'
     * @param tags [list of strings, default null]: tags to filter retrieved objects.
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects.
     * @param holderId [string, default null]: filter for sessions linked to a specific MerchantCard's holder id.
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns generator of MerchantSession objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        after: check.date(after),
        before: check.date(before),
        status: status,
        tags: tags,
        ids: ids,
        holderId: holderId,
    };
    return rest.getList(resource, query, user);
};

exports.page = async function ({cursor, limit, after, before, status, tags, ids, holderId, user} = {}) {
    /**
     *
     * Retrieve paged MerchantSessions
     *
     * @description Receive a list of up to 100 MerchantSession objects previously created in the Stark Bank API and the cursor to the next page. Use this function instead of query if you want to manually page your requests.
     *
     * Parameters (optional):
     * @param cursor [string, default null]: cursor returned on the previous page function call
     * @param limit, after, before, status, tags, ids, holderId, user: same as query()
     *
     * Return:
     * @returns list of MerchantSession objects with updated attributes and cursor to retrieve the next page
     *
     */
    let query = {
        cursor: cursor,
        limit: limit,
        after: check.date(after),
        before: check.date(before),
        status: status,
        tags: tags,
        ids: ids,
        holderId: holderId,
    };
    return rest.getPage(resource, query, user);
};

exports.purchase = async function (uuid, {amount, installmentCount, cardExpiration,
    cardNumber, cardSecurityCode, holderName, holderEmail, holderPhone, fundingType,
    billingCountryCode, billingCity, billingStateCode, billingStreetLine1, billingStreetLine2, 
    billingZipCode, metadata, cardId, user} = {}) {
    /**
     *
     * Create a MerchantSession Purchase
     *
     * @description Create a MerchantPurchase directly from the card holder's client application using a MerchantSession uuid previously created by the merchant.
     *
     * Parameters (required):
     * @param uuid [string]: MerchantSession uuid.
     * @param amount [integer]: amount in cents. ex: 100 (R$1.00)
     * @param cardNumber, cardExpiration, cardSecurityCode, holderName, fundingType [string]
     *
     * Parameters (conditionally required):
     * @param billingCity, billingCountryCode, billingStateCode, billingStreetLine1, billingStreetLine2, billingZipCode, holderEmail, holderPhone: required when challengeMode is 'enabled', optional otherwise.
     * @param metadata [dictionary]: must include userAgent, timezoneOffset, userIp, language when 3DS is enabled.
     *
     * Parameters (optional):
     * @param installmentCount [integer, default 1]
     * @param cardId [string, default null]: use instead of raw card data for a previously saved card.
     *
     * Return:
     * @returns MerchantPurchase object
     *
     */
    payload = {
        "amount": amount,
        "installmentCount": installmentCount,
        "cardExpiration": cardExpiration,
        "cardNumber": cardNumber,
        "cardSecurityCode": cardSecurityCode,
        "holderName": holderName,
        "holderEmail": holderEmail,
        "holderPhone": holderPhone,
        "fundingType": fundingType,
        "billingCountryCode": billingCountryCode,
        "billingCity": billingCity,
        "billingStateCode": billingStateCode,
        "billingStreetLine1": billingStreetLine1,
        "billingStreetLine2": billingStreetLine2,
        "billingZipCode": billingZipCode,
        "metadata": metadata,
        "cardId": cardId,
    }
    api.removeNullKeys(payload);
    return rest.postSubResource(resource, uuid, purchaseResource, payload, user);
}
