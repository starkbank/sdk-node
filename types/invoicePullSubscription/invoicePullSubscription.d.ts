
declare module 'starkbank' {

    export class InvoicePullSubscription {
        /**
         *
         * InvoicePullSubscription object
         *
         * @description When you initialize an InvoicePullSubscription, the entity will not be automatically
         * sent to the Stark Bank API. The 'create' function sends the objects
         * to the Stark Bank API and returns the list of created objects.
         *
         * Parameters (required):
         * @param start [string]: subscription start date. ex: "2022-04-01"
         * @param interval [string]: subscription installment interval. Options: "week", "month", "quarter", "semester", "year"
         * @param pullMode [string]: subscription pull mode. Options: "manual", "automatic". Automatic mode will create the Invoice Pull Requests automatically
         * @param pullRetryLimit [integer]: subscription pull retry limit. Options: 0,
         * @param type [string]: subscription type. Options: "push", "qrcode", "qrcodeAndPayment", "paymentAndOrQrcode"
         *
         * Parameters (conditionally required):
         * @param amount [integer, default 0]: subscription amount in cents. Required if an amountMinLimit is not informed. Minimum = 1 (R$ 0.01). ex: 100 (= R$ 1.00)
         * @param amountMinLimit [integer, 0 None]: subscription minimum amount in cents. Required if an amount is not informed. Minimum = 1 (R$ 0.01). ex: 100 (= R$ 1.00)
         *
         * Parameters (optional):
         * @param displayDescription [string, default None]: Invoice description to be shown to the payer. ex: "Subscription payment"
         * @param due [string, default 2 days after creation]: subscription invoice due offset. Available only for type "push". ex: '2023-04-01'
         * @param externalId [string, default None]: string that must be unique among all your subscriptions. Duplicated externalIds will cause failures. ex: "my-external-id"
         * @param referenceCode [string, default None]: reference code for reconciliation. ex: "REF123456"
         * @param end [string, default None]: subscription end date. ex: "2023-04-01"
         * @param data [dictionary, default None]: additional data for the subscription based on type
         * @param name [string, default None]: subscription debtor name. ex: "Iron Bank S.A."
         * @param taxId [string, default None]: subscription debtor tax ID (CPF or CNPJ) with or without formatting. ex: "01234567890" or "20.018.183/0001-80"
         * @param tags [list of strings, default []]: list of strings for tagging
         *
         * Attributes (return-only):
         * @param id [string]: unique id returned when InvoicePullSubscription is created. ex: "5656565656565656"
         * @param status [string]: current InvoicePullSubscription status. ex: "active", "canceled", "created", "expired"
         * @param bacenId [string]: unique authentication id at the Central Bank. ex: "RR2001818320250616dtsPkBVaBYs"
         * @param brcode [string]: Brcode string for the InvoicePullSubscription. ex: "00020101021126580014br.gov.bcb.pix0114+5599999999990210starkbank.com.br520400005303986540410000000000005802BR5913Stark Bank S.A.6009SAO PAULO62070503***6304D2B1"
         * @param installmentId [string]: unique id of the installment related to this request. ex: "5656565656565656"
         * @param created [string]: creation datetime for the Invoice. ex: '2020-03-10 10:30:00.000000+00:00'
         * @param updated [string]: creation datetime for the Invoice. ex: '2020-03-10 10:30:00.000000+00:00'
         *
         */

        start: string
        interval: string
        pullMode: string
        pullRetryLimit: number
        type: string

        amount: number
        amountMinLimit: number

        displayDescription: string | null
        due: number | null
        externalId: string | null
        referenceCode: string | null
        end: string | null
        data: {} | null
        name: string | null
        taxId: string | null
        tags: string[] | null

        readonly id: string
        readonly status: string
        readonly bacenId: string
        readonly brcode: string
        readonly installmentId: string
        readonly created: string
        readonly updated: string

        constructor(params: {
            start: string, interval: string, pullMode: string, pullRetryLimit: number, type: string, amount: number, amountMinLimit: number, displayDescription?: string | null,
            due?: number | null, externalId?: string | null, referenceCode?: string | null, end?: string | null, data?: {} | null, name?: string | null, taxId?: string | null, tags?: string[] | null,
            id?: string | null, status?: string | null, bacenId?: string | null, brcode?: string | null, installmentId?: string | null, created?: string | null, updated?: string | null
        })
    }

    export namespace invoicePullSubscription {

        /**
         *
         * Create InvoicePullSubscriptions
         *
         * @description Send a list of InvoicePullSubscription objects for creation in the Stark Bank API
         *
         * Parameters (required):
         * @param subscriptions [list of InvoicePullSubscription objects]: list of InvoicePullSubscription objects to be created in the API
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns list of InvoicePullSubscription objects with updated attributes
         *
         */
        export function create(subscriptions: InvoicePullSubscription[], params?: { user?: Project | Organization | null }): Promise<InvoicePullSubscription[]>;

        /**
         *
         * Retrieve a specific InvoicePullSubscription
         *
         * @description Receive a single InvoicePullSubscription object previously created in the Stark Bank API by passing its id
         *
         * Parameters (required):
         * @param id [string]: object unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns InvoicePullSubscription object with updated attributes
         *
         */
        export function get(id: string, params?: { user?: Project | Organization | null }): Promise<InvoicePullSubscription>;

