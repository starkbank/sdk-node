
declare module 'starkbank' {

    /**
     * 
     * BoletoPreview object
     * 
     * @description A BoletoPreview is used to get information from a Boleto Payment you received to check the information before the payment.
     * 
     * Attributes:
     * @param status [string]: current boleto status. ex: 'active', 'expired' or 'inactive'
     * @param amount [int]: amount final to be paid. ex: 23456 (= R$ 234.56)
     * @param discountAmount [int]: discount amount to be paid. ex: 23456 (= R$ 234.56)
     * @param fineAmount [int]: fine amount to be paid. ex: 23456 (= R$ 234.56)
     * @param interestAmount [int]: interest amount to be paid. ex: 23456 (= R$ 234.56)
     * @param due [string]: Boleto due date. ex: '2020-03-10'
     * @param expiration [string]: Boleto expiration date. ex: '2020-03-10'
     * @param name [string]: beneficiary full name. ex: 'Anthony Edward Stark'
     * @param taxId [string]: beneficiary tax ID (CPF or CNPJ). ex: '20.018.183/0001-80'
     * @param receiverName [string]: receiver (Sacador Avalista) full name. ex: 'Anthony Edward Stark'
     * @param receiverTaxId [string]: receiver (Sacador Avalista) tax ID (CPF or CNPJ). ex: '20.018.183/0001-80'
     * @param payerName [string]: payer full name. ex: 'Anthony Edward Stark'
     * @param payerTaxId [string]: payer tax ID (CPF or CNPJ). ex: '20.018.183/0001-80'
     * @param line [string]: Number sequence that identifies the payment. ex: '34191.09008 63571.277308 71444.640008 5 81960000000062'
     * @param barCode [string]: Bar code number that identifies the payment. ex: '34195819600000000621090063571277307144464000'
     * 
     */
    interface boletoPreview {
        status: string, amount: number, discountAmount: number, fineAmount: number, interestAmount: number, due: string, expiration: string, 
        name: string, taxId: string, receiverName: string, receiverTaxId: string, payerName: string, payerTaxId: string, 
        line: string, barCode: string
    }

    /**
     * 
     * BrcodePreview object
     * 
     * @description A BrcodePreview is used to get information from a BR Code you received to check the information before the payment.
     * 
     * Attributes:
     * @param status [string]: Payment status. ex: 'active', 'paid', 'canceled' or 'unknown'
     * @param name [string]: Payment receiver name. ex: 'Tony Stark'
     * @param taxId [string]: Payment receiver tax ID. ex: '012.345.678-90'
     * @param bankCode [string]: Payment receiver bank code. ex: '20018183'
     * @param branchCode [string]: Payment receiver branch code. ex: '0001'
     * @param accountNumber [string]: Payment receiver account number. ex: '1234567'
     * @param accountType [string]: Payment receiver account type. ex: 'checking'
     * @param allowChange [bool]: If true, the payment is able to receive amounts that are different from the nominal one. ex: true or false
     * @param amount [integer]: Value in cents that this payment is expecting to receive. If 0, any value is accepted. ex: 123 (= R$1,23)
     * @param nominalAmount [integer]: Original value in cents that this payment was expecting to receive without the discounts, fines, etc.. If 0, any value is accepted. ex: 123 (= R$1,23)
     * @param interestAmount [integer]: Current interest value in cents that this payment is charging. If 0, any value is accepted. ex: 123 (= R$1,23)
     * @param fineAmount [integer]: Current fine value in cents that this payment is charging. ex: 123 (= R$1,23)
     * @param reductionAmount [integer]: Current value reduction value in cents that this payment is expecting. ex: 123 (= R$1,23)
     * @param discountAmount [integer]: Current discount value in cents that this payment is expecting. ex: 123 (= R$1,23)
     * @param reconciliationId [string]: Reconciliation ID linked to this payment. ex: 'txId', 'payment-123'
     * 
     */
    interface brcodePreview {
        status: string, name: string, taxId: string, bankCode: string, branchCode: string, accountNumber: string, 
        accountType: string, allowChange: boolean, amount: number, nominalAmount: number, interestAmount: number, 
        fineAmount: number, reductionAmount: number, discountAmount: number, reconciliationId: string
    }

