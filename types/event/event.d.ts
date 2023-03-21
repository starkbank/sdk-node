
declare module 'starkbank' {

    export class Event {
        /**
         *
         * Webhook Event object
         *
         * @description An Event is the notification received from the subscription to the Webhook.
         * Events cannot be created, but may be retrieved from the Stark Bank API to
         * list all generated updates on entities.
         *
         * Attributes (return-only):
         * @param id [string]: unique id returned when the event is created. ex: '5656565656565656'
         * @param log [Log]: a Log object from one the subscription services (Transfer Log, Boleto Log, BoletoHolmes Log, BoletoPayment Log, BrcodePayment Log, Deposit Log, Invoice Log or UtilityPayment Log)
         * @param created [string]: creation datetime for the notification event. ex: '2020-03-10 10:30:00.000'
         * @param isDelivered [string]: delivery datetime when the notification was delivered to the user url. Will be null if no successful attempts to deliver the event occurred. ex: '2020-03-10 10:30:00.000'
         * @param subscription [string]: service that triggered this event. ex: 'transfer', 'utility-payment'
         * @param workspaceId [string]: ID of the Workspace that generated this event. Mostly used when multiple Workspaces have Webhooks registered to the same endpoint. ex: '4545454545454545'
         *
         */

        created: string
        isDelivered: boolean
        subscription: string
        log: boleto.Log | transfer.Log | deposit.Log | invoice.Log | utilityPayment.Log | brcodePayment.Log | 
            boletoHolmes.Log | boletoPayment.Log | darfPayment.Log | taxPayment.Log
        id: string
        workspaceId: string

        constructor(params: {
            created: string, isDelivered: string, subscription: string, log: boleto.Log | 
            transfer.Log | deposit.Log | invoice.Log | utilityPayment.Log | brcodePayment.Log | 
            boletoHolmes.Log | boletoPayment.Log | darfPayment.Log | taxPayment.Log, id: string, 
            workspaceId: string
        })
    }

    export namespace event {
        /**
         *
         * Retrieve a specific notification Event
         *
         * @description Receive a single notification Event object previously created in the Stark Bank API by passing its id
         *
         * Parameters (required):
         * @param id [string]: object unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns Event object with updated attributes
         *
         */
        export function get(id: string, params?:{ user?: Project | Organization | null}): Promise<Event>;

        /**
         *
         * Retrieve notification Events
         *
         * @description Receive a list of up to 100 Event objects previously created in the Stark Bank API and the cursor to the next page.
         * Use this function instead of query if you want to manually page your requests.
         *
         * Parameters (optional):
         * @param cursor [string, default null]: cursor returned on the previous page function call
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null]: date filter for objects created only after specified date. ex: '2020-03-10'
         * @param before [string, default null]: date filter for objects created only before specified date. ex: '2020-03-10'
         * @param isDelivered [bool, default null]: bool to filter successfully delivered events. ex: true or false
         * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns list of Event objects with updated attributes and cursor to retrieve the next page of Event objects
         *
         */
        export function page(params?: { 
            cursor?: string | null, 
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            isDelivered?: boolean | null, 
            user?: Project | Organization | null
        }): Promise<[Event[], string | null]>;

        /**
         *
         * Create single notification Event from a content string
         *
         * @description Create a single Event object received from event listening at subscribed user endpoint.
         * If the provided digital signature does not check out with the StarkBank public key, a
         * starkbank.exception.InvalidSignatureException will be raised.
         *
         * Parameters (required):
         * @param content [string]: response content from request received at user endpoint (not parsed)
         * @param signature [string]: base-64 digital signature received at response header 'Digital-Signature'
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns Event object with updated attributes
         *
         */
        export function parse(params?: {content: string, signature: string, user?: Project | Organization}): Promise<Event>;

        /**
         *
         * Retrieve notification Events
         *
         * @description Receive a generator of notification Event objects previously created in the Stark Bank API
         *
         * Parameters (optional):
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null]: date filter for objects created only after specified date. ex: '2020-03-10'
         * @param before [string, default null]: date filter for objects created only before specified date. ex: '2020-03-10'
         * @param isDelivered [bool, default null]: bool to filter successfully delivered events. ex: true or false
         * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns generator of Event objects with updated attributes
         *
         */
        export function query(params?: { 
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            isDelivered?: boolean | null, 
            user?: Project | Organization | null
        }): Promise<Event[]>;

