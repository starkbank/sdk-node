///<reference path='./balance/balance.d.ts' />
///<reference path='./boleto/boleto.d.ts' />
///<reference path='./boletoPayment/boletoPayment.d.ts' />
///<reference path='./boletoHolmes/boletoHolmes.d.ts' />
///<reference path='./brcodePayment/brcodePayment.d.ts' />
///<reference path='./darfPayment/darfPayment.d.ts' />
///<reference path='./deposit/deposit.d.ts' />
///<reference path='./dynamicBrcode/dynamicBrcode.d.ts' />
///<reference path='./dictKey/dictKey.d.ts' />
///<reference path='./event/event.d.ts' />
///<reference path='./institution/institution.d.ts' />
///<reference path='./invoice/invoice.d.ts' />
///<reference path='./paymentPreview/paymentPreview.d.ts' />
///<reference path='./paymentRequest/paymentRequest.d.ts' />
///<reference path='./taxPayment/taxPayment.d.ts' />
///<reference path='./transaction/transaction.d.ts' />
///<reference path='./transfer/transfer.d.ts' />
///<reference path='./user/project.d.ts' />
///<reference path='./user/organization.d.ts' />
///<reference path='./utilityPayment/utilityPayment.d.ts' />
///<reference path='./webhook/webhook.d.ts' />
///<reference path='./workspace/workspace.d.ts' />


declare module 'starkbank' {
    
    export var user: Project | Organization | null

    export function setUser(user: Project | Organization): void;

    export function getUser(): Project | Organization;

    export function setLanguage(language: 'pt-BR' | 'en-US'): void;

    export function getLanguage(): 'pt-BR' | 'en-US';

    export namespace key {
        function create(): [newPrivatePem: string, newPublicPem: string];
        function create(path: string): [newPrivatePem: string, newPublicPem: string];
    }

    export const cache: {};

    export const language: string;

    export const version: string;

    export namespace error {

        class StarkBankError extends Error {
            constructor(message: string);
        }
        
        class InputError extends StarkBankError {
            constructor(code : string, message : string, status: number)
        }
        
        class InputErrors extends StarkBankError {
            constructor(content : string, status : number)
        }
        
        class InternalServerError extends StarkBankError {
            constructor(content : string, status : number)
        }
        
        class InvalidSignatureError extends StarkBankError {
            constructor(message : string)
        }
    }
}
