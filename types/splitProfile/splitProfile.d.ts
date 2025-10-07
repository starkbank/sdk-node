
declare module 'starkbank' {

    export class SplitProfile {
        /**
         * 
         * SplitProfile object
         * 
         * @description When you create a Split, the entity SplitProfile will be automatically created, if you haven't create a Split yet, you can use the put method to create your SplitProfile.
         * 
         * Parameters (optional):
         * @param interval [string]: frequency of transfer, default 'week'. Options: 'day', 'week', 'month'
         * @param delay [integer]: how long the amount will stay at the workspace in milliseconds, ex: 604800
         * @param tags [list of strings, default []]: list of strings for tagging
         * 
         * Attributes (return-only):
         * @param id [string]: unique id returned when SplitProfile is created. ex: '5656565656565656'
         * @param status [string]: current SplitProfile status. ex: 'created'
         * @param created [string]: creation datetime for the SplitProfile. ex: '2020-03-10 10:30:00.000000+00:00'
         * @param updated [string]: update datetime for the SplitProfile. ex: '2020-03-10 10:30:00.000000+00:00'
         * 
         */

        interval: string | null
        delay: number | null
        tags: string[] | null

        readonly id: string
        readonly status: string
        readonly created: string
        readonly updated: string

        constructor(params: {
            interval?: string | null, delay?: number | null, tags?: string[] | null, id?: string | null,
            status?: string | null, created?: string | null, updated?: string | null
        })
    }

    export namespace splitProfile {
        /**
         *
         * Create SplitProfile or update it if you already have it created
         * 
         * @description Send a list of SplitProfile objects for creation in the Stark Bank API
         * 
         * Parameters (required):
         * @param profile [list of SplitProfile objects]: SplitProfile object to be created in the API
         * 
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @returns SplitProfile object with updated attributes
         * 
         */
        export function put(profile: SplitProfile[], user?: object): Promise<SplitProfile[]>;

        /**
         *
         * Retrieve a specific SplitProfile
         * 
         * @description Receive a single SplitProfile object previously created in the Stark Bank API by its id
         * 
         * Parameters (required):
         * @param id [string]: object unique id. ex: '5656565656565656'
         * 
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @returns SplitProfile object with updated attributes
         * 
         */
        export function get(id: string, params?: { user?: Project | Organization | null }): Promise<SplitProfile>;

        /**
         *
         * Retrieve SplitProfiles
         * 
         * @description Receive a generator of SplitProfile objects previously created in the Stark Bank API
         * 
         * Parameters (optional):
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
         * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
         * @param status [list of strings, default null]: filter for status of retrieved objects. ex: ['created']
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @returns generator of SplitProfile objects with updated attributes
         * 
         */
        export function query(params?: {
            limit?: number | null,
            after?: string | null,
            before?: string | null,
            status?: string[] | null,
            tags?: string[] | null,
            ids?: string[] | null,
            user?: Project | Organization | null
        }): Promise<SplitProfile[]>;

        /**
         *
         * Retrieve SplitProfiles
         * 
         * @description Receive a list of up to 100 SplitProfile objects previously created in the Stark Bank API and the cursor to the next page.
         * Use this function instead of query if you want to manually page your requests.
         * 
         * Parameters (optional):
         * @param cursor [string, default null]: cursor returned on the previous page function call
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
         * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
         * @param status [list of strings, default null]: filter for status of retrieved objects. ex: ['created']
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @returns list of SplitProfile objects with updated attributes and cursor to retrieve the next page of SplitProfile objects
         * 
         */
        export function page(params?: {
            cursor?: string | null,
            limit?: number | null,
            after?: string | null,
            before?: string | null,
            status?: string[] | null,
            tags?: string[] | null,
            ids?: string[] | null,
            user?: Project | Organization | null
        }): Promise<[SplitProfile[], string | null]>;

        export class Log {
            /**
             * 
             * SplitProfile Log object
             * 
             * @description Every time a SplitProfile entity is updated, a corresponding SplitProfile Log
             * is generated for the entity. This log is never generated by the user,
             * but it can be retrieved to check additional information on the SplitProfile.
             * 
             * Attributes:
             * @param id [string]: unique id returned when the log is created. ex: '5656565656565656'
             * @param profile [SplitProfile]: SplitProfile entity to which the log refers to.
             * @param errors [list of strings]: list of errors linked to this SplitProfile event.
             * @param type [string]: type of the SplitProfile event which triggered the log creation. ex: 'created' or 'updated'
             * @param created [string]: creation datetime for the log. ex: '2020-03-10 10:30:00.000'
             * 
             */
            readonly id: string
            readonly profile: SplitProfile
            readonly errors: string[]
            readonly type: string
            readonly created: string

            constructor(id: string, profile: SplitProfile, errors: string[], type: string, created: string)
        }

        export namespace log {
            /**
             *
             * Retrieve a specific SplitProfile Log
             * 
             * @description Receive a single SplitProfile Log object previously created by the Stark Bank API by passing its id
             * 
             * Parameters (required):
             * @param id [string]: object unique id. ex: '5656565656565656'
             * 
             * Parameters (optional):
             * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
             * 
             * Return:
             * @returns SplitProfile Log object with updated attributes
             * 
             */
            export function get(id: string, params?: { user?: Project | Organization | null }): Promise<SplitProfile.Log>;

            /**
             *
             * Retrieve SplitProfile Logs
             * 
             * @description Receive a generator of SplitProfile Log objects previously created in the Stark Bank API
             * 
             * Parameters (optional):
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter for log event types. ex: 'created' or 'updated'
             * @param profileIds [list of strings, default null]: list of SplitProfile ids to filter logs. ex: ['5656565656565656', '4545454545454545']
             * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
             * 
             * Return:
             * @returns list of SplitProfile Log objects with updated attributes
             * 
             */
            export function query(params?: {
                limit?: number | null,
                after?: string | null,
                before?: string | null,
                types?: string[] | null,
                profileIds?: string[] | null,
                user?: Project | Organization | null
            }): Promise<SplitProfile.Log[]>;

            /**
             *
             * Retrieve paged SplitProfile Logs
             * 
             * @description Receive a list of up to 100 SplitProfile Log objects previously created in the Stark Bank API and the cursor to the next page.
             * Use this function instead of query if you want to manually page your requests.
             * 
             * Parameters (optional):
             * @param cursor [string, default null]: cursor returned on the previous page function call
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter for log event types. ex: 'created' or 'updated'
             * @param profileIds [list of strings, default null]: list of SplitProfile ids to filter logs. ex: ['5656565656565656', '4545454545454545']
             * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
             * 
             * Return:
             * @returns list of SplitProfile Log objects with updated attributes and cursor to retrieve the next page of SplitProfile Log objects
             * 
             */
            export function page(params?: {
                cursor?: string | null,
                limit?: number | null,
                after?: string | null,
                before?: string | null,
                types?: string[] | null,
                profileIds?: string[] | null,
                user?: Project | Organization | null
            }): Promise<[SplitProfile.Log[], string | null]>;
        }
    }
}