    /**
     * 
     * TaxPreview object
     * 
     * @description A TaxPreview is used to get information from a Tax Payment you received to check the information before the payment.
     * 
     * Attributes:
     * @param amount [int]: final amount to be paid. ex: 23456 (= R$ 234.56)
     * @param name [string]: beneficiary full name. ex: 'Iron Throne'
     * @param description [string]: tax payment description. ex: 'ISS Payment - Iron Throne'
     * @param line [string]: Number sequence that identifies the payment. ex: '85660000006 6 67940064007 5 41190025511 7 00010601813 8'
     * @param barCode [string]: Bar code number that identifies the payment. ex: '85660000006679400640074119002551100010601813'
     * 
     */
    interface taxPreview {
        amount: number, name: string, description: string, line: string, barCode: string
    }

    /**
     * 
     * UtilityPreview object
     * 
     * @description A UtilityPreview is used to get information from a Utility Payment you received to check the information before the payment.
     * 
     * Attributes:
     * @param amount [int]: final amount to be paid. ex: 23456 (= R$ 234.56)
     * @param name [string]: beneficiary full name. ex: 'Light Company'
     * @param description [string]: utility payment description. ex: 'Utility Payment - Light Company'
     * @param line [string]: Number sequence that identifies the payment. ex: '82660000002 8 44361143007 7 41190025511 7 00010601813 8'
     * @param barCode [string]: Bar code number that identifies the payment. ex: '82660000002443611430074119002551100010601813'
     * 
     */
    interface utilityPreview {
        amount: number, name: string, description: string, line: string, barCode: string
    }

    export class PaymentPreview {
        /**
         *
         * PaymentPreview object
         *
         * @description A PaymentPreview is used to get information from payment code you received to check the informations before paying it.
         * This resource can be used to preview BR Codes and bar codes of boletos, tax and utility payments
         *
         * Parameters (required):
         * @param id [string]: Main identification of the payment. This should be the BR Code for Pix payments and lines or bar codes for payment slips. ex: '34191.09008 63571.277308 71444.640008 5 81960000000062', '00020126580014br.gov.bcb.pix0136a629532e-7693-4846-852d-1bbff817b5a8520400005303986540510.005802BR5908T'Challa6009Sao Paulo62090505123456304B14A'
         *
         * Parameters (optional):
         * @param scheduled [string, default today]: intended payment date. Right now, this parameter only has effect on BrcodePreviews. ex: '2020-03-10'
         *
         * Attributes (return-only):
         * @param type [string]: Payment type. ex: 'brcode-payment', 'boleto-payment', 'utility-payment' or 'tax-payment'
         * @param payment [BrcodePreview, BoletoPreview, UtilityPreview or TaxPreview]: Information preview of the informed payment.
         *
         */

        id: string;

        scheduled: string

        readonly type: string
        readonly payment: brcodePreview | boletoPreview | utilityPreview | taxPreview | null

        constructor(params: {
            id:string, scheduled?: string, type?: string, payment?: brcodePreview | boletoPreview | utilityPreview | taxPreview | null
        })
    }

    export namespace paymentPreview {
        /**
         *
         * Create PaymentPreviews
         *
         * @description Send a list of PaymentPreviews objects for creation in the Stark Bank API
         *
         * Parameters (required):
         * @param previews [list of PaymentPreviews objects]: list of PaymentPreviews objects to be created in the API
         *
         * Parameters (optional):
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns list of PaymentPreviews objects with updated attributes
         *
         */
        function create(previews: PaymentPreview[], params?:{ user?: Project | Organization | null}): Promise<PaymentPreview[]>;
    }
}
