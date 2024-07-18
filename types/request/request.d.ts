
declare module 'starkbank' {

    export namespace request {

        /**
         *
         * create any StarkBank resource
         *
         * @description Receive a json of resources previously created in StarkBank's API
         *
         * Parameters (required):
         * @param path [string]: StarkBank resource's route. ex: "/invoice/"
         * @param body [object]: request parameters. ex: {"invoices": [{"amount": 100, "name": "Iron Bank S.A.", "taxId": "20.018.183/0001-80"}]}
         *
         * Parameters (optional):
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         * @param query [object, default None]: Query parameters. ex: {"expand": ["securityCode", "number", "rules"]} 
         * 
         * Return:
         * @returns a list of StarkBank objects with updated attributes
         *
         */
        export function post(path: String, body:{[key: string]: any}, query?: {}, user?: Project | Organization | null): Promise<{status: number, content: any, headers: {}}>;

        /**
         *
         * Retrieve any StarkBank resource
         *
         * @description Receive a json of resources previously created in StarkBank's API
         *
         * Parameters (required):
         * @param path [string]: StarkBank resource's route. ex: "/invoice/"
         *
         * Parameters (optional):
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         * @param query [object, default None]: Query parameters. ex: {"limit": 1, "status": "paid"} 
         *
         * Return:
         * @returns a list of StarkBank objects with updated attributes
         *
         */
        export function get(
            path: string,
            query?: {
                cursor?: string | null, 
                limit?: number | null, 
                after?: string | null, 
                before?: string | null, 
                status?: string | null, 
                tags?: string[] | null, 
                ids?: string[] | null, 
                [key: string]: any;
            }, 
            user?: Project | Organization | null
        ): Promise<{status: number, content: any, headers: {}}>

        /**
         *
         * Update any StarkBank resource
         *
         * @description Receive a json of resources previously created in StarkBank's API
         *
         * Parameters (required):
         * @param path [string]: StarkBank resource's route. ex: "/invoice/"
         * @param body [object]: request parameters. ex: {"invoices": [{"amount": 100, "name": "Iron Bank S.A.", "taxId": "20.018.183/0001-80"}]}
         *
         * Parameters (optional):
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns a list of StarkBank objects with updated attributes
         *
         */
        export function patch(path: string, body:{[key: string]: any}, user?: Project | Organization | null): Promise<{status: number, content: any, headers: {}}>;

        /**
         *
         * Put any StarkBank resource
         *
         * @description Receive a json of resources previously created in StarkBank's API
         *
         * Parameters (required):
         * @param path [string]: StarkBank resource's route. ex: "/invoice/"
         * @param body [object]: request parameters. ex: {"invoices": [{"amount": 100, "name": "Iron Bank S.A.", "taxId": "20.018.183/0001-80"}]}
         *
         * Parameters (optional):
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns a list of StarkBank objects with updated attributes
         *
         */
        export function put(path: string, body:{[key: string]: any}, user?: Project | Organization | null): Promise<{status: number, content: any, headers: {}}>;

        /**
         *
         * Delete any StarkBank resource
         *
         * @description Delete a single resource previously created in StarkBank's API
         *
         * Parameters (required):
         * @param path [string]: StarkBank resource's r\oute. ex: "/invoice/"
         *
         * Parameters (optional):
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         * @param body [object]: request parameters. ex: {"invoices": [{"amount": 100, "name": "Iron Bank S.A.", "taxId": "20.018.183/0001-80"}]}
         *
         * Return:
         * @returns a list of StarkBank objects with updated attributes
         *
         */
        function _delete(path: string, body?:{[key: string]: any}, user?: Project | Organization | null): Promise<{status: number, content: any, headers: {}}>;
        export { _delete as delete }
    }
}
