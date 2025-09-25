declare module 'starkbank' {

    export class InvoicePullRequest {
        /**
         *
         * InvoicePullRequest object
         *
         * @description When you initialize an InvoicePullRequest, the entity will not be automatically
         * sent to the Stark Bank API. The 'create' function sends the objects
         * to the Stark Bank API and returns the list of created objects.
         *
         * Parameters (required):
         * @param subscriptionId [string]: unique id of the InvoicePullSubscription related to the request. ex: "5656565656565656"
         * @param invoiceId [string]: id of the invoice previously created to be sent for payment. ex: "5656565656565656"
         * @param due [string]: payment scheduled date in UTC ISO format. ex: "2023-10-28T17:59:26.249976+00:00"
         *
         * Parameters (optional):
         * @param attemptType [string, default "default"]: attempt type for the payment. Options: "default", "retry". ex: "retry"
         * @param tags [list of strings, default []]: list of strings for tagging
         * @param externalId [string, default None]: a string that must be unique among all your InvoicePullRequests. Duplicated externalIds will cause failures. ex: "my-external-id"
         * @param displayDescription [string, default None]: Description to be shown to the payer. ex: "Payment for services"
         *
         * Attributes (return-only):
         * @param id [string]: unique id returned when InvoicePullRequest is created. ex: "5656565656565656"
         * @param status [string]: current InvoicePullRequest status. ex: "pending", "scheduled", "success", "failed", "canceled"
         * @param installmentId [string]: unique id of the installment related to this request. ex: "5656565656565656"
         * @param created [string]: creation datetime for the Invoice. ex: '2020-03-10 10:30:00.000000+00:00'
         * @param updated [string]: creation datetime for the Invoice. ex: '2020-03-10 10:30:00.000000+00:00'
         *
         */

        subscriptionId: string;
        invoiceId: string;
        due: string;

        attemptType: string | null;
        tags: string[];
        externalId: string | null;
        displayDescription: string | null;

        readonly id : string
        readonly status : string
        readonly installmentId : string
        readonly created : string
        readonly updated : string
        
        constructor(params: {
            subscriptionId: string, invoiceId: string, due: string, attemptType?: string, tags?: string[],
            externalId?: string, displayDescription?: string, id?: string, status?: string, installmentId?: string,
            created?: string, updated?: string
        })
    }

    export namespace invoicePullRequest {
        /**
         *
         * Create InvoicePullRequests
         *
         * @description Send a list of InvoicePullRequest objects for creation in the Stark Bank API
         *
         * Parameters (required):
         * @param requests [list of InvoicePullRequest objects]: list of InvoicePullRequest objects to be created in the API
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns list of InvoicePullRequest objects with updated attributes
         *
         */
        export function create(requests: InvoicePullRequest[], params?: {user?: Project | Organization | null}): Promise<InvoicePullRequest[]>;

        /**
         *
         * Retrieve a specific InvoicePullRequest
         *
         * @description Receive a single InvoicePullRequest object previously created in the Stark Bank API by passing its id
         *
         * Parameters (required):
         * @param id [string]: object unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns InvoicePullRequest object with updated attributes
         *
         */
        export function get(id: string, params?: {user?: Project | Organization | null}): Promise<InvoicePullRequest>;

        /**
         *
         * Retrieve InvoicePullRequests
         *
         * @description Receive a generator of InvoicePullRequest objects previously created in the Stark Bank API
         *
         * Parameters (optional):
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null]: date filter for objects created or updated only after specified date. ex: '2020-03-10'
         * @param before [string, default null]: date filter for objects created or updated only before specified date. ex: '2020-03-10'
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
         * @param invoiceIds [list of strings, default null]: list of strings to get specific entities by invoice ids. ex: ["12376517623", "1928367198236"]
         * @param subscriptionIds [list of strings, default null]: list of strings to get specific entities by subscription ids. ex: ["12376517623", "1928367198236"]
         * @param externalIds [list of strings, default null]: list of strings to get specific entities by external ids. ex: ["my-external-id-1", "my-external-id-2"]
         * @param status [string, default null]: filter for status of retrieved objects. ex: 'success' or 'failed'
         * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns generator of InvoicePullRequest objects with updated attributes
         *
         */
        export function query(params?: {
            limit?: number | null,
            after?: string | null,
            before?: string | null,
            tags?: string[] | null,
            ids?: string[] | null,
            invoiceIds?: string[] | null,
            subscriptionIds?: string[] | null,
            externalIds?: string[] | null,
            status?: string | null,
            user?: Project | Organization | null,
        }): Promise<InvoicePullRequest[]>;

        /**
         *
         * Retrieve paged InvoicePullRequests
         *
         * @description Receive a list of up to 100 InvoicePullRequest objects previously created in the Stark Bank API and the cursor to the next page.
         * Use this function instead of query if you want to manually page your requests.
         *
         * Parameters (optional):
         * @param cursor [string, default null]: cursor returned on the previous page function call.
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null]: date filter for objects created or updated only after specified date. ex: '2020-03-10'
         * @param before [string, default null]: date filter for objects created or updated only before specified date. ex: '2020-03-10'
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
         * @param invoiceIds [list of strings, default null]: list of strings to get specific entities by invoice ids. ex: ["12376517623", "1928367198236"]
         * @param subscriptionIds [list of strings, default null]: list of strings to get specific entities by subscription ids. ex: ["12376517623", "1928367198236"]
         * @param externalIds [list of strings, default null]: list of strings to get specific entities by external ids. ex: ["my-external-id-1", "my-external-id-2"]
         * @param status [string, default null]: filter for status of retrieved objects. ex: 'success' or 'failed'
         * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns list of InvoicePullRequest objects with updated attributes and cursor to retrieve the next page of InvoicePullRequest objects
         *
         */
        export function page(params?: {
            cursor?: string | null,
            limit?: number | null,
            after?: string | null,
            before?: string | null,
            tags?: string[] | null,
            ids?: string[] | null,
            invoiceIds?: string[] | null,
            subscriptionIds?: string[] | null,
            externalIds?: string[] | null,
            status?: string | null,
            user?: Project | Organization | null,
        }): Promise<[InvoicePullRequest[], string | null]>;

        /**
         *
         * Cancel a InvoicePullRequest entity
         *
         * @description Cancel a InvoicePullRequest entity previously created in the Stark Bank API
         *
         * Parameters (required):
         * @param id [string]: InvoicePullRequest unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns canceled InvoicePullRequest object
         *
         */
        export function cancel(id: string, params?: {user?: Project | Organization | null}): Promise<InvoicePullRequest>;

        export class Log {
            /**
             *
             * InvoicePullRequest Log object
             *
             * @description Every time an InvoicePullRequest entity is updated, a corresponding InvoicePullRequest.Log
             * is generated for the entity. This log is never generated by the user,
             * but it can be retrieved to check additional information on the InvoicePullRequest.

            *
            * Attributes:
            * @param id [string]: unique id returned when the log is created. ex: '5656565656565656'
            * @param request [InvoicePullRequest]: InvoicePullRequest entity to which the log refers to.
            * @param errors [list of strings]: list of errors linked to this InvoicePullRequest event.
            * @param type [string]: type of the InvoicePullRequest event which triggered the log creation. ex: 'pending' or 'success'
            * @param created [string]: creation datetime for the log. ex: '2020-03-10 10:30:00.000'
            *
            */

            readonly id: string
            readonly request: InvoicePullRequest
            readonly errors: string[]
            readonly type: string
            readonly created: string

            constructor(id: string, request: InvoicePullRequest, errors: string[], type: string, created: string)
        }

        export namespace log {
            /**
             *
             * Retrieve a specific InvoicePullRequest Log
             *
             * @description Receive a single InvoicePullRequest Log object previously created by the Stark Bank API by passing its id
             *
             * Parameters (required):
             * @param id [string]: object unique id. ex: '5656565656565656'
             *
             * Parameters (optional):
             * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns InvoicePullRequest Log object with updated attributes
             *
             */
            export function get(id: string, params?: {user?: Project | Organization | null}): Promise<InvoicePullRequest.Log>;

            /**
             *
             * Retrieve InvoicePullRequest Logs
             *
             * @description Receive a generator of InvoicePullRequest Log objects previously created in the Stark Bank API
             *
             * Parameters (optional):
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter for log event types. ex: "created", "paid", "canceled" or "overdue"
             * @param requestIds [list of strings, default null]: list of Request IDs ids to filter logs. ex: ["5656565656565656", "4545454545454545"]
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of InvoicePullRequest Log objects with updated attributes
             *
             */
            export function query(params?: {
                limit?: number | null,
                after?: string | null,
                before?: string | null,
                types?: string[] | null,
                requestIds?: string[] | null,
                user?: Project | Organization | null,
            }): Promise<InvoicePullRequest.Log[]>;

            /**
             *
             * Retrieve paged InvoicePullRequest Logs
             *
             * @description Receive a list of up to 100 InvoicePullRequest.Log objects previously created in the Stark Bank API and the cursor to the next page.
             * Use this function instead of query if you want to manually page your requests.
             *
             * Parameters (optional):
             * @param cursor [string, default null]: cursor returned on the previous page function call
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter for log event types. ex: "created", "paid", "canceled" or "overdue"
             * @param requestIds [list of strings, default null]: list of Request IDs ids to filter logs. ex: ["5656565656565656", "4545454545454545"]
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of InvoicePullRequest Log objects with updated attributes and cursor to retrieve the next page of InvoicePullRequest objects
             *
             */
            export function page(params?: {
                cursor?: string | null,
                limit?: number | null,
                after?: string | null,
                before?: string | null,
                types?: string[] | null,
                requestIds?: string[] | null,
                user?: Project | Organization | null,
            }): Promise<[InvoicePullRequest.Log[], string | null]>;
        }
    }
}