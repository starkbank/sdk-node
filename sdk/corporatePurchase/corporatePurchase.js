const rest = require('../utils/rest.js');
const api = require('core-node').api;
const check = require('core-node').check;
const Resource = require('core-node').Resource;
const parseAndVerify = require('../utils/parse.js').parseAndVerify;

class CorporatePurchase extends Resource {
    /**
    * 
    * CorporatePurchase object
    * 
    * @description Displays the CorporatePurchase objects created in your Workspace.
    *
    * Attributes (return-only):
    * @param id [string]: unique id returned when CorporatePurchase is created. ex: "5656565656565656"
    * @param holderId [string]: card holder unique id. ex: "5656565656565656"
    * @param holderName [string]: card holder name. ex: "Tony Stark"
    * @param centerId [string]: target cost center ID. ex: "5656565656565656"
    * @param cardId [string]: unique id returned when CorporateCard is created. ex: "5656565656565656"
    * @param cardEnding [string]: last 4 digits of the card number. ex: "1234"
    * @param description [string]: purchase descriptions. ex: "myDescription"
    * @param amount [integer]: CorporatePurchase value in cents. Minimum = 0. ex: 1234 (= R$ 12.34)
    * @param tax [integer]: IOF amount taxed for international purchases. ex: 1234 (= R$ 12.34)
    * @param issuerAmount [integer]: issuer amount. ex: 1234 (= R$ 12.34)
    * @param issuerCurrencyCode [string]: issuer currency code. ex: "USD"
    * @param issuerCurrencySymbol [string]: issuer currency symbol. ex: "$"
    * @param merchantAmount [integer]: merchant amount. ex: 1234 (= R$ 12.34)
    * @param merchantCurrencyCode [string]: merchant currency code. ex: "USD"
    * @param merchantCurrencySymbol [string]: merchant currency symbol. ex: "$"
    * @param merchantCategoryCode [string]: merchant category code. ex: "fastFoodRestaurants"
    * @param merchantCategoryType [string]: merchant category type. ex: "health"
    * @param merchantCountryCode [string]: merchant country code. ex: "USA"
    * @param merchantName [string]: merchant name. ex: "Google Cloud Platform"
    * @param merchantDisplayName [string]: merchant name. ex: "Google Cloud Platform"
    * @param merchantDisplayUrl [string]: public merchant icon (png image). ex: "https://sandbox.api.starkbank.com/v2/corporate-icon/merchant/ifood.png"
    * @param merchantFee [integer]: fee charged by the merchant to cover specific costs, such as ATM withdrawal logistics, etc. ex: 200 (= R$ 2.00)
    * @param methodCode [string]: method code. Options: "chip", "token", "server", "manual", "magstripe" or "contactless"
    * @param tags [list of strings]: list of strings for tagging returned by the sub-issuer during the authorization. ex: ["travel", "food"]
    * @param corporateTransactionIds [list of strings]: ledger transaction ids linked to this Purchase
    * @param status [string]: current CorporateCard status. Options: "approved", "canceled", "denied", "confirmed", "voided"
    * @param updated [string] latest update datetime for the CorporateCard. ex: '2020-03-10 10:30:00.000'
    * @param created [string] creation datetime for the CorporateCard. ex: '2020-03-10 10:30:00.000'
    */

    constructor({
                    id = null, holderId = null, holderName = null, centerId = null, cardId = null, cardEnding = null,
                    description = null, amount = null, tax = null, issuerAmount = null, issuerCurrencyCode = null,
                    issuerCurrencySymbol = null, merchantAmount = null, merchantCurrencyCode = null, merchantCurrencySymbol = null,
                    merchantCategoryCode = null, merchantCategoryType = null, merchantCountryCode = null, merchantName = null,
                    merchantDisplayName = null, merchantDisplayUrl = null, merchantFee = null, methodCode = null, tags = null,
                    corporateTransactionIds = null, status = null, update = null, created = null
                }){
        super(id);
        this.id = id,
        this.holderId = holderId,
        this.holderName,
        this.centerId = centerId,
        this.cardId = cardId,
        this.cardEnding = cardEnding,
        this.description = description,
        this.amount = amount,
        this.tax = tax,
        this.issuerAmount = issuerAmount,
        this.issuerCurrencyCode = issuerCurrencyCode,
        this.issuerCurrencySymbol = issuerCurrencySymbol,
        this.merchantAmount = merchantAmount,
        this.merchantCurrencyCode = merchantCurrencyCode,
        this.merchantCurrencySymbol = merchantCurrencySymbol,
        this.merchantCategoryCode = merchantCategoryCode,
        this.merchantCategoryType = merchantCategoryType,
        this.merchantCountryCode = merchantCountryCode,
        this.merchantName = merchantName,
        this.merchantDisplayName = merchantDisplayName,
        this.merchantDisplayUrl = merchantDisplayUrl,
        this.merchantFee = merchantFee,
        this.methodCode = methodCode,
        this.tags = tags,
        this.corporateTransactionIds = corporateTransactionIds,
        this.status = status,
        this.update = check.datetime(update),
        this.created = check.datetime(created)        
    }

};

exports.CorporatePurchase = CorporatePurchase;
let resource = {'class': exports.CorporatePurchase, 'name': 'CorporatePurchase'};