        /**
         *
         * Set notification Event entity as delivered
         *
         * @description Set notification Event as delivered at the current timestamp (if it was not yet delivered) by passing id.
         * After this is set, the event will no longer be returned on queries with isDelivered=false.
         *
         * Parameters (required):
         * @param id [list of strings]: Event unique ids. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns target Event with updated attributes
         *
         */
        export function update(id: string, params?: {isDelivered: boolean, user?: Project | Organization | null}): Promise<Event>;

        /**
         *
         * Delete notification Events
         *
         * @description Delete a list of notification Event entities previously created in the Stark Bank API
         *
         * Parameters (required):
         * @param id [string]: Event unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns deleted Event object
         *
         */
        function _delete(id: string, params?:{ user?: Project | Organization | null}): Promise<Event>;
        export { _delete as delete }

        export class Attempt {
            /**
             * Event.Attempt object
             * 
             * @description When an Event delivery fails, an event attempt will be registered.
             * It carries information meant to help you debug event reception issues.
             * 
             * Attributes (return-only):
             * @param id [string]: unique id that identifies the delivery attempt. ex: '5656565656565656'
             * @param code [string]: delivery error code. ex: badHttpStatus, badConnection, timeout
             * @param message [string]: delivery error full description. ex: 'HTTP POST request returned status 404'
             * @param eventId [string]: ID of the Event whose delivery failed. ex: '4848484848484848'
             * @param webhookId [string]: ID of the Webhook that triggered this event. ex: '5656565656565656'
             * @param created [string]: datetime representing the moment when the attempt was made. ex: '2020-03-10 10:30:00.000'
             * 
             */
            readonly id?: string | null
            readonly code?: string | null
            readonly message?: string | null
            readonly webhookId?: string | null
            readonly eventId?: string | null
            readonly created?: string | null

            constructor(
                id?: string | null, code?: string | null, message?: string | null, webhookId?: string | null, 
                eventId?: string | null, created?: string | null
            )
            
        }

        export namespace attempt {
            /**
             *
             * Retrieve a specific notification Event.Attempt
             *
             * @description Receive a single notification Event.Attempt object previously created in the Stark Bank API by passing its id
             *
             * Parameters (required):
             * @param id [string]: object unique id. ex: '5656565656565656'
             *
             * Parameters (optional):
             * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns Event.Attempt object with updated attributes
             *
             */
            function get(id: string, params?:{ user?: Project | Organization | null}): Promise<event.Attempt>;

            /**
             *
             * Retrieve paged Events.Attempt
             *
             * @description Receive a list of up to 100 Event.Attempt objects previously created in the Stark Bank API and the cursor to the next page.
             * Use this function instead of query if you want to manually page your requests.
             *
             * Parameters (optional):
             * @param cursor [string, default null]: cursor returned on the previous page function call
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null]: date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null]: date filter for objects created only before specified date. ex: '2020-03-10'
             * @param eventIds [list of strings, default null]: list of Event ids to filter attempts. ex: ['5656565656565656', '4545454545454545']
             * @param webhookIds [list of strings, default null]: list of Webhook ids to filter attempts. ex: ['5656565656565656', '4545454545454545']
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of Event.Attempt objects with updated attributes and cursor to retrieve the next page of Event.Attempt objects
             *
             */
            function page(params?: { 
                cursor?: string | null, 
                limit?: number | null, 
                after?: string | null, 
                before?: string | null, 
                eventIds?: string[] | null, 
                webhookIds?: string[] | null, 
                user?: Project | Organization | null
            }): Promise<[event.Attempt[], string]>;

            /**
             *
             * Retrieve notification Events.Attempt
             *
             * @description Receive a generator of notification Event.Attempt objects previously created in the Stark Bank API
             *
             * Parameters (optional):
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null]: date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null]: date filter for objects created only before specified date. ex: '2020-03-10'
             * @param eventIds [list of strings, default null]: list of Event ids to filter attempts. ex: ['5656565656565656', '4545454545454545']
             * @param webhookIds [list of strings, default null]: list of Webhook ids to filter attempts. ex: ['5656565656565656', '4545454545454545']
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns generator of Event.Attempt objects with updated attributes
             *
             */
            function query(params?: { 
                limit?: number | null, 
                after?: string | null, 
                before?: string | null, 
                eventIds?: string[] | null, 
                webhookIds?: string[] | null, 
                user?: Project | Organization | null
            }): Promise<event.Attempt[]>;
        }
    }
}
