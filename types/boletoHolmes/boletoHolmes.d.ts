
declare module 'starkbank' {
        
    export class BoletoHolmes {
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

        boletoId : string

        tags : string[] | null
        
        readonly id : string
        readonly status : string
        readonly result : string
        readonly created : string
        readonly updated : string

        constructor(params: {
            boletoId: string, tags?: string[] | null, status?: string | null, result?: string | null, 
            created?: string | null, updated?: string | null
        })
    }

    export namespace boletoHolmes {

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
        function create(holmes: BoletoHolmes[] | {}[], params?:{ user?: Project | Organization | null }): Promise<BoletoHolmes[]>;

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
        function get(id: string, params?:{ user?: Project | Organization | null }): Promise<BoletoHolmes>;

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
        function page(params?: { 
            cursor?: string | null, 
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            tags?: string[] | null, 
            ids?: string[] | null, 
            status?: string | null, 
            boletoId?: string | null, 
            user?: Project | Organization | null
        }): Promise<[BoletoHolmes[], string | null]>;

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
        function query(params?: { 
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            tags?: string[] | null, 
            ids?: string[] | null, 
            status?: string | null, 
            boletoId?: string | null, 
            user?: Project | Organization | null
        }): Promise<BoletoHolmes[]>;

        export class Log {
            /**
             *
             * Boletoholmes.Log object
             *
             * @description Every time a BoletoHolmes entity is modified, a corresponding boletoholmes.Log
             * is generated for the entity. This log is never generated by the
             * user, but it can be retrieved to check additional information
             * on the BoletoHolmes.
             *
             * Attributes:
             * @param id [string]: unique id returned when the log is created. ex: '5656565656565656'
             * @param holmes [BoletoHolmes]: BoletoHolmes entity to which the log refers to.
             * @param type [string]: type of the BoletoHolmes event which triggered the log creation. ex: "solving" or "solved"
             * @param created [string]: creation datetime for the log. ex: '2020-03-10 10:30:00.000'
             * @param updated [string]: latest update datetime for the log. ex: '2020-03-10 10:30:00.000'
             *
             */

            readonly id : string
            readonly holmes : BoletoHolmes
            readonly type : string
            readonly created : string
            readonly updated : string

            constructor(id: string, holmes: BoletoHolmes, type: string, created: string, updated: string)
        }

        namespace log {
            /**
             *
             * Retrieve a specific boletoHolmes.Log
             *
             * @description Receive a single boletoHolmes.Log object previously created by the Stark Bank API by passing its id
             *
             * Parameters (required):
             * @param id [string]: object unique id. ex: '5656565656565656'
             *
             * Parameters (optional):
             * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns boletoholmes.Log object with updated attributes
             *
             */
            function get(id: string, params?:{ user?: Project | Organization | null }): Promise<boletoHolmes.Log>;

            /**
             *
             * Retrieve paged Boleto Logs
             *
             * @description Receive a list of BoletoHolmes.Log objects previously created in the Stark Bank API
             *
             * Parameters (optional):
             * @param cursor [string, default null]: cursor returned on the previous page function call
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter for log event types. ex: 'paid' or 'registered'
             * @param holmesIds [list of strings, default null]: list of BoletoHolmes ids to filter retrieved objects.ex: ["5656565656565656", "4545454545454545"]
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of Boleto Log objects with updated attributes and cursor to retrieve the next page of BoletoHolmes.Log objects
             *
             */
            function page(params?: { 
                cursor?: string | null, 
                limit?: number | null, 
                after?: string | null, 
                before?: string | null, 
                types?: string[] | null, 
                holmesIds?: string[] | null, 
                user?: Project | Organization | null
            }): Promise<[boletoHolmes.Log[], string | null]>;

            /**
             *
             * Retrieve Boleto Logs
             *
             * @description Receive a generator of Boleto Log objects previously created in the Stark Bank API
             *
             * Parameters (optional):
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter for log event types. ex: 'paid' or 'registered'
             * @param holmesIds [list of strings, default null]: list of BoletoHolmes ids to filter retrieved objects.ex: ["5656565656565656", "4545454545454545"]
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of Boleto Log objects with updated attributes
             *
             */
            function query(params?: { 
                limit?: number | null, 
                after?: string | null, 
                before?: string | null, 
                types?: string[] | null, 
                holmesIds?: string[] | null, 
                user?: Project | Organization | null
            }): Promise<boletoHolmes.Log[]>;
        }
    }
}
