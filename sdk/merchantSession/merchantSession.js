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
        status=null, tags=null, updated=null, uuid=null, id=null
    }) {
        super(id) 
        this.allowedFundingTypes = allowedFundingTypes;
        this.allowedInstallments = parseObjects(allowedInstallments, allowedInstallmentResource, AllowedInstallment);
        this.allowedIps = allowedIps;
        this.challengeMode = challengeMode;
        this.created = created;
        this.expiration = expiration;
        this.status = status;
        this.tags = tags;
        this.updated = updated;
        this.uuid = uuid;    
    }
}

exports.MerchantSession = MerchantSession;
let resource = {'class': exports.MerchantSession, 'name': 'MerchantSession'};

exports.create = async function (merchantSession, {user} = {}) {
    return rest.postSingle(resource=resource, query=merchantSession, user=user)
}

exports.get = async function (id, {user} = {}) {
    return rest.getId(resource, id, user);
};

exports.query = async function ({limit, after, before, status, tags, ids, user} = {}) {
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

exports.page = async function ({cursor, limit, after, before, status, tags, ids, user} = {}) {
    let query = {
        cursor: cursor,
        limit: limit,
        after: check.date(after),
        before: check.date(before),
        status: status,
        tags: tags,
        ids: ids,
    };
    return rest.getPage(resource, query, user);
};

exports.purchase = async function (uuid, {amount, installmentCount, cardExpiration,
    cardNumber, cardSecurityCode, holderName, holderEmail, holderPhone, fundingType,
    billingCountryCode, billingCity, billingStateCode, billingStreetLine1, billingStreetLine2, 
    billingZipCode, metadata, cardId, user} = {}) {
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
