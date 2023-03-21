
declare module 'starkbank' {

    export class Webhook {
        /**
         *
         * Webhook subscription object
         *
         * @description A Webhook is used to subscribe to notification events on a user-selected endpoint.
         * Currently available services for subscription are transfer, invoice, deposit, brcode-payment,
         * boleto, boleto-holmes, boleto-payment and utility-payment.
         *
         * Parameters (required):
         * @param url [string]: Url that will be notified when an event occurs.
         * @param subscriptions [list of strings]: list of any non-empty combination of the available services. ex: ['transfer', 'deposit']
         * 
         * Attributes (return-only):
         * @param id [string]: unique id returned when the webhook is created. ex: '5656565656565656'
         *
         */

        url: string
        subscriptions: string[]
        id: string

        constructor(params: {url: string, subscriptions: string[], id?: string | null})
        
    }
    
    export namespace webhook {
        /**
         *
         * Create Webhook subscription
         *
         * @description Send a single Webhook subscription for creation in the Stark Bank API
         *
         * Parameters (required):
         * @param url [string]: url to which notification events will be sent to. ex: 'https://webhook.site/60e9c18e-4b5c-4369-bda1-ab5fcd8e1b29'
         * @param subscriptions [list of strings]: list of any non-empty combination of the available services. ex: ['transfer', 'boleto-payment']
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns Webhook object with updated attributes
         *
         */
        export function create(params?: {url: string, subscriptions: string[], user?: Project | Organization}): Promise<Webhook>;

        /**
         *
         * Retrieve a specific Webhook subscription
         *
         * @description Receive a single Webhook subscription object previously created in the Stark Bank API by passing its id
         *
         * Parameters (required):
         * @param id [string]: object unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns Webhook object with updated attributes
         *
         */
        export function get(id: string, params?:{ user?: Project | Organization | null}): Promise<Webhook>;

        /**
         *
         * Retrieve Webhook subcriptions
         *
         * @description Receive a generator of Webhook subcription objects previously created in the Stark Bank API
         *
         * Parameters (optional):
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns generator of Webhook objects with updated attributes
         *
         */
        export function page(params?: { 
            cursor?: string | null, 
            limit?: number | null, 
            user?: Project | Organization | null 
        }): Promise<[Webhook[], string | null]>;

        /**
         *
         * Retrieve paged Webhook subcriptions
         *
         * @description Receive a list of up to 100 Webhook objects previously created in the Stark Bank API and the cursor to the next page.
         * Use this function instead of query if you want to manually page your requests.
         *
         * Parameters (optional):
         * @param cursor [string, default null]: cursor returned on the previous page function call
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns list of Webhook objects with updated attributes and cursor to retrieve the next page of Webhook objects
         *
         */
        export function query(params?: {
            limit?: number | null, 
            user?: Project | Organization | null
        }): Promise<Webhook[]>;

        /**
         *
         * Delete a Webhook subscription entity
         *
         * @description Delete a Webhook subscription entity previously created in the Stark Bank API
         *
         * Parameters (required):
         * @param id [string]: Webhook unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns deleted Webhook object
         *
         */
        function _delete(id: string, params?:{ user?: Project | Organization | null}): Promise<Webhook>;
        export { _delete as delete }
    }
}