        /**
         *
         * Retrieve InvoicePullSubscriptions
         *
         * @description Receive a generator of InvoicePullSubscription objects previously created in the Stark Bank API
         *
         * Parameters (optional):
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null]: date filter for objects created or updated only after specified date. ex: '2020-03-10'
         * @param before [string, default null]: date filter for objects created or updated only before specified date. ex: '2020-03-10'
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
         * @param status [string, default null]: filter for status of retrieved objects. ex: "active", "canceled", "created", "expired"
         * @param expand [list of strings, default null]: fields to expand information. ex: ["data"]
         * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns generator of InvoicePullSubscription objects with updated attributes
         *
         */
        export function query(params?: {
            limit?: number | null,
            after?: string | null,
            before?: string | null,
            tags?: string[] | null,
            ids?: string[] | null,
            status?: string | null,
            expand?: string[] | null,
            user?: Project | Organization | null,
        }): Promise<InvoicePullSubscription[]>;

        /**
         *
         * Retrieve paged InvoicePullSubscriptions
         *
         * @description Receive a list of up to 100 InvoicePullSubscription objects previously created in the Stark Bank API and the cursor to the next page.
         * Use this function instead of query if you want to manually page your requests.
         *
         * Parameters (optional):
         * @param cursor [string, default null]: cursor returned on the previous page function call.
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null]: date filter for objects created or updated only after specified date. ex: '2020-03-10'
         * @param before [string, default null]: date filter for objects created or updated only before specified date. ex: '2020-03-10'
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
         * @param status [string, default null]: filter for status of retrieved objects. ex: ex: "active", "canceled", "created", "expired"
         * @param expand [list of strings, default null]: fields to expand information. ex: ["data"]
         * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns list of InvoicePullSubscription objects with updated attributes and cursor to retrieve the next page of InvoicePullSubscription objects
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
            expand?: string[] | null,
            user?: Project | Organization | null,
        }): Promise<[InvoicePullSubscription[], string | null]>;
        
        /**
         *
         * Cancel a InvoicePullSubscription entity
         *
         * @description Cancel a InvoicePullSubscription entity previously created in the Stark Bank API
         *
         * Parameters (required):
         * @param id [string]: InvoicePullSubscription unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns canceled InvoicePullSubscription object
         *
         */
        export function cancel(id: string, params?: { user?: Project | Organization | null }): Promise<InvoicePullSubscription>;

        export class Log {
            /**
             *
             * InvoicePullSubscription Log object
             *
             * @description Every time an InvoicePullSubscription entity is updated, a corresponding InvoicePullSubscription.Log
             * is generated for the entity. This log is never generated by the user,
             * but it can be retrieved to check additional information on the InvoicePullSubscription.

            *
            * Attributes:
            * @param id [string]: unique id returned when the log is created. ex: '5656565656565656'
            * @param subscription [InvoicePullSubscription]: InvoicePullSubscription entity to which the log refers to.
            * @param errors [list of strings]: list of errors linked to this InvoicePullSubscription event.
            * @param type [string]: type of the InvoicePullSubscription event which triggered the log creation. ex: 'pending' or 'success'
            * @param created [string]: creation datetime for the log. ex: '2020-03-10 10:30:00.000'
            *
            */
            readonly id: string
            readonly subscription: InvoicePullSubscription
            readonly errors: string[]
            readonly type: string
            readonly created: string

            constructor(id: string, subscription: InvoicePullSubscription, errors: string[], type: string, created: string)
        }

        export namespace log {
            /**
             *
             * Retrieve a specific InvoicePullSubscription Log
             *
             * @description Receive a single InvoicePullSubscription Log object previously created by the Stark Bank API by passing its id
             *
             * Parameters (required):
             * @param id [string]: object unique id. ex: '5656565656565656'
             *
             * Parameters (optional):
             * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns InvoicePullSubscription Log object with updated attributes
             *
             */
            export function get(id: string, params?: { user?: Project | Organization | null }): Promise<InvoicePullSubscription.Log>;

            /**
             *
             * Retrieve InvoicePullSubscription Logs
             *
             * @description Receive a generator of InvoicePullSubscription Log objects previously created in the Stark Bank API
             *
             * Parameters (optional):
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter for log event types. ex: "created", "paid", "canceled" or "overdue"
             * @param subscriptionIds [list of strings, default null]: list of Subscription IDs ids to filter logs. ex: ["5656565656565656", "4545454545454545"]
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of InvoicePullSubscription Log objects with updated attributes
             *
             */
            export function query(params?: {
                limit?: number | null,
                after?: string | null,
                before?: string | null,
                types?: string[] | null,
                subscriptionIds?: string[] | null,
                user?: Project | Organization | null
            }): Promise<InvoicePullSubscription.Log[]>;

            /**
             *
             * Retrieve paged InvoicePullSubscription Logs
             *
             * @description Receive a list of up to 100 InvoicePullSubscription Log objects previously created in the Stark Bank API and the cursor to the next page.
             * Use this function instead of query if you want to manually page your requests.
             *
             * Parameters (optional):
             * @param cursor [string, default null]: cursor returned on the previous page function call.
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter for log event types. ex: "created", "paid", "canceled" or "overdue"
             * @param subscriptionIds [list of strings, default null]: list of Subscription IDs ids to filter logs. ex: ["5656565656565656", "4545454545454545"]
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of InvoicePullSubscription Log objects with updated attributes and cursor to retrieve the next page of InvoicePullSubscription Log objects
             *
             */
            export function page(params?: {
                cursor?: string | null,
                limit?: number | null,
                after?: string | null,
                before?: string | null,
                types?: string[] | null,
                subscriptionIds?: string[] | null,
                user?: Project | Organization | null
            }): Promise<[InvoicePullSubscription.Log[], string | null]>;
        }
    }
}