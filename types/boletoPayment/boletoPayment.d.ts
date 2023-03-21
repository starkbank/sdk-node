
declare module 'starkbank' {
        
    export class BoletoPayment {
        /**
         *
         * BoletoPayment object
         *
         * @description When you initialize a BoletoPayment, the entity will not be automatically
         * created in the Stark Bank API. The 'create' function sends the objects
         * to the Stark Bank API and returns the list of created objects.
         *
         * Parameters (conditionally required):
         * @param line [string, default null]: Number sequence that describes the payment. Either 'line' or 'barCode' parameters are required. If both are sent, they must match. ex: '34191.09008 63571.277308 71444.640008 5 81960000000062'
         * @param barCode [string, default null]: Bar code number that describes the payment. Either 'line' or 'barCode' parameters are required. If both are sent, they must match. ex: '34195819600000000621090063571277307144464000'
         *
         * Parameters (required):
         * @param taxId [string]: receiver tax ID (CPF or CNPJ) with or without formatting. ex: '01234567890' or '20.018.183/0001-80'
         * @param description [string]: Text to be displayed in your statement (min. 10 characters). ex: 'payment ABC'
         *
         * Parameters (optional):
         * @param amount [int, default null]: amount to be paid. If null is informed, the current boleto value will be used. ex: 23456 (= R$ 234.56)
         * @param scheduled [string, default today]: payment scheduled date. ex: '2020-03-10'
         * @param tags [list of strings, default null]: list of strings for tagging
         *
         * Attributes (return-only):
         * @param id [string]: unique id returned when payment is created. ex: '5656565656565656'
         * @param status [string]: current payment status. ex: 'success' or 'failed'
         * @param transactionIds [list of strings]: ledger transaction ids linked to this BoletoPayment. ex: ['19827356981273']
         * @param fee [integer]: fee charged when boleto payment is created. ex: 200 (= R$ 2.00)
         * @param created [string]: creation datetime for the payment. ex: '2020-03-10 10:30:00.000'
         *
         */

        line? : string | null
        barCode? : string

        taxId : string
        description : string

        amount : number | null
        scheduled : string | null
        tags : string | null

        readonly id : string
        readonly status : string
        readonly transactionIds : string[]
        readonly fee : number
        readonly created : string

        constructor(params: {
            taxId: string,
            description: string,
            line?: string,
            barCode?: string,
            amount?: number | null,
            scheduled?: string | null,
            tags?: string[] | null,
            status?: string | null,
            transactionIds?: string[] | null,
            fee?: number | null,
            created?: string | null,
        })
    }

    export namespace boletoPayment {
        /**
         *
         * Create BoletoPayments
         *
         * @description Send a list of BoletoPayment objects for creation in the Stark Bank API
         *
         * Parameters (required):
         * @param payments [list of BoletoPayment objects]: list of BoletoPayment objects to be created in the API
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns list of BoletoPayment objects with updated attributes
         *
         */
        export function create(payments: BoletoPayment[] | {}[], params?:{ user?: Project | Organization | null}): Promise<BoletoPayment[]>;

        /**
         *
         * Retrieve a specific BoletoPayment
         *
         * @description Receive a single BoletoPayment object previously created by the Stark Bank API by passing its id
         *
         * Parameters (required):
         * @param id [string]: object unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns BoletoPayment object with updated attributes
         *
         */
        export function get(id: string, params?:{ user?: Project | Organization | null }): Promise<BoletoPayment>;

        /**
         *
         * Retrieve paged BoletoPayments
         *
         * @description Receive a list of up to 100 BoletoPayment objects previously created in the Stark Bank API and the cursor to the next page.
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
         * @returns list of BoletoPayment objects with updated attributes and cursor to retrieve the next page of BoletoPayment objects
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
        }): Promise<[BoletoPayment[], string | null]>;

        /**
         *
         * Retrieve a specific BoletoPayment pdf file
         *
         * @description Receive a single BoletoPayment pdf file generated in the Stark Bank API by passing its id.
         * Only valid for boleto payments with 'success' status.
         *
         * Parameters (required):
         * @param id [string]: object unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns BoletoPayment pdf file
         *
         */
        export function pdf(id: string, params?:{ user?: Project | Organization | null}): Promise<Buffer>;

