
declare module 'starkbank' {
    
    export class UtilityPayment {
        /**
         *
         * UtilityPayment object
         *
         * @description When you initialize a UtilityPayment, the entity will not be automatically
         * created in the Stark Bank API. The 'create' function sends the objects
         * to the Stark Bank API and returns the list of created objects.
         *
         * Parameters (conditionally required):
         * @param line [string, default null]: Number sequence that describes the payment. Either 'line' or 'barCode' parameters are required. If both are sent, they must match. ex: '34191.09008 63571.277308 71444.640008 5 81960000000062'
         * @param barCode [string, default null]: Bar code number that describes the payment. Either 'line' or 'barCode' parameters are required. If both are sent, they must match. ex: '34195819600000000621090063571277307144464000'
         *
         * Parameters (required):
         * @param description [string]: Text to be displayed in your statement (min. 10 characters). ex: 'payment ABC'
         *
         * Parameters (optional):
         * @param scheduled [string, default today]: payment scheduled date. ex: '2020-03-10'
         * @param tags [list of strings]: list of strings for tagging
         *
         * Attributes (return-only):
         * @param id [string]: unique id returned when payment is created. ex: '5656565656565656'
         * @param status [string]: current payment status. ex: 'success' or 'failed'
         * @param amount [int]: amount automatically calculated from line or barCode. ex: 23456 (= R$ 234.56)
         * @param fee [integer]: fee charged when the utility payment is created. ex: 200 (= R$ 2.00)
         * @param type [string]: payment type. ex: "utility"
         * @param transactionIds [list of strings]: ledger transaction ids linked to this UtilityPayment. ex: ['19827356981273']
         * @param created [string]: creation datetime for the payment. ex: '2020-03-10 10:30:00.000'
         * @param updated [string]: latest update datetime for the payment. ex: '2020-03-10 10:30:00.000'
         *
         */

        description?: string | null

        scheduled?: string | null
        tags?: string[] | null

        line?: string | null
        barCode?: string | null

        readonly id?: string | null
        readonly status?: string | null
        readonly amount?: number | null
        readonly fee?: number | null
        readonly type?: string | null
        readonly transactionIds?: string[] | null
        readonly created?: string | null
        readonly updated?: string | null

        constructor(params: {
            description: string, scheduled?: string, line?: string, barCode?: string, 
            tags?: string[], id?: string | null, status?: string | null, amount?: number | null,
            fee?: number | null, type?: string | null, transactionIds?: string[] | null, 
            created?: string | null, updated?: string | null
        })
    }

    export namespace utilityPayment {
        /**
         *
         * Create UtilityPayments
         *
         * @description Send a list of UtilityPayment objects for creation in the Stark Bank API
         *
         * Parameters (required):
         * @param payments [list of UtilityPayment objects]: list of UtilityPayment objects to be created in the API
         * @param Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @returns list of UtilityPayment objects with updated attributes
         *
         */
        export function create(payments: UtilityPayment[], params?:{ user?: Project | Organization | null}): Promise<UtilityPayment[]>;

        /**
         *
         * Retrieve a specific UtilityPayment
         *
         * @description Receive a single UtilityPayment object previously created by the Stark Bank API by passing its id
         *
         * Parameters (required):
         * @param id [string]: object unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @returns user [Project object]: Project object. Not necessary if starkbank.user was set before function call
         *
         */
        export function get(id: string, params?:{ user?: Project | Organization | null}): Promise<UtilityPayment>;

        /**
         *
         * Retrieve paged UtilityPayments
         *
         * @description Receive a list of up to 100 UtilityPayment objects previously created in the Stark Bank API and the cursor to the next page.
         * Use this function instead of query if you want to manually page your requests.
         *
         * Parameters (optional):
         * @param cursor [string, default null]: cursor returned on the previous page function call
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
         * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
         * @param status [string, default null]: filter for status of retrieved objects. ex: 'success'
         * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns list of UtilityPayment objects with updated attributes and cursor to retrieve the next page of UtilityPayment objects
         *
         */
        export function page(params?: { 
            cursor?: string | null, 
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            tags?: string[] | null, 
            ids?: string[] | null, 
            status?: string | null, 
            user?: Project | Organization | null
        }): Promise<[UtilityPayment[], string | null]>;
            
