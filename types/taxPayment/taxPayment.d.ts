
declare module 'starkbank' {

    export class TaxPayment {
        /**
         *
         * TaxPayment object
         *
         * @description When you initialize a TaxPayment, the entity will not be automatically
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
         * @param tags [list of strings, default null]: list of strings for tagging
         *
         * Attributes (return-only):
         * @param id [string]: unique id returned when payment is created. ex: '5656565656565656'
         * @param type [string]: tax type. ex: 'das'
         * @param status [string]: current payment status. ex: 'success' or 'failed'
         * @param amount [int]: amount automatically calculated from line or barCode. ex: 23456 (= R$ 234.56)
         * @param fee [integer]: fee charged when the tax payment is created. ex: 200 (= R$ 2.00)
         * @param transactionIds [list of strings]: ledger transaction ids linked to this TaxPayment. ex: ['19827356981273']
         * @param updated [string]: latest update datetime for the payment. ex: '2020-03-10 10:30:00.000'
         * @param created [string]: creation datetime for the payment. ex: '2020-03-10 10:30:00.000'
         *
         */

        description: string

        line: string
        barCode: string

        scheduled: string
        tags: string[]

        readonly id : string
        readonly type : string
        readonly status : string
        readonly amount : number
        readonly fee : number
        readonly transactionIds : string[]
        readonly updated : string
        readonly created : string

        constructor(params: {
            description: string, line?: string, barCode?: string, scheduled?: string, tags?: string[], 
            id?: string | null, type?: string | null, status?: string | null, amount?: number | null, 
            fee?: number | null, transactionIds?: string[] | null, updated?: string | null, 
            created?: string | null
        })
    }


    export namespace taxPayment {
        /**
         *
         * Create TaxPayments
         *
         * @description Send a list of TaxPayment objects for creation in the Stark Bank API
         *
         * Parameters (required):
         * @param payments [list of TaxPayment objects]: list of TaxPayment objects to be created in the API
         * 
         * Parameters (optional):
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @returns list of TaxPayment objects with updated attributes
         *
         */
        export function create(payments: TaxPayment[], params?:{ user?: Project | Organization | null}): Promise<TaxPayment[]>;
        
        /**
         *
         * Retrieve a specific TaxPayment
         *
         * @description Receive a single TaxPayment object previously created by the Stark Bank API by passing its id
         *
         * Parameters (required):
         * @param id [string]: object unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         */
        export function get(id: string, params?:{ user?: Project | Organization | null}): Promise<TaxPayment>;

        /**
         *
         * Retrieve paged TaxPayments
         *
         * @description Receive a list of up to 100 TaxPayment objects previously created in the Stark Bank API and the cursor to the next page.
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
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns list of TaxPayment objects with updated attributes and cursor to retrieve the next page of TaxPayment objects
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
        }): Promise<[TaxPayment[], string | null]>;

        /**
         *
         * Retrieve a specific TaxPayment pdf file
         *
         * @description Receive a single TaxPayment pdf file generated in the Stark Bank API by passing its id.
         * Only valid for tax payments with 'success' status.
         *
         * Parameters (required):
         * @param id [string]: object unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns TaxPayment pdf file
         *
         */
        export function pdf(id: string, params?:{ user?: Project | Organization | null}): Promise<Buffer>;
        
        /**
         *
         * Retrieve TaxPayments
         *
         * @description Receive a generator of TaxPayment objects previously created in the Stark Bank API
         *
         * Parameters (optional):
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
         * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
         * @param status [string, default null]: filter for status of retrieved objects. ex: 'success'
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns generator of TaxPayment objects with updated attributes
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
        }): Promise<TaxPayment[]>;

        /**
         *
         * Delete a TaxPayment entity
         *
         * @description Delete a TaxPayment entity previously created in the Stark Bank API
         *
         * Parameters (required):
         * @param id [string]: TaxPayment unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns deleted TaxPayment object
         *
         */
        function _delete(id: string, params?:{ user?: Project | Organization | null}): Promise<TaxPayment>;
        export { _delete as delete }

        export class Log {
            /**
             *
             * TaxPayment Log object
             *
             * @description Every time a TaxPayment entity is modified, a corresponding TaxPayment Log
             * is generated for the entity. This log is never generated by the user, but it can
             * be retrieved to check additional information on the TaxPayment.
             *
             * Attributes:
             * @param id [string]: unique id returned when the log is created. ex: '5656565656565656'
             * @param payment [TaxPayment]: TaxPayment entity to which the log refers to.
             * @param errors [list of strings]: list of errors linked to this TaxPayment event.
             * @param type [string]: type of the TaxPayment event which triggered the log creation. ex: 'processing' or 'success'
             * @param created [string]: creation datetime for the log. ex: '2020-03-10 10:30:00.000'
             *
             */

            readonly id : string
            readonly payment : TaxPayment
            readonly errors: string[]
            readonly type : string
            readonly created : string

            constructor(id: string, payment: TaxPayment, errors: string[], type: string, created: string)
        }

        export namespace log {
            /**
             *
             * Retrieve a specific TaxPayment Log
             *
             * @description Receive a single TaxPayment Log object previously created by the Stark Bank API by passing its id
             *
             * Parameters (required):
             * @param id [string]: object unique id. ex: '5656565656565656'
             *
             * Parameters (optional):
             * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns TaxPayment Log object with updated attributes
             *
             */
            function get(id: string, params?:{ user?: Project | Organization | null}): Promise<taxPayment.Log>;
            
            /**
             *
             * Retrieve paged TaxPayment Logs
             *
             * @description Receive a list of up to 100 TaxPayment.Log objects previously created in the Stark Bank API and the cursor to the next page.
             * Use this function instead of query if you want to manually page your requests.
             *
             * Parameters (optional):
             * @param cursor [string, default null]: cursor returned on the previous page function call
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter retrieved objects by event types. ex: 'paid' or 'registered'
             * @param paymentIds [list of strings, default null]: list of TaxPayment ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of TaxPayment.Log objects with updated attributes and cursor to retrieve the next page of TaxPayment.Log objects
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
            }): Promise<[taxPayment.Log[], string | null]>;

            /**
             *
             * Retrieve TaxPayment Logs
             *
             * @description Receive a generator of TaxPayment Log objects previously created in the Stark Bank API
             *
             * Parameters (optional):
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter retrieved objects by event types. ex: 'paid' or 'registered'
             * @param paymentIds [list of strings, default null]: list of TaxPayment ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of TaxPayment Log objects with updated attributes
             *
             */
            function query(params?: { 
                limit?: number | null, 
                after?: string | null, 
                before?: string | null, 
                types?: string[] | null, 
                paymentIds?: string[] | null, 
                user?: Project | Organization | null
            }): Promise<taxPayment.Log[]>;
        }
    }
}
