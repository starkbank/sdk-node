
declare module 'starkbank' {
        
    export class BrcodePreview {
        /**
         *
         * BrcodePreview object
         * 
         * DEPRECATED: USE PaymentPreview INSTEAD
         *
         * @description A BrcodePreview is used to get information from a BRCode you received to check the informations before paying it.
         *
         * Attributes (return-only): 
         * @param status [string]: Payment status. ex: 'active', 'paid', 'canceled' or 'unknown'
         * @param name [string]: Payment receiver name. ex: 'Tony Stark'
         * @param taxId [string]: Payment receiver tax ID. ex: '012.345.678-90'
         * @param bankCode [string]: Payment receiver bank code. ex: '20018183'
         * @param branchCode [string]: Payment receiver branch code. ex: '0001'
         * @param accountNumber [string]: Payment receiver account number. ex: '1234567'
         * @param accountType [string]: Payment receiver account type. ex: 'checking'
         * @param allowChange [bool]: If True, the payment is able to receive amounts that are diferent from the nominal one. ex: True or False
         * @param amount [integer]: Value in cents that this payment is expecting to receive. If 0, any value is accepted. ex: 123 (= R$1,23)
         * @param reconciliationId [string]: Reconciliation ID linked to this payment. ex: 'txId', 'payment-123'
         *
         */

        readonly status: string
        readonly name: string
        readonly taxId: string
        readonly bankCode: string
        readonly branchCode: string
        readonly accountNumber: string
        readonly accountType: string
        readonly allowChange: boolean
        readonly amount: number
        readonly reconciliationId: string

        constructor(params: {
            status?: string, name?: string, taxId?: string, bankCode?: string, branchCode?: string, accountNumber?: string, 
            accountType?: string, allowChange?: boolean, amount?: number, reconciliationId?: string
        })
    }

    export namespace brcodePreview {
        /**
         *
         * Retrieve BrcodePreviews
         *
         * @description Receive a generator of BrcodePreview objects previously created in the Stark Bank API
         *
         * Parameters (optional):
         * @param brcodes [list of strings]: List of brcodes to preview. ex: ["00020126580014br.gov.bcb.pix0136a629532e-7693-4846-852d-1bbff817b5a8520400005303986540510.005802BR5908T'Challa6009Sao Paulo62090505123456304B14A"]
         * @param user [Project object, default None]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns generator of BrcodePreview objects with updated attributes
         *
         */
        function query(params?: {
            brcodes?: string[] | null, 
            limit?: number | null, 
            user?: Project | Organization | null
        }): Promise<BrcodePreview[]>;
    }
}
