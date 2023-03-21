
declare module 'starkbank' {

    export class PaymentRequest {
        /**
         * PaymentRequest constructor
         *
         * A PaymentRequest is an indirect request to access a specific cash-out service
         * (such as Transfer, BoletoPayments, etc.) which goes through the cost center
         * approval flow on our website. To emit a PaymentRequest, you must direct it to
         * a specific cost center by its ID, which can be retrieved on our website at the
         * cost center page.
         * 
         * Parameters (required):
         * @param centerId [string]: target cost center ID. ex: '5656565656565656'
         * @param payment [Transfer, BoletoPayment, UtilityPayment, Transaction, BrcodePayment or dictionary]: payment entity that should be approved and executed.
         * 
         * Parameters (conditionally required):
         * @param type [string]: payment type, inferred from the payment parameter if it is not a dictionary. ex: 'transfer', 'boleto-payment'
         * 
         * Parameters (optional):
         * @param due [string]: PaymentRequest target date in ISO format.
         * @param tags [string]: list of strings for tagging
         * 
         * Attributes (return-only):
         * @param id [string]: Object's id
         * @param amount [integer]: PaymentRequest amount. ex: 100000 = R$1.000,00
         * @param description [string]: payment request description. ex: "Tony Stark's Suit"
         * @param status [string]: current PaymentRequest status.ex: 'pending' or 'approved'
         * @param actions [list of dictionaries]: list of actions that are affecting this PaymentRequest. ex: [{'type': 'member', 'id': '56565656565656, 'action': 'requested'}]
         * @param updated [datetime string]: latest update datetime for the PaymentRequest. ex: 2020-12-31
         * @param created [datetime string]: creation datetime for the PaymentRequest. ex: 2020-12-31
         */

        centerId: string
        payment: Transfer | BoletoPayment | UtilityPayment | Transaction | BrcodePayment | {}

        type: string

        due: string
        tags: string[]

        readonly id: string
        readonly amount: number | null
        readonly description: string | null
        readonly status: string | null
        readonly actions: {
            type: string
            id: string
            action: string
        }[] | null
        readonly updated: string | null
        readonly created: string | null

        constructor(params: {
            centerId: string, payment: Transfer | BoletoPayment | UtilityPayment | Transaction | BrcodePayment | {}, 
            type?: string, due?: string, tags?: string[], id?: string | null | null, amount?: number | null, 
            status?: string | null, description?: string | null, actions?: {type: string, id: string, 
            action: string}[] | null, updated?: string | null, created?: string | null
        })
    }

    export namespace paymentRequest {
        /**
         * Create PaymentRequests
         * 
         * @description Send a list of PaymentRequests objects for creation in the Stark Bank API
         *
         * Parameters (required):
         * @param paymentRequests [list of PaymentRequest objects]: list of PaymentRequest objects to be created in the API
         * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @return list of PaymentRequest objects with updated attributes
         */
        function create(paymentRequests: PaymentRequest[], params?:{ user?: Project | Organization | null}): Promise<PaymentRequest[]>;

        /**
         *
         * Retrieve paged PaymentRequests
         *
         * @description Receive a list of up to 100 PaymentRequest objects previously created in the Stark Bank API and the cursor to the next page.
         * Use this function instead of query if you want to manually page your requests.
         *
         * Parameters (required):
         * @param centerId [string]: target cost center ID. ex: '5656565656565656'
         * 
         * Parameters (optional):
         * @param cursor [string, default null]: cursor returned on the previous page function call
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null] date filter for objects created/due only after specified date. ex: '2020-03-10'
         * @param before [string, default null] date filter for objects created/due only before specified date. ex: '2020-03-10'
         * @param sort [string, default '-created']: sort order considered in response.Valid options are '-created' or '-due'.
         * @param status [string, default null]: filter for status of retrieved objects.ex: 'success' or 'failed'
         * @param type [string, default null]: payment type , inferred from the payment parameter if it is not a dictionary.ex: 'transfer', 'boleto-payment'
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
         * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns list of PaymentRequests objects with updated attributes and cursor to retrieve the next page of PaymentRequests objects
         *
         */
        function page(params?: { 
            cursor?: string | null, 
            centerId: string | null, 
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            sort?: string | null, 
            status?: string | null, 
            type?: string | null, 
            tags?: string[] | null, 
            ids?: string[] | null, 
            user?: Project | Organization | null
        }): Promise<[PaymentRequest[], string | null]>;

        /**
         *
         * Retrieve PaymentRequests
         *
         * @description Receive a generator of PaymentRequests objects previously created in the Stark Bank API
         *
         * Parameters (required):
         * @param centerId [string]: target cost center ID. ex: '5656565656565656'
         * 
         * Parameters (optional):
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null] date filter for objects created/due only after specified date. ex: '2020-03-10'
         * @param before [string, default null] date filter for objects created/due only before specified date. ex: '2020-03-10'
         * @param sort [string, default '-created']: sort order considered in response.Valid options are '-created' or '-due'.
         * @param status [string, default null]: filter for status of retrieved objects.ex: 'success' or 'failed'
         * @param type [string, default null]: payment type , inferred from the payment parameter if it is not a dictionary.ex: 'transfer', 'boleto-payment'
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
         * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns generator of PaymentRequests objects with updated attributes
         *
         */
        function query(params?: {
            centerId: string | null, 
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            sort?: string | null, 
            status?: string | null, 
            type?: string | null, 
            tags?: string[] | null, 
            ids?: string[] | null, 
            user?: Project | Organization | null 
        }): Promise<PaymentRequest[]>;
    }
}
