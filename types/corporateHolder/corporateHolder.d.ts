declare module 'starkbank' {
    
    export class CorporateHolder {
        /**
         * 
         * CorporateHolder object
         * 
         * @description The CorporateHolder describes a card holder that may group several cards.
         * When you initialize a CorporateHolder, the entity will not be automatically
         * created in the Stark Bank API. The 'create' function sends the objects
         * to the Stark Bank API and returns the created object.
         * 
         * Parameters (required):
         * @param name [string]: cardholder name. ex: "Tony Stark"
         * 
         * Parameters (optional):
         * @param centerId [string, default null]: target cost center ID. ex: "5656565656565656"
         * @param permissions [list of Permission object, default null]: list of Permission object representing access granted to an user for a particular cardholder.
         * @param rules [list of CorporateRule, default []]: [EXPANDABLE] list of holder spending rules
         * @param tags [list of strings, default []]: list of strings for tagging. ex: ["travel", "food"]
         *
         * Attributes (return-only):
         * @param id [string]: unique id returned when CorporateHolder is created. ex: "5656565656565656"
         * @param status [string]: current CorporateHolder status. ex: "active", "blocked", "canceled"
         * @param updated [string] latest update datetime for the CorporateHolder. ex: '2020-03-10 10:30:00.000'
         * @param created [string] creation datetime for the CorporateHolder. ex: '2020-03-10 10:30:00.000'
         */

        name: string

        centerId: string | null
        permissions: Permission[] | null
        rules: rules[] | null
        tags: string[] | null

        readonly id : string
        readonly status : string
        readonly updated : string
        readonly created : string

        constructor(params: {
            name: string, centerId?: string | null, permissions?: Permission[] | null,
            rules?: rules[] | null, tags?: string | null, id?: string | null,
            status?: string | null, updated?: string | null, created?: string | null})

    }

    export namespace corporateHolder {
        /**
         * 
         * @description Send a list of CorporateHolder objects for creation at the Stark Bank API
         * 
         * Parameters (required):
         * @param holders [list of CorporateHolder objects]: list of CorporateHolder objects to be created in the API
         * 
         * Parameters (optional):
         * @param expand [list of strings, default null]: fields to expand information. Options: ["rules"]
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @return list of CorporateHolder objects with updated attributes
         * 
         */

        function create(holder: corporateHolder[], params?: {
            expand?: string[], user?: Project | Organization | null
        }): Promise<corporateHolder>
        
        /**
         * 
         * Retrieve a specific CorporateHolder
         * 
         * @description Receive a single CorporateHolder object previously created in the Stark Bank API by its id
         * 
         * Parameters (required):
         * @param id [string]: object unique id. ex: "5656565656565656"
         * 
         * Parameters (optional):
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @retun CorporateHolder object with updated attributes
         * 
         */
        function get(id: string, params?: {user?: Project | Organization | null}): Promise<corporateHolder>;

        /**
         * 
         * Retrieve CorporateHolders
         * 
         * @description Receive a generator of CorporateHolder objects previously created in the Stark Bank API
         * 
         * Parameters (optional):
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
         * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ["5656565656565656", "4545454545454545"]
         * @param status [list of strings, default null]: filter for status of retrieved objects. ex: ["active", "blocked", "canceled"]
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ["tony", "stark"]
         * @param expand [string, default null]: fields to expand information. Options: ["rules"]
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @retun generator of CorporateHolder objects with updated attributes
         * 
         */

        function query(params?: {
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            types?: string[] | null, 
            holderIds?: string[] | null, 
            user?: Project | Organization | null
        }): Promise<corporateHolder[]>;
        
        /**
         * 
         * Retrieve CorporateHolders
         * 
         * @description Receive a list of up to 100 CorporateHolder objects previously created in the Stark Bank API and the cursor to the next page.
         * Use this function instead of query if you want to manually page your requests.
         * 
         * Parameters (optional):
         * @param cursor [string, default null]: cursor returned on the previous page function call
         * @param limit [integer, default 100]: maximum number of objects to be retrieved. Max = 100. ex: 35
         * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
         * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ["5656565656565656", "4545454545454545"]
         * @param status [list of strings, default null]: filter for status of retrieved objects. ex: ["active", "blocked", "canceled"]
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ["tony", "stark"]
         * @param expand [string, default null]: fields to expand information. Options: ["rules"]
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @return list of CorporateHolder objects with updated attributes
         * @return cursor to retrieve the next page of CorporateHolder objects
         * 
         */

        function page(params?: { 
            cursor?: string  | null,
            expand?: string[] | null, 
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            types?: string[] | null, 
            boletoIds?: string[] | null, 
            user?: Project | Organization | null
        }): Promise<[corporateHolder[], string | null]>;

        /**
         * 
         * Update CorporateHolder entity
         * 
         * @description Update a CorporateHolder by passing its id.
         *
         * Parameters (required):
         * @param id [string]: CorporateHolder id. ex: '5656565656565656'
         * 
         * Parameters (optional):
         * @param centerId [string, default null]: target cost center ID. ex: "5656565656565656"
         * @param permissions [list of Permission object, default null]: list of Permission object representing access granted to an user for a particular cardholder.
         * @param status [string, default null]: You may block the CorporateHolder by passing 'blocked' in the status
         * @param name [string, default null]: card holder name.
         * @param tags [list of strings, default null]: list of strings for tagging
         * @param rules [list of dictionaries, default null]: list of dictionaries with "amount": int, "currencyCode": string, "id": string, "interval": string, "name": string pairs
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @return target CorporateHolder with updated attributes
         * 
         */
        function update(id: string, params?: {
            centerId?: string,
            permissions?: Permissions[],  
            status?: string,
            name?: string | null,
            rules?: {}[],
            tags?: string[],
            user?: Project | Organization | null
        }): Promise<corporateHolder>;
        

    export class Permission {
        /**
         * 
         * corporateholder.Permission object
         * 
         * @description Permission object represents access granted to an user for a particular cardholder
         * 
         * Parameters (optional):
         * @param ownerId [string, default null]: owner unique id. ex: "5656565656565656"
         * @param ownerType [string, default null]: owner type. ex: "project"
         * 
         * Attributes (return only):
         * @param ownerEmail [string]: email address of the owner. ex: "tony@starkbank.com
         * @param ownerName [string]: name of the owner. ex: "Tony Stark"
         * @param ownerPictureUrl [string]: Profile picture Url of the owner. ex: "https://storage.googleapis.com/api-ms-workspace-sbx.appspot.com/pictures/member/6227829385592832?20230404164942"
         * @param ownerStatus [string]: current owner status. ex: "active", "blocked", "canceled"
         * @param created [string]: creation datetime for the Permission. ex: '2020-03-10 10:30:00.000'
         * 
         */

        ownerId: string | null
        ownerType: string | null

        readonly ownerEmail : string | null
        readonly ownerName : string | null
        readonly ownerPictureUrl : string | null
        readonly ownerStatus : string | null
        readonly created : string | null

        constructor(params?: {
            ownerType?: string, ownerId?: string | null,
            ownerEmail?: string | null, ownerName?: string | null,
            ownerPictureUrl?: string | null, ownerStatus?: string | null,
            created?: string | null})
        }

        export class Log {
        /**
         * 
         * corporateholder.Log object
         * 
         * @description Every time a CorporateHolder entity is updated, a corresponding corporateholder.Log
         * is generated for the entity. This log is never generated by the
         * user, but it can be retrieved to check additional information
         * on the CorporateHolder.
         * 
         * Attributes (return-only):
         * @param id [string]: unique id returned when the log is created. ex: "5656565656565656"
         * @param holder [CorporateHolder]: CorporateHolder entity to which the log refers to.
         * @param type [string]: type of the CorporateHolder event which triggered the log creation. ex: "blocked", "canceled", "created", "unblocked", "updated"
         * @param created [string] latest update datetime for the CorporateHolder. ex: '2020-03-10 10:30:00.000'
         */
        readonly id : string 
        readonly holder : corporateHolder
        readonly type : string
        readonly created : string

        constructor(params: {
            id?: string | null, holder?: corporateHolder | null,
            type?: string | null, created?: string | null})
        }

        export namespace log {
        /**
         * 
         * Retrieve a specific corporateholder.Log
         * 
         * @description Receive a single corporateholder.Log object previously created by the Stark Bank API by its id
         * 
         * Parameters (required):
         * @param id [string]: object unique id. ex: "5656565656565656"
         * 
         * Parameters (optional):
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
         * 
         * Return:
         * @return corporateholder.Log object with updated attributes
         * 
         */

        function get (id: string, params?: {user?: Project | Organization | null}): Promise<corporateHolder.Log>

        /**
         * 
         * Retrieve corporateholder.Log
         * 
         * @description Receive a generator of corporateholder.Log objects previously created in the Stark Bank API
         * 
         * Parameters (optional):
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
         * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
         * @param types [list of strings, default null]: filter for log event types. ex: ["created", "blocked"]
         * @param holderIds [list of strings, default null]: list of CorporateHolder ids to filter logs. ex: ["5656565656565656", "4545454545454545"]
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ["5656565656565656", "4545454545454545"]
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
         * 
         * Return:
         * @return generator of corporateholder.Log objects with updated attributes
         * 
         */

        function query (params?: {
            limit?: number | null,
            after?: string | null,
            before?: string | null,
            types?: string[] | null,
            holderIds?: string[] | null,
            ids?: string[] | null,
            user?: Project | Organization | null
        }): Promise<corporateHolder.Log[]>
        /**
         * 
         * Retrieve paged corporateholder.Log
         * 
         * @description Receive a list of up to 100 corporateholder.Log objects previously created in the Stark Bank API and the cursor to the next page.
         * Use this function instead of query if you want to manually page your requests.
         * 
         * Parameters (optional):
         * @param cursor [string, default null]: cursor returned on the previous page function call
         * @param limit [integer, default 100]: maximum number of objects to be retrieved. It must be an integer between 1 and 100. ex: 50
         * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
         * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
         * @param types [list of strings, default null]: filter for log event types. ex: ["created", "blocked"]
         * @param holderids [list of strings, default null]: list of CorporateHolder ids to filter logs. ex: ["5656565656565656", "4545454545454545"]
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ["5656565656565656", "4545454545454545"]
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
         * @param
         * 
         * Return:
         * @return list of corporateholder.Log objects with updated attributes
         * @return cursor to retrieve the next page of corporateholder.Log objects
         * 
         */

        function page (params?: {
            cursor?: string | null,
            limit?: number | null,
            after?: string | null,
            before?: string | null,
            types?: string[] | null, 
            holderids?: string[] | null, 
            ids?: string[] | null,
            user?: Project | Organization | null
        }): Promise<corporateHolder.Log[], string | null>
        }
    }
}
