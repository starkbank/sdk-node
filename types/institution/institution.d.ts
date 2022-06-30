
declare module 'starkbank' {
        
    export class Institution {

        displayName: string | null
        name: string | null
        spiCode: string | null
        strCode: string | null
        
        constructor(params: {
                displayName?: string | null, name?: string | null, spiCode?: string | null, strCode?: string | null
            })
        }

    export namespace institution {

        /**
         *
         * Retrieve DictKeys
         *
         * @description Receive a list of Institution objects previously created in the Stark Bank API
         *
         * Parameters (optional):
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param search [string, default null]: part of the institution name to be searched. ex: 'stark'
         * @param spiCodes [list of strings, default null]: list of SPI (Pix) codes to be searched. ex: ['20018183']
         * @param strCodes [list of strings, default null]: list of STR (TED) codes to be searched. ex: ['260']
         * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns list of Institution objects with updated attributes
         *
         */
        function query(params?: { 
            limit?: number | null, 
            search?: string | null, 
            spiCodes?: string[] | null, 
            strCodes?: string[] | null, 
            user?: Project | Organization | null
        }): Promise<Institution[]>;
    }
}
