const rest = require('../utils/rest.js');
const check = require('../utils/check.js');
const Resource = require('../utils/resource.js').Resource


class DynamicBrcode extends Resource {
    /**
     *
     * DynamicBrcode object
     *
     * @description When you initialize a DynamicBrcode, the entity will not be automatically
     * sent to the Stark Bank API. The 'create' function sends the objects
     * to the Stark Bank API and returns the list of created objects.
     * 
     * DynamicBrcodes are conciliated BR Codes that can be used to receive Pix transactions in a convenient way.
     * When a DynamicBrcode is paid, a Deposit is created with the tags parameter containing the character “dynamic-brcode/” followed by the DynamicBrcode’s uuid "dynamic-brcode/{uuid}" for conciliation.
     * Additionally, all tags passed on the DynamicBrcode will be transferred to the respective Deposit resource.
     *
     * Parameters (required):
     * @param amount [integer]: DynamicBrcode value in cents. Minimum = 0 (any value will be accepted). ex: 1234 (= R$ 12.34)
     *
     * Parameters (optional):
     * @param expiration [integer, default 3600 (1 hour)]: time interval in seconds between due date and expiration date. ex 123456789
     * @param tags [list of strings, default []]: list of strings for tagging, these will be passed to the respective Deposit resource when paid
     * 
     * Attributes (return-only):
     * @param id [string]: id returned on creation, this is the BR code. ex: "00020126360014br.gov.bcb.pix0114+552840092118152040000530398654040.095802BR5915Jamie Lannister6009Sao Paulo620705038566304FC6C"
     * @param uuid [string]: unique uuid returned when the DynamicBrcode is created. ex: "4e2eab725ddd495f9c98ffd97440702d"
     * @param pictureUrl [string]: public QR Code (png image) URL. "https://sandbox.api.starkbank.com/v2/dynamic-brcode/d3ebb1bd92024df1ab6e5a353ee799a4.png"
     * @param updated [string]: update datetime for the DynamicBrcode. ex: '2020-03-10 10:30:00.000'
     * @param created [string]: creation datetime for the DynamicBrcode. ex: '2020-03-10 10:30:00.000'
     *
     */
    constructor({ amount, expiration, tags, id, uuid, pictureUrl, updated, created }) {
        super(id);
        this.amount = amount;
        this.expiration = expiration;
        this.tags = tags;
        this.id = id;
        this.uuid = uuid;
        this.pictureUrl = pictureUrl;
        this.updated = check.datetime(updated);
        this.created = check.datetime(created);
    }
}

exports.DynamicBrcode = DynamicBrcode;
let resource = {'class': exports.DynamicBrcode, 'name': 'DynamicBrcode'};

exports.create = async function (dynamicBrcodes, {user} = {}) {
    /**
     *
     * Create DynamicBrcodes
     *
     * @description Send a list of DynamicBrcode objects for creation in the Stark Bank API
     *
     * Parameters (required):
     * @param dynamicBrcodes [list of DynamicBrcode objects]: list of DynamicBrcode objects to be created in the API
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of DynamicBrcode objects with updated attributes
     *
     */
    return rest.post(resource, dynamicBrcodes, user);
};

exports.get = async function (uuid, {user} = {}) {
    /**
     *
     * Retrieve a specific DynamicBrcode
     *
     * @description Receive a single DynamicBrcode object previously created in the Stark Bank API by passing its uuid
     *
     * Parameters (required):
     * @param uuid [string]: object unique uuid. ex: "901e71f2447c43c886f58366a5432c4b"
     * 
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     * 
     * Return:
     * @returns DynamicBrcode object with updated attributes
     *
     */
    return rest.getId(resource, uuid, user);
};

exports.query = async function ({ limit, after, before, tags, uuids, user } = {}) {
    /**
     *
     * Retrieve DynamicBrcodes
     *
     * @description Receive a generator of DynamicBrcode objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * @param uuids [list of strings, default null]: list of uuids to filter retrieved objects. ex: ["901e71f2447c43c886f58366a5432c4b", "4e2eab725ddd495f9c98ffd97440702d"]
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns generator of DynamicBrcode objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        after: after,
        before: before,
        tags: tags,
        uuids: uuids,
    };
    return rest.getList(resource, query, user);
};

exports.page = async function ({ cursor, limit, after, before, tags, uuids, user } = {}) {
    /**
     *
     * Retrieve paged DynamicBrcodes
     *
     * @description Receive a list of up to 100 DynamicBrcode objects previously created in the Stark Bank API and the cursor to the next page.
     * Use this function instead of query if you want to manually page your requests.
     *
     * Parameters (optional):
     * @param cursor [string, default null]: cursor returned on the previous page function call
     * @param limit [integer, default 100]: maximum number of objects to be retrieved. It must be an integer between 1 and 100. ex: 50
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * @param uuids [list of strings, default null]: list of uuids to filter retrieved objects. ex: ["901e71f2447c43c886f58366a5432c4b", "4e2eab725ddd495f9c98ffd97440702d"]
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of DynamicBrcode objects with updated attributes and cursor to retrieve the next page of DynamicBrcode objects
     *
     */
    let query = {
        cursor: cursor, 
        limit: limit,
        after: after,
        before: before,
        tags: tags,
        uuids: uuids,
    };
    return rest.getPage(resource, query, user);
};
