
declare module 'starkbank' {
    
    export class DynamicBrcode {
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

        amount : number

        expiration : number | null
        tags : string[] | null
        
        readonly id : string
        readonly uuid : string
        readonly pictureUrl : string
        readonly updated : string
        readonly created : string

        constructor(params: {
            amount: number, expiration? : number | null, tags? : string[] | null, 
            id?: string | null, uuid? : string | null, pictureUrl?: string | null, 
            updated? : string | null, created? : string | null
        })
    }

    export namespace dynamicBrcode {

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
        export function create(dynamicBrcodes: DynamicBrcode[] | {}[], params?:{ user?: Project | Organization | null }): Promise<DynamicBrcode[]>;
    
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
        export function get(uuid: string, params?:{ user?: Project | Organization | null }): Promise<DynamicBrcode>;

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
        export function query(params?: { 
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            tags?: string[] | null, 
            uuids?: string[] | null, 
            user?: Project | Organization | null
        }): Promise<DynamicBrcode[]>

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
        export function page(params?: { 
            cursor?: string | null, 
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            tags?: string[] | null, 
            uuids?: string[] | null, 
            user?: Project | Organization | null
        }): Promise<[DynamicBrcode[], string | null]>
    }
}
