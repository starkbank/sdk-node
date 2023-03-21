
declare module 'starkbank' {
        
    export class BrcodePayment {
        /**
         *
         * BrcodePayment object
         *
         * @description When you initialize a BrcodePayment, the entity will not be automatically
         * created in the Stark Bank API. The 'create' function sends the objects
         * to the Stark Bank API and returns the list of created objects.
         * 
         * Parameters (required):
         * @param brcode [string]: String loaded directly from the QRCode or copied from the invoice. ex: "00020126580014br.gov.bcb.pix0136a629532e-7693-4846-852d-1bbff817b5a8520400005303986540510.005802BR5908T'Challa6009Sao Paulo62090505123456304B14A"
         * @param taxId [string]: receiver tax ID (CPF or CNPJ) with or without formatting. ex: '01234567890' or '20.018.183/0001-80'
         * @param description [string]: Text to be displayed in your statement (min. 10 characters). ex: 'payment ABC'
         * 
         * Parameters (required):
         * @param amount [int, default null]: amount automatically calculated from line or barCode. ex: 23456 (= R$ 234.56)
         * 
         * Parameters (optional):
         * @param scheduled [string, default now]: payment scheduled date or datetime. ex: '2020-11-25T17:59:26.249976+00:00'
         * @param tags [list of strings, default null]: list of strings for tagging
         * @param rules [list of BrcodePayment.Rules, default []]: list of BrcodePayment.Rule objects for modifying transfer behavior. ex: [BrcodePayment.Rule(key="resendingLimit", value=5)]
         * 
         * Attributes (return-only):
         * @param id [string]: unique id returned when payment is created. ex: '5656565656565656'
         * @param name [string]: receiver name. ex: 'Jon Snow'
         * @param status [string]: current payment status. ex: 'success' or 'failed'
         * @param type [string]: brcode type. ex: 'static' or 'dynamic'
         * @param fee [integer]: fee charged when the brcode payment is created. ex: 200 (= R$ 2.00)
         * @param updated [string]: latest update datetime for the payment. ex: '2020-11-25T17:59:26.249976+00:00'
         * @param created [string]: creation datetime for the payment. ex: '2020-11-25T17:59:26.249976+00:00'
         *
         */

        brcode : string
        taxId : string
        description : string
        
        amount : number | null
        
        scheduled : string | null
        tags : string[] | null
        rules : brcodePayment.Rule[] | null

        readonly id : string
        readonly name : string
        readonly status : string
        readonly type : string
        readonly fee : number
        readonly updated : string
        readonly created : string

        constructor(params: {
            brcode: string, taxId: string, description: string, amount?: number | null, scheduled?: string | null, 
            tags?: string[] | null, rules?: brcodePayment.Rule[] | null, name?: string | null, status?: string | null, type?: string | null, 
            fee?: number | null, updated?: string | null, created?: string | null, 
        })
    }

    export namespace brcodePayment {
        /**
         *
         * Create BrcodePayments
         *
         * @description Send a list of BrcodePayment objects for creation in the Stark Bank API
         *
         * Parameters (required):
         * @param payments [list of BrcodePayment objects]: list of BrcodePayment objects to be created in the API
         *
         * Parameters (optional):
         * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns list of BrcodePayment objects with updated attributes
         *
         */
        function create(payments: BrcodePayment[] | {}[], params?:{ user?: Project | Organization | null}): Promise<BrcodePayment[]>;

        /**
         *
         * Retrieve a specific BrcodePayment
         *
         * @description Receive a single BrcodePayment object previously created in the Stark Bank API by passing its id
         *
         * Parameters (required):
         * @param id [string]: object unique id. ex: '5656565656565656'
         * 
         * Parameters (optional):
         * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @returns BrcodePayment object with updated attributes
         *
         */
        function get(id: string, params?:{ user?: Project | Organization | null}): Promise<BrcodePayment>;

        /**
         *
         * Retrieve paged BrcodePayments
         *
         * @description Receive a list of up to 100 BrcodePayment objects previously created in the Stark Bank API and the cursor to the next page.
         * Use this function instead of query if you want to manually page your requests.
         *
         * Parameters (optional):
         * @param cursor [string, default null]: cursor returned on the previous page function call
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
         * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
         * @param status [string, default null]: filter for status of retrieved objects. ex: 'success'
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
         * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns list of BrcodePayment objects with updated attributes and cursor to retrieve the next page of BrcodePayment objects
         *
         */
        function page(params?: { 
            cursor?: string | null, 
            limit?: number | null,
            after?: string | null,
            before?: string | null,
            status?: string | null,
            tags?: string[] | null,
            ids?: string[] | null,
            user?: Project | Organization | null
        }): Promise<[BrcodePayment[], string | null]>;
        
