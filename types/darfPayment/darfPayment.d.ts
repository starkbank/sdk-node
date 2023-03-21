
declare module 'starkbank' {
    
    export class DarfPayment {
        /**
         *
         * DarfPayment object
         *
         * @description When you initialize a DarfPayment, the entity will not be automatically
         * created in the Stark Bank API. The 'create' function sends the objects
         * to the Stark Bank API and returns the list of created objects.
         * 
         * Parameters (required):
         * @param description [string]: Text to be displayed in your statement (min. 10 characters). ex: "payment ABC"
         * @param revenueCode [string]: 4-digit tax code assigned by Federal Revenue. ex: "5948"
         * @param taxId [string]: tax id (formatted or unformatted) of the payer. ex: "12.345.678/0001-95"
         * @param competence [string]: competence month of the service. ex: ex: '2020-03-10'
         * @param nominalAmount [int]: amount due in cents without fee or interest. ex: 23456 (= R$ 234.56)
         * @param fineAmount [int]: fixed amount due in cents for fines. ex: 234 (= R$ 2.34)
         * @param interestAmount [int]: amount due in cents for interest. ex: 456 (= R$ 4.56)
         * @param due [string]: due date for payment. ex: ex: '2020-03-10'
         *
         * Parameters (optional):
         * @param referenceNumber [string, default null]: number assigned to the region of the tax. ex: "08.1.17.00-4"
         * @param scheduled [string, default today]: payment scheduled date. ex: '2020-03-10'
         * @param tags [list of strings, default null]: list of strings for tagging
         *
         * Attributes (return-only):
         * @param id [string]: unique id returned when payment is created. ex: "5656565656565656"
         * @param status [string]: current payment status. ex: "success" or "failed"
         * @param amount [int]: Total amount due calculated from other amounts. ex: 24146 (= R$ 241.46)
         * @param fee [integer]: fee charged when the DarfPayment is processed. ex: 0 (= R$ 0.00)
         * @param transactionIds [list of strings]: ledger transaction ids linked to this DarfPayment. ex: ['19827356981273']
         * @param updated [string]: latest update datetime for the payment. ex: '2020-03-10 10:30:00.000'
         * @param created [string]: creation datetime for the payment. ex: '2020-03-10 10:30:00.000'
         *
         */

        description: string
        revenueCode: string
        taxId: string
        competence: string
        nominalAmount: number
        fineAmount: number
        interestAmount: number
        due: string

        referenceNumber: string
        scheduled: string
        tags: string[]

        readonly id : string
        readonly status : string
        readonly amount : number
        readonly fee : number
        readonly transactionIds : string[]
        readonly updated : string
        readonly created : string
        
        constructor(params: {
            description: string, revenueCode: string, taxId: string, competence: string, nominalAmount: number, 
            fineAmount: number, interestAmount: number, due: string, referenceNumber?: string | null, scheduled?: string | null, 
            tags?: string[] | null, status?: string | null, amount?: number | null, fee?: number | null, transactionIds?: string | null, updated?: string | null, 
            created?: string | null, 
        })
    }

    export namespace darfPayment {

        /**
         *
         * Create DarfPayments
         *
         * @description Send a list of DarfPayment objects for creation in the Stark Bank API
         *
         * Parameters (required):
         * @param payments [list of DarfPayment objects]: list of DarfPayment objects to be created in the API
         * 
         * Parameters (optional):
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @returns list of DarfPayment objects with updated attributes
         *
         */
        export function create(payments: DarfPayment[], params?:{ user?: Project | Organization | null}): Promise<DarfPayment[]>;

        /**
         *
         * Retrieve a specific DarfPayment
         *
         * @description Receive a single DarfPayment object previously created by the Stark Bank API by passing its id
         *
         * Parameters (required):
         * @param id [string]: object unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         */
        export function get(id: string, params?:{ user?: Project | Organization | null}): Promise<DarfPayment>;

