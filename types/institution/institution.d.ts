
declare module 'starkbank' {
        
    export class Institution {
        /**
         * 
         * Institution object
         * 
         * @description This resource is used to get information on the institutions that are recognized by the Brazilian Central Bank.
         * Besides the display name and full name, they also include the STR code (used for TEDs) and the SPI Code
         * (used for Pix) for the institutions. Either of these codes may be empty if the institution is not registered on
         * that Central Bank service.
         * 
         * Attributes (return-only):
         * @param displayName [string]: short version of the institution name that should be displayed to end users. ex: "Stark Bank"
         * @param name [string]: full version of the institution name. ex: "Stark Bank S.A."
         * @param spiCode [string]: SPI code used to identify the institution on Pix transactions. ex: "20018183"
         * @param strCode [string]: STR code used to identify the institution on TED transactions. ex: "123"
         * 
         */
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