        /**
         *
         * Retrieve a specific BrcodePayment pdf file
         *
         * @description Receive a single BrcodePayment pdf file generated in the Stark Bank API by passing its id.
         *
         * Parameters (required):
         * @param id [string]: object unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns BrcodePayment pdf file
         *
         */
        function pdf(id: string, params?:{ user?: Project | Organization | null}): Promise<Buffer>;

        /**
         *
         * Retrieve BrcodePayments
         *
         * @description Receive a generator of BrcodePayment objects previously created in the Stark Bank API
         *
         * Parameters (optional):
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
         * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
         * @param status [string, default null]: filter for status of retrieved objects. ex: 'success'
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
         * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns generator of BrcodePayment objects with updated attributes
         *
         */
        function query(params?: { limit?: number, 
            after?: string | null
            before?: string | null
            status?: string | null
            tags?: string[] | null
            ids?: string[] | null
            user?: Project | Organization | null
        }): Promise<BrcodePayment[]>

        /**
         *
         * Update BrcodePayment entity
         *
         * @description Update BrcodePayment by passing id.
         *
         * Parameters (required):
         * @param id [string]: BrcodePayment id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param status        [string]: If the BrcodePayment hasn't been paid yet, you may cancel it by passing 'canceled' in the status
         * @param user          [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns target BrcodePayment with updated attributes
         *
         */
        function update(id: string, params?: {status: string, user?: Project | Organization | null}): Promise<BrcodePayment>;

        export class Rule {
            /**
             *
             * BrcodePayment.Rule object
             *
             * @description The BrcodePayment.Rule object modifies the behavior of BrcodePayment objects when passed as an argument upon their creation.
             *
             * Parameters (required):
             * @param key [string]: Rule to be customized, describes what BrcodePayment behavior will be altered. ex: "resendingLimit"
             * @param value [integer]: Value of the rule. ex: 5
             * 
             */
            key: string
            value: number

            constructor(params: {
                key: string,
                value: number 
            })
        }

        export class Log {
            /**
             *
             * BrcodePayment Log object
             *
             * @description Every time a BrcodePayment entity is updated, a corresponding BrcodePayment Log
             * is generated for the entity. This log is never generated by the
             * user, but it can be retrieved to check additional information
             * on the BrcodePayment.
             *
             * Attributes:
             * @param id [string]: unique id returned when the log is created. ex: '5656565656565656'
             * @param payment [BrcodePayment]: BrcodePayment entity to which the log refers to.
             * @param errors [list of strings]: list of errors linked to this BrcodePayment event
             * @param type [string]: type of the BrcodePayment event which triggered the log creation. ex: 'success'
             * @param created [string]: creation datetime for the log. ex: '2020-03-10 10:30:00.000'
             *
             */

            readonly id : string
            readonly payment : BrcodePayment
            readonly errors: string[]
            readonly type : string
            readonly created : string

            constructor(id: string, payment: BrcodePayment, errors: string[], type: string, created: string)
        }

        namespace log {
            /**
             *
             * Retrieve a specific BrcodePayment Log
             *
             * @description Receive a single BrcodePayment Log object previously created by the Stark Bank API by passing its id
             *
             * Parameters (required):
             * @param id [string]: object unique id. ex: '5656565656565656'
             *
             * Parameters (optional):
             * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns BrcodePayment Log object with updated attributes
             *
             */
            function get(id: string, params?:{ user?: Project | Organization | null}): Promise<brcodePayment.Log>;

            /**
             *
             * Retrieve paged BrcodePayment Logs
             *
             * @description Receive a list of up to 100 BrcodePayment.Log objects previously created in the Stark Bank API and the cursor to the next page.
             * Use this function instead of query if you want to manually page your requests.
             *
             * Parameters (optional):
             * @param cursor [string, default null]: cursor returned on the previous page function call
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter for log event types. ex: 'success'
             * @param paymentIds [list of strings, default null]: list of BrcodePayment ids to filter logs. ex: ['5656565656565656', '4545454545454545']
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of BrcodePayment Log objects with updated attributes and cursor to retrieve the next page of BrcodePayment.Log objects
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
            }): Promise<[brcodePayment.Log[], string | null]>;

            /**
             *
             * Retrieve BrcodePayment Logs
             *
             * @description Receive a generator of BrcodePayment Log objects previously created in the Stark Bank API
             *
             * Parameters (optional):
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter for log event types. ex: 'success'
             * @param paymentIds [list of strings, default null]: list of BrcodePayment ids to filter logs. ex: ['5656565656565656', '4545454545454545']
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of BrcodePayment Log objects with updated attributes
             *
             */
            function query(params?: { 
                limit?: number | null,
                after?: string | null,
                before?: string | null,
                types?: string[] | null,
                paymentIds?: string[] | null,
                user?: Project | Organization | null
            }): Promise<brcodePayment.Log[]>;
        }
    }
}
