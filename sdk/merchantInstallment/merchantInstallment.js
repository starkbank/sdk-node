const rest = require('../utils/rest.js');
const check = require('starkcore').check;
const Resource = require('starkcore').Resource;

class MerchantInstallment extends Resource {

    /**
     * Check out our API Documentation at https://starkbank.com/docs/api#merchant-installment
     */

    constructor({
                amount, fee, fundingType, network, purchaseId, status,
                transactionIds, tags,  due, created, updated
                }) {
        super();
        this.amount = amount;
        this.fee = fee;
        this.fundingType = fundingType;
        this.network = network;
        this.purchaseId = purchaseId;
        this.status = status;
        this.transactionIds = transactionIds;
        this.tags = tags;
        this.due = check.datetime(due);
        this.created = check.datetime(created);
        this.updated = check.datetime(updated);
    }
}

exports.MerchantInstallment = MerchantInstallment;
let resource = {'class': exports.MerchantInstallment, 'name': 'merchantInstallment'};

exports.get = async function (id, {user} = {}) {
    return rest.getId(resource, id, user);
}

exports.query = async function ({ limit, after, before, status, user} = {}) {
    let query = {
        limit: limit,
        after: check.date(after),
        before: check.date(before),
        status: status
    };
    return rest.getList(resource, query, user);
}

exports.page = async function ({ cursor, limit, after, before, status, user} = {}) {
    let query = {
        cursor: cursor,
        limit: limit,
        after: check.date(after),
        before: check.date(before),
        status: status,
    };
    return rest.getPage(resource, query, user);
}