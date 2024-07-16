const Resource = require('starkcore').Resource;
const rest = require('../utils/rest.js');
const check = require('starkcore').check;

class MerchantPurchase extends Resource {

    /**
     * Check out our API Documentation at https://starkbank.com/docs/api#merchant-purchase
     */

    constructor({id, amount, installmentCount, cardExpiration, cardNumber, cardSecurityCode,
        holderName, holderEmail, holderPhone, fundingType, billingCountryCode, billingCity, billingStateCode,
        billingStreetLine1, billingStreetLine2, billingZipCode, metadata, cardEnding, cardId, challengeMode, 
        challengeUrl, created, currencyCode, endToEndId, fee, network, source, status, tags, updated
    }){
        super(id)
        this.amount = amount
        this.installmentCount = installmentCount
        this.cardExpiration = cardExpiration
        this.cardNumber = cardNumber
        this.cardSecurityCode = cardSecurityCode
        this.holderName = holderName
        this.holderEmail = holderEmail
        this.holderPhone = holderPhone
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
    }
}

exports.MerchantPurchase = MerchantPurchase;
let resource = {'class': exports.MerchantPurchase, 'name': 'MerchantPurchase'};

exports.query = async function ({ limit, after, before, status, tags, ids, user} = {}) {
    let query = {
        limit: limit,
        after: check.date(after),
        before: check.date(before),
        status: status,
        tags: tags,
        ids: ids,
    };
    return rest.getList(resource, query, user);
};

exports.get = async function (id, {user} = {}) {
    return rest.getId(resource, id, user);
};