        /**
         *
         * Retrieve paged DarfPayments
         *
         * @description Receive a list of up to 100 DarfPayment objects previously created in the Stark Bank API and the cursor to the next page.
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
         * @returns list of DarfPayment objects with updated attributes and cursor to retrieve the next page of DarfPayment objects
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
        }): Promise<[DarfPayment[], string | null]>;

        /**
         *
         * Retrieve a specific DarfPayment pdf file
         *
         * @description Receive a single DarfPayment pdf file generated in the Stark Bank API by passing its id.
         * Only valid for tax payments with 'success' status.
         *
         * Parameters (required):
         * @param id [string]: object unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns DarfPayment pdf file
         *
         */
        export function pdf(id: string | null, params?:{ user?: Project | Organization | null}): Promise<Buffer>;

        /**
         *
         * Retrieve DarfPayments
         *
         * @description Receive a generator of DarfPayment objects previously created in the Stark Bank API
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
         * @returns generator of DarfPayment objects with updated attributes
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
        }): Promise<DarfPayment[]>;

        /**
         *
         * Delete a DarfPayment entity
         *
         * @description Delete a DarfPayment entity previously created in the Stark Bank API
         *
         * Parameters (required):
         * @param id [string]: DarfPayment unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns deleted DarfPayment object
         *
         */
        function _delete(id: string, params?:{ user?: Project | Organization | null}): Promise<DarfPayment>;
        export { _delete as delete }

        export class Log {
            /**
             *
             * DarfPayment Log object
             *
             * @description Every time a DarfPayment entity is updated, a corresponding DarfPayment Log
             * is generated for the entity. This log is never generated by the
             * user, but it can be retrieved to check additional information
             * on the DarfPayment.
             *
             * Attributes:
             * @param id [string]: unique id returned when the log is created. ex: '5656565656565656'
             * @param payment [DarfPayment]: DarfPayment entity to which the log refers to.
             * @param errors [list of strings]: list of errors linked to this DarfPayment event
             * @param type [string]: type of the DarfPayment event which triggered the log creation. ex: 'success'
             * @param created [string]: creation datetime for the log. ex: '2020-03-10 10:30:00.000'
             *
             */

            readonly id : string
            readonly payment : DarfPayment
            readonly errors: string[]
            readonly type : string
            readonly created : string

            constructor(id: string, payment: DarfPayment, errors: string[], type: string, created: string)
        }

        export namespace log {

            /**
             *
             * Retrieve a specific DarfPayment Log
             *
             * @description Receive a single DarfPayment Log object previously created by the Stark Bank API by passing its id
             *
             * Parameters (required):
             * @param id [string]: object unique id. ex: '5656565656565656'
             *
             * Parameters (optional):
             * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns DarfPayment Log object with updated attributes
             *
             */
            function get(id: string, params?:{ user?: Project | Organization | null}): Promise<darfPayment.Log>;

            /**
             *
             * Retrieve paged DarfPayment Logs
             *
             * @description Receive a list of up to 100 DarfPayment.Log objects previously created in the Stark Bank API and the cursor to the next page.
             * Use this function instead of query if you want to manually page your requests.
             *
             * Parameters (optional):
             * @param cursor [string, default null]: cursor returned on the previous page function call
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter for log event types. ex: 'success'
             * @param paymentIds [list of strings, default null]: list of DarfPayment ids to filter logs. ex: ['5656565656565656', '4545454545454545']
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of DarfPayment Log objects with updated attributes and cursor to retrieve the next page of DarfPayment.Log objects
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
            }): Promise<[darfPayment.Log[], string | null]>;

            /**
             *
             * Retrieve DarfPayment Logs
             *
             * @description Receive a generator of DarfPayment Log objects previously created in the Stark Bank API
             *
             * Parameters (optional):
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter for log event types. ex: 'success'
             * @param paymentIds [list of strings, default null]: list of DarfPayment ids to filter logs. ex: ['5656565656565656', '4545454545454545']
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of DarfPayment Log objects with updated attributes
             *
             */
            function query(params?: { 
                limit?: number | null, 
                after?: string | null, 
                before?: string | null, 
                types?: string[] | null, 
                paymentIds?: string[] | null, 
                user?: Project | Organization | null
            }): Promise<darfPayment.Log[]>;
        }
    }
}
