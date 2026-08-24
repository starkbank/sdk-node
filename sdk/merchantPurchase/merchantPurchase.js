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
        softDescriptor, confirmationMode
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
        this.confirmationMode = confirmationMode
    }
}

exports.MerchantPurchase = MerchantPurchase;
let resource = {'class': exports.MerchantPurchase, 'name': 'MerchantPurchase'};

exports.create = async function (purchase, {user} = {}) {
    return rest.postSingle(resource, purchase, user);
}

exports.get = async function (id, {user} = {}) {
    return rest.getId(resource, id, user);
};

exports.query = async function ({limit, after, before, status, tags, ids, holderId, user} = {}) {
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
    let payload = {
        amount: amount,
        status: status,
    };
    return rest.patchId(resource, id, payload, user);
}

exports.delete = async function (id, {user} = {}) {
    /**
     *
     * Cancel or reverse a MerchantPurchase entity
     *
     * @description Cancel a MerchantPurchase still in status "approved" (before capture) or reverse
     * one already "confirmed" (after capture). The API infers cancelation vs reversal from the
     * current purchase status. Only applies to purchases created with confirmationMode "manual".
     *
     * Parameters (required):
     * @param id [string]: MerchantPurchase unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns deleted MerchantPurchase object
     *
     */
    return rest.deleteId(resource, id, user);
}
