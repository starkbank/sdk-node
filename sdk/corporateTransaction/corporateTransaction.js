const rest = require('../utils/rest.js')
const check = require('core-node').check;
const Resource = require('core-node').Resource;

class CorporateTransaction extends Resource {
    /**
    * 
    * CorporateTransaction object
    * 
    * @description The CorporateTransaction object created in your Workspace to represent each balance shift.
    * 
    * Attributes (return-only):
    * @param id [string]: unique id returned when CorporateTransaction is created. ex: "5656565656565656"
    * @param amount [integer]: CorporateTransaction value in cents. ex: 1234 (= R$ 12.34)
    * @param balance [integer]: balance amount of the Workspace at the instant of the Transaction in cents. ex: 200 (= R$ 2.00)
    * @param description [string]: CorporateTransaction description. ex: "Buying food"
    * @param source [string]: source of the transaction. ex: "corporate-purchase/5656565656565656"
    * @param tags [string]: list of strings inherited from the source resource. ex: ["tony", "stark"]
    * @param created [string]: creation datetime for the CorporateTransaction. ex: '2020-03-10 10:30:00.000'
    * 
    */

    constructor({ id, amount, balance, description, source, tags, created }){
        super(id);
        this.amount = amount;
        this.balance = balance;
        this.description = description;
        this.source = source;
        this.tags = tags,
        this.created = created;
    }
}

exports.CorporateTransaction = CorporateTransaction;
let resource = {'class': exports.CorporateTransaction, 'name': 'CorporateTransaction'};

exports.get = async function (id, {user} = {}) {
    /**
    * 
    * Retrieve a specific CorporateTransaction
    * 
    * @description Receive a single CorporateTransaction object previously created in the Stark Bank API by its id
    * 
    * Parameters (required):
    * @param id [string]: object unique id. ex: "5656565656565656"
    * 
    * Parameters (optional):
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
    * 
    * Return:
    * @param CorporateTransaction object with updated attributes
    * 
    */

    return rest.getId(resource, id, user);
}

exports.query =  async function ({source, tags, externalIds, after, before, ids, limit, user} = {}) {
    /**
    * 
    * Retrieve CorporateTransaction
    * 
    * @descrption Receive a generator of CorporateTransaction objects previously created in the Stark Bank API
    * 
    * Parameters (optional):
    * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ["tony", "stark"]
    * @param externalIds [list of strings, default null]: external IDs. ex: ["5656565656565656", "4545454545454545"]
    * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
    * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
    * @param status [string, default null]: filter for status of retrieved objects. ex: "approved", "canceled", "denied", "confirmed" or "voided"
    * @param ids [list of strings, default null]: purchase IDs
    * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
    * 
    * Return:
    * @param generator of CorporateTransaction objects with updated attributes
    * 
    */

    let query = {
        source: source,
        tags: tags,
        externalIds: externalIds,
        after: after,
        before: before,
        ids: ids,
        limit: limit,
        user: user,
    }
    return rest.getList(resource, query, user);
}

exports.page = async function ({source, tags, externalIds, after, before, ids, limit, cursor, user} = {}) {
    /**
    * 
    * Retrieve paged CorporateTransaction
    * 
    * @description Receive a list of up to 100 CorporateTransaction objects previously created in the Stark Bank API and the cursor to the next page.
    * Use this function instead of query if you want to manually page your requests.
    * 
    * Parameters (optional):
    * @param cursor [string, default null]: cursor returned on the previous page function call
    * @param limit [integer, default 100]: maximum number of objects to be retrieved. Max = 100. ex: 35
    * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ["tony", "stark"]
    * @param externalIds [list of strings, default null]: external IDs. ex: ["5656565656565656", "4545454545454545"]
    * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
    * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
    * @param status [string, default null]: filter for status of retrieved objects. ex: "approved", "canceled", "denied", "confirmed" or "voided"
    * @param ids [list of strings, default null]: purchase IDs
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
    * 
    * Return:
    * @return list of CorporateTransaction objects with updated attributes
    * @return cursor to retrieve the next page of CorporatePurchase objects
    * 
    */

    let query = {
        source: source,
        tags: tags,
        externalIds: externalIds,
        after: check.date(after),
        before: check.date(before),
        ids: ids,
        limit: limit,
        cursor: cursor,
    }    
    return rest.getPage(resource, query, user);
}