        /**
         *
         * Retrieve a specific UtilityPayment pdf file
         *
         * @description Receive a single UtilityPayment pdf file generated in the Stark Bank API by passing its id.
         * Only valid for utility payments with 'success' status.
         *
         * Parameters (required):
         * @param id [string]: object unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns UtilityPayment pdf file
         *
         */
        export function pdf(id: string, params?:{ user?: Project | Organization | null}): Promise<Buffer>;
        
        /**
         *
         * Retrieve UtilityPayments
         *
         * @description Receive a generator of UtilityPayment objects previously created in the Stark Bank API
         *
         * Parameters (optional):
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
         * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
         * @param status [string, default null]: filter for status of retrieved objects. ex: 'success'
         * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns generator of UtilityPayment objects with updated attributes
         *
         */
        export function query(params?: { 
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            tags?: string[] | null, 
            ids?: string[] | null, 
            status?: string | null, 
            user?: Project | Organization | null
        }): Promise<UtilityPayment[]>;
        /**
         *
         * Delete a UtilityPayment entity
         *
         * @description Delete a UtilityPayment entity previously created in the Stark Bank API
         *
         * Parameters (required):
         * @param id [string]: UtilityPayment unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns deleted UtilityPayment object
         *
         */
        function _delete(id: string, params?:{ user?: Project | Organization | null}): Promise<UtilityPayment>;
        export { _delete as delete }

        export class Log {
            /**
             *
             * UtilityPayment Log object
             *
             * @description Every time a UtilityPayment entity is modified, a corresponding UtilityPayment Log
             * is generated for the entity. This log is never generated by the user, but it can
             * be retrieved to check additional information on the UtilityPayment.
             *
             * Attributes:
             * @param id [string]: unique id returned when the log is created. ex: '5656565656565656'
             * @param payment [UtilityPayment]: UtilityPayment entity to which the log refers to.
             * @param errors [list of strings]: list of errors linked to this UtilityPayment event.
             * @param type [string]: type of the UtilityPayment event which triggered the log creation. ex: 'processing' or 'success'
             * @param created [string]: creation datetime for the log. ex: '2020-03-10 10:30:00.000'
             *
             */

            readonly id : string
            readonly payment : UtilityPayment
            readonly errors: string[]
            readonly type : string
            readonly created : string

            constructor(id: string, payment: UtilityPayment, errors: string[], type: string, created: string)
        }

        export namespace log {

            /**
             *
             * Retrieve a specific UtilityPayment Log
             *
             * @description Receive a single UtilityPayment Log object previously created by the Stark Bank API by passing its id
             *
             * Parameters (required):
             * @param id [string]: object unique id. ex: '5656565656565656'
             *
             * Parameters (optional):
             * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns UtilityPayment Log object with updated attributes
             *
             */
            function get(id: string, params?:{ user?: Project | Organization | null}): Promise<utilityPayment.Log>;

            /**
             *
             * Retrieve paged UtilityPayment Logs
             *
             * @description Receive a list of up to 100 UtilityPayment.Log objects previously created in the Stark Bank API and the cursor to the next page.
             * Use this function instead of query if you want to manually page your requests.
             *
             * Parameters (optional):
             * @param cursor [string, default null]: cursor returned on the previous page function call
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter retrieved objects by event types. ex: 'paid' or 'registered'
             * @param paymentIds [list of strings, default null]: list of UtilityPayment ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of UtilityPayment.Log objects with updated attributes and cursor to retrieve the next page of UtilityPayment.Log objects
             *
             */
            function page(params?: { 
                cursor?: string | null, 
                limit?: number | null, 
                after?: string | null, 
                before?: string | null, 
                types?: string[] | null, 
                paymentIds?: string[] | null, 
                user?: Project | Organization | null
            }): Promise<[utilityPayment.Log[], string | null]>;

            /**
             *
             * Retrieve UtilityPayment Logs
             *
             * @description Receive a generator of UtilityPayment Log objects previously created in the Stark Bank API
             *
             * Parameters (optional):
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter retrieved objects by event types. ex: 'paid' or 'registered'
             * @param paymentIds [list of strings, default null]: list of UtilityPayment ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of UtilityPayment Log objects with updated attributes
             *
             */
            function query(params?: { 
                limit?: number | null, 
                after?: string | null, 
                before?: string | null, 
                types?: string[] | null, 
                paymentIds?: string[] | null, 
                user?: Project | Organization | null
            }): Promise<utilityPayment.Log[]>;
        }
    }
}