        /**
         *
         * Retrieve BoletoPayments
         *
         * @description Receive a generator of BoletoPayment objects previously created in the Stark Bank API
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
         * @returns generator of BoletoPayment objects with updated attributes
         *
         */
        export function query(params?: { 
            limit?: number | null,
            after?: string | null,
            before?: string | null,
            tags?: string[] | null,
            ids?: string[] | null,
            status?: string[] | null,
            user?: Project | Organization | null
        }): Promise<BoletoPayment[]>;

        /**
         *
         * Delete a BoletoPayment entity
         *
         * @description Delete a BoletoPayment entity previously created in the Stark Bank API
         *
         * Parameters (required):
         * @param id [string]: BoletoPayment unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns deleted BoletoPayment object
         *
         */
        function _delete(id: string, params?:{ user?: Project | Organization | null}): Promise<BoletoPayment>;
        export { _delete as delete }

        export class Log {
            /**
             *
             * BoletoPayment Log object
             *
             * @description Every time a BoletoPayment entity is modified, a corresponding BoletoPayment Log
             * is generated for the entity. This log is never generated by the
             * user, but it can be retrieved to check additional information
             * on the BoletoPayment.
             *
             * Attributes:
             * @param id [string]: unique id returned when the log is created. ex: '5656565656565656'
             * @param payment [BoletoPayment]: BoletoPayment entity to which the log refers to.
             * @param errors [list of strings]: list of errors linked to this BoletoPayment event.
             * @param type [string]: type of the BoletoPayment event which triggered the log creation. ex: 'success' or 'failed'
             * @param created [string]: creation datetime for the log. ex: '2020-03-10 10:30:00.000'
             *
             */

            readonly id : string
            readonly payment : BoletoPayment
            readonly errors: string[]
            readonly type : string
            readonly created : string

            constructor(id: string, payment: BoletoPayment, errors: string[], type: string, created: string)
        }

        export namespace log {
            /**
             *
             * Retrieve a specific BoletoPayment Log
             *
             * @description Receive a single BoletoPayment Log object previously created by the Stark Bank API by passing its id
             *
             * Parameters (required):
             * @param id [string]: object unique id. ex: '5656565656565656'
             *
             * Parameters (optional):
             * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns BoletoPayment Log object with updated attributes
             *
             */
            function get(id: string, params?:{ user?: Project | Organization | null}): Promise<boletoPayment.Log>;
            
            /**
             *
             * Retrieve paged BoletoPayment Logs
             *
             * @description Receive a list of up to 100 BoletoPayment.Log objects previously created in the Stark Bank API and the cursor to the next page.
             * Use this function instead of query if you want to manually page your requests.
             *
             * Parameters (optional):
             * @param cursor [string, default null]: cursor returned on the previous page function call
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter retrieved objects by event types. ex: 'paid' or 'registered'
             * @param paymentIds [list of strings, default null]: list of BoletoPayment ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of BoletoPayment Log objects with updated attributes and cursor to retrieve the next page of BoletoPayment.Log objects
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
            }): Promise<[boletoPayment.Log[], string | null]>;

            /**
             *
             * Retrieve BoletoPayment Logs
             *
             * @description Receive a generator of BoletoPayment Log objects previously created in the Stark Bank API
             *
             * Parameters (optional):
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter retrieved objects by event types. ex: 'paid' or 'registered'
             * @param paymentIds [list of strings, default null]: list of BoletoPayment ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of BoletoPayment Log objects with updated attributes
             *
             */
            function query(params?: { 
                limit?: number | null, 
                after?: string | null, 
                before?: string | null,
                types?: string[] | null, 
                paymentIds?: string[] | null, 
                user?: Project | Organization | null
            }): Promise<boletoPayment.Log[]>;
        }
    }
}
