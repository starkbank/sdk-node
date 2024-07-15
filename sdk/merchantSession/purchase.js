const Resource = require('starkcore').Resource;
const { subResource } = require('starkcore');
const rest = require('../utils/rest.js');
const api = require('starkcore').api;

class Purchase extends Resource {

    /**
     * Check out our API Documentation at https://starkbank.com/merchant-purchase
     */

    constructor({id, amount, installmentCount, cardExpiration, cardNumber, cardSecurityCode, holderName, holderEmail, holderPhone, fundingType, billingCountryCode, billingCity, billingStateCode, billingStreetLine1, billingStreetLine2, billingZipCode, metadata}){
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
    }
}

exports.Purchase = Purchase;
exports.resource = {'class': exports.Purchase, 'name': 'Purchase'};
