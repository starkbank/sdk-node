const rest = require('../utils/rest.js');
const check = require('../utils/check.js');
const Resource = require('../utils/resource.js').Resource


class BoletoHolmes extends Resource {
    /**
     *
     * BoletoHolmes object
     *
     * @description When you initialize a BoletoHolmes, the entity will not be automatically
     * created in the Stark Bank API. The 'create' function sends the objects
     * to the Stark Bank API and returns the list of created objects.
     *
     * Parameters (required):
     * @param boletoId [string]: investigated boleto entity ID. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param tags [list of strings]: list of strings for tagging
     *
     * Attributes (return-only):
     * @param id [string]: unique id returned when holmes is created. ex: '5656565656565656'
     * @param status [string]: current holmes status. ex: 'solving' or 'solved'
     * @param result [string]: result of boleto status investigation. ex: 'paid' or 'cancelled'
     * @param created [string]: creation datetime for the holmes. ex: '2020-03-10 10:30:00.000'
     * @param updated [string]: latest update datetime for the holmes. ex: '2020-03-10 10:30:00.000'
     *
     */
    constructor({
                    boletoId, tags = null, status = null, result = null, created = null, updated = null, id = null
                }) {
        super(id);
        this.boletoId = boletoId;
        this.tags = tags;
        this.result = result;
        this.status = status;
        this.created = check.datetime(created);
        this.updated = check.datetime(updated);
    }
}

exports.BoletoHolmes = BoletoHolmes;
let resource = {'class': exports.BoletoHolmes, 'name': 'BoletoHolmes'};

exports.create = async function (holmes, {user} = {}) {
    /**
     *
     * Create BoletoHolmes
     *
     * @description Send a list of BoletoHolmes objects for creation in the Stark Bank API
     *
     * Parameters (required):
     * @param holmes [list of BoletoHolmes objects]: list of BoletoHolmes objects to be created in the API
     *
     * Parameters (optional):
     * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of BoletoHolmes objects with updated attributes
     *
     */
    return rest.post(resource, holmes, user);
};

exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific BoletoHolmes
     *
     * @description Receive a single BoletoHolmes object previously created by the Stark Bank API by passing its id
     *
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     * 
     * Parameters (optional):
     * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     * 
     * Return:
     * @returns BoletoHolmes object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
};

exports.query = async function ({limit, after, before, tags, ids, status, boletoId, user} = {}) {
    /**
     *
     * Retrieve Boletos
     *
     * @description Receive a generator of Boleto objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param status [string, default null]: filter for status of retrieved objects. ex: 'solving' or 'solved'
     * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
    * @param boletoId [string, default null]: filter for holmes that investigate a specific boleto by its ID.ex: '5656565656565656'
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns generator of Boleto objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        after: after,
        before: before,
        status: status,
        tags: tags,
        ids: ids,
        boletoId: boletoId,
    };
    return rest.getList(resource, query, user);
};

exports.page = async function ({cursor, limit, after, before, tags, ids, status, boletoId, user} = {}) {
    /**
     *
     * Retrieve paged BoletoHolmes
     *
     * @description Receive a list of up to 100 BoletoHolmes objects previously created in the Stark Bank API and the cursor to the next page.
     * Use this function instead of query if you want to manually page your requests.
     *
     * Parameters (optional):
     * @param cursor [string, default null]: cursor returned on the previous page function call
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param status [string, default null]: filter for status of retrieved objects. ex: 'solving' or 'solved'
     * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param boletoId [string, default null]: filter for holmes that investigate a specific boleto by its ID.ex: '5656565656565656'
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of Boleto objects with updated attributes and cursor to retrieve the next page of BoletoHolmes objects
     *
     */
    let query = {
        cursor: cursor,
        limit: limit,
        after: after,
        before: before,
        status: status,
        tags: tags,
        ids: ids,
        boletoId: boletoId,
    };
    return rest.getPage(resource, query, user);
};
