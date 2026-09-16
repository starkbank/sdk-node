const Resource = require('starkcore').Resource;
const rest = require('../utils/rest.js');
const check = require('starkcore').check;

class MerchantPurchase extends Resource {
    /**
     * Check out our API Documentation at https://starkbank.com/docs/api#merchant-purchase
     */

    constructor({
        id, amount, installmentCount, holderName, holderEmail, holderPhone, holderId, fundingType, billingCountryCode, 
        billingCity, billingStateCode,billingStreetLine1, billingStreetLine2, billingZipCode, metadata, cardEnding, 
        cardId, challengeMode, challengeUrl, created, currencyCode, endToEndId, fee, network, source, status, tags, updated,
        softDescriptor
    }) {
        super(id)
        this.amount = amount
        this.installmentCount = installmentCount
        this.holderName = holderName
        this.holderEmail = holderEmail
        this.holderPhone = holderPhone
        this.holderId = holderId
        this.fundingType = fundingType
        this.billingCountryCode = billingCountryCode
        this.billingCity = billingCity
        this.billingStateCode = billingStateCode
        this.billingStreetLine1 = billingStreetLine1
        this.billingStreetLine2 = billingStreetLine2
        this.billingZipCode = billingZipCode
        this.metadata = metadata
        this.cardEnding = cardEnding
        this.cardId = cardId
        this.challengeMode = challengeMode
        this.challengeUrl = challengeUrl
        this.created = created
        this.currencyCode = currencyCode
        this.endToEndId = endToEndId
        this.fee = fee
        this.network = network
        this.source = source
        this.status = status
        this.tags = tags
        this.updated = updated
        this.softDescriptor = softDescriptor
    }
}

exports.MerchantPurchase = MerchantPurchase;
let resource = {'class': exports.MerchantPurchase, 'name': 'MerchantPurchase'};

exports.create = async function (purchase, {user} = {}) {
    /**
     *
     * Create MerchantPurchases
     *
     * @description Charge a card that has been previously saved via an approved MerchantSession Purchase. The card must already have an approved MerchantSessionPurchase before it can be charged here.
     *
     * Parameters (required):
     * @param cardId [string]: id of the MerchantCard to charge.
     * @param amount [integer]: amount in cents to be received. ex: 100 (R$1.00)
     * @param fundingType [string]: 'credit' or 'debit'
     *
     * Parameters (conditionally required):
     * @param billingCity, billingCountryCode, billingStateCode, billingStreetLine1, billingStreetLine2, billingZipCode, holderEmail, holderPhone [string]: required when challengeMode is 'enabled' (the default), optional otherwise.
     * @param metadata [dictionary]: when challengeMode is 'enabled', must include userAgent, timezoneOffset, userIp and language for the 3DS challenge.
     *
     * Parameters (optional):
     * @param challengeMode [string, default 'enabled']: whether 3DS holder verification is used. Options: 'enabled', 'disabled'
     * @param installmentCount [integer, default 1]: number of purchase installments.
     *
     * Return:
     * @returns list of MerchantPurchase objects with updated attributes
     *
     */
    return rest.postSingle(resource, purchase, user);
}

exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific MerchantPurchase
     *
     * @description Receive a single MerchantPurchase object previously created in the Stark Bank API by passing its id
     *
     * Parameters (required):
     * @param id [string]: object unique id.
     *
     * Parameters (optional):
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns MerchantPurchase object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
};

exports.query = async function ({limit, after, before, status, tags, ids, holderId, user} = {}) {
    /**
     *
     * Retrieve MerchantPurchases
     *
     * @description Receive a generator of MerchantPurchase objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null.
     * @param after [string, default null]: date filter for objects created only after specified date.
     * @param before [string, default null]: date filter for objects created only before specified date.
     * @param status [string, default null]: filter for status of retrieved objects. Options: 'created', 'approved', 'denied', 'confirmed', 'paid', 'pending', 'canceled', 'voided', 'failed'
     * @param tags [list of strings, default null]: tags to filter retrieved objects.
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects.
     * @param holderId [string, default null]: filter for purchases made with a specific MerchantCard's holder id.
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns generator of MerchantPurchase objects with updated attributes
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
     * Retrieve paged MerchantPurchases
     *
     * @description Receive a list of up to 100 MerchantPurchase objects previously created in the Stark Bank API and the cursor to the next page. Use this function instead of query if you want to manually page your requests.
     *
     * Parameters (optional):
     * @param cursor [string, default null]: cursor returned on the previous page function call
     * @param limit, after, before, status, tags, ids, holderId, user: same as query()
     *
     * Return:
     * @returns list of MerchantPurchase objects with updated attributes and cursor to retrieve the next page
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

exports.update = async function (id, {amount, status, user} = {}) {
    /**
     *
     * Update MerchantPurchase entity
     *
     * @description Update a MerchantPurchase by passing its id. If the purchase is 'approved', only amount=0 with status='canceled' is allowed, which cancels the authorization. If the purchase is 'confirmed', status can be set to 'reversed' with a lower amount, which debits and reverses the difference (partially or totally); a partial reversal leaves status 'confirmed', a full reversal moves it to 'voided'.
     *
     * Parameters (required):
     * @param id [string]: MerchantPurchase id.
     *
     * Parameters (optional):
     * @param amount [integer]: new amount; 0 to cancel an approved purchase, or a lower value to partially/fully reverse a confirmed one. ex: 200 (R$2.00)
     * @param status [string]: 'canceled' (from approved) or 'reversed' (from confirmed)
     * @param user [Organization/Project object, default null]
     *
     * Return:
     * @returns target MerchantPurchase with updated attributes
     *
     */
    let payload = {
        amount: amount,
        status: status,
    };
    return rest.patchId(resource, id, payload, user);
}