exports.get = async function (id, {user} = {}) {
    /**
    * 
    * Retrieve a specific CorporatePurchase
    * 
    * @description Receive a single CorporatePurchase object previously created in the Stark Bank API by its id
    * 
    * Parameters (required):
    * @param id [string]: object unique id. ex: "5656565656565656"
    * 
    * Parameters (optional):
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
    * 
    * Return:
    * @return CorporatePurchase object with updated attributes
    * 
    */

    return rest.getId(resource, id, user);
};

exports.query = async function ({ids, limit, after, before, merchantCategoryTypes, holderIds, cardIds, status, user} = {}) {
    /**
    * 
    * Retrieve a specific CorporatePurchase
    * 
    * @description Receive a single CorporatePurchase object previously created in the Stark Bank API by its id
    * 
    * Parameters (required):
    * @param id [string]: object unique id. ex: "5656565656565656"
    * 
    * Parameters (optional):
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
    * 
    * Return:
    * @return CorporatePurchase object with updated attributes
    * 
    */

    let query = {
        ids: ids,
        limit: limit,
        after: after,
        before: before,
        merchantCategoryType: merchantCategoryTypes,
        holderIds: holderIds,
        cardIds: cardIds,
        status: status,
    }

    return rest.getList(resource, query, user);
};

exports.page = async function ({merchantCategoryTypes, holderIds, cardIds, status, after, before, ids, cursor, limit, user} = {}) {
    /**
    * 
    * Retrieve paged CorporatePurchase
    * 
    * @description Receive a list of up to 100 CorporatePurchase objects previously created in the Stark Bank API and the cursor to the next page.
    * Use this function instead of query if you want to manually page your requests.
    * 
    * Parameters (optional):
    * @param cursor [string, default null]: cursor returned on the previous page function call
    * @param limit [integer, default 100]: maximum number of objects to be retrieved. Max = 100. ex: 35
    * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
    * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
    * @param merchantCategoryTypes [list of strings, default null]: merchant category type. ex: "health"
    * @param holderIds [list of strings, default null]: card holder IDs. ex: ["5656565656565656", "4545454545454545"]
    * @param cardIds [list of strings, default null]: card  IDs. ex: ["5656565656565656", "4545454545454545"]
    * @param status [list of strings, default null]: filter for status of retrieved objects. ex: ["approved", "canceled", "denied", "confirmed", "voided"]
    * @param ids [list of strings, default null]: purchase IDs
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
    * 
    * Return:
    * @return list of CorporatePurchase objects with updated attributes
    * @return cursor to retrieve the next page of CorporatePurchase objects
    * 
    */

    let query = {
        cursor: cursor,
        ids: ids,
        limit: limit,
        after: after,
        before: before,
        merchantCategoryTypes: merchantCategoryTypes,
        holderIds: holderIds,
        cardIds: cardIds,
        status: status,
    }
    return rest.getPage(resource, query, user);
}

exports.parse = async function (content, signature, {user} = {}) {
    /**
    * 
    * @description Create a single verified CorporatePurchase authorization request from a content string
    * Use this method to parse and verify the authenticity of the authorization request received at the informed endpoint.
    * Authorization requests are posted to your registered endpoint whenever CorporatePurchases are received.
    * They present CorporatePurchase data that must be analyzed and answered with approval or declination.
    * If the provided digital signature does not check out with the starkbank public key, a stark.exception.InvalidSignatureException will be raised.
    * If the authorization request is not answered within 2 seconds or is not answered with an HTTP status code 200 the CorporatePurchase will go through the pre-configured stand-in validation.
    * 
    * Parameters (required):
    * @param content [string]: response content from request received at user endpoint (not parsed)
    * @param signature [string]: base-64 digital signature received at response header "Digital-Signature"
    * 
    * Parameters (optional):
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
    * 
    * Return:
    * @return Parsed CorporatePurchase object
    * 
    */

    return parseAndVerify(resource, content, signature, user);
};

exports.response = async function (status, {amount, reason, tags} = {}) {
    /**
    * 
    * Helps you respond CorporatePurchase requests
    * 
    * Parameters (required):
    * @param status [string]: sub-issuer response to the authorization. ex: "approved" or "denied"
    * 
    * Parameters (conditionally required):
    * @param reason [string]: denial reason. Options: "other", "blocked", "lostCard", "stolenCard", "invalidPin", "invalidCard", "cardExpired", "issuerError", "concurrency", "standInDenial", "subIssuerError", "invalidPurpose", "invalidZipCode", "invalidWalletId", "inconsistentCard", "settlementFailed", "cardRuleMismatch", "invalidExpiration", "prepaidInstallment", "holderRuleMismatch", "insufficientBalance", "tooManyTransactions", "invalidSecurityCode", "invalidPaymentMethod", "confirmationDeadline", "withdrawalAmountLimit", "insufficientCardLimit", "insufficientHolderLimit"
    * 
    * Parameters (optional):
    * @param amount [integer, default null]: amount in cents that was authorized. ex: 1234 (= R$ 12.34)
    * @param tags [list of strings, default null]: tags to filter retrieved object. ex: ["tony", "stark"]
    * 
    * Return:
    * @return Dumped JSON string that must be returned to us on the CorporatePurchase request
    * 
    */

    let response = {'authorization': {
        'status': status,
        'amount': amount,
        'reason': reason,
        'tags': tags,
    }};
    api.removeNullKeys(response);
    return JSON.stringify(response);
};
