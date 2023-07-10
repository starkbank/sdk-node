declare module 'starkbank' {
    export class CorporateRule {
    /**
    * 
    * CorporateRule object
    * 
    * @descrption The CorporateRule object displays the spending rules of CorporateCards and CorporateHolders created in your Workspace.
    * 
    * Parameters (required):
    * @param name [string]: rule name. ex: "Travel" or "Food"
    * @param amount [integer]: maximum amount that can be spent in the informed interval. ex: 200000 (= R$ 2000.00)
    * 
    * Parameters (optional):
    * @param interval [string, default "lifetime"]: interval after which the rule amount counter will be reset to 0. ex: "instant", "day", "week", "month", "year" or "lifetime"
    * @param schedule [string, default null]: schedule time for user to spend. ex: "every monday, wednesday from 00:00 to 23:59 in America/Sao_Paulo"
    * @param purposes [list of string, default []]: list of strings representing the allowed purposes for card purchases, you can use this to restrict ATM withdrawals. ex: ["purchase", "withdrawal"]
    * @param currencyCode [string, default "BRL"]: code of the currency that the rule amount refers to. ex: "BRL" or "USD"
    * @param categories [list of MerchantCategories, default []]: merchant categories accepted by the rule. ex: [MerchantCategory(code="fastFoodRestaurants")]
    * @param countries [list of MerchantCountries, default []]: countries accepted by the rule. ex: [MerchantCountry(code="BRA")]
    * @param methods [list of CardMethods, default []]: card purchase methods accepted by the rule. ex: [CardMethod(code="magstripe")]
    * 
    * Attributes (expanded return-only):
    * @param id [string]: unique id returned when a CorporateRule is created, used to update a specific CorporateRule. ex: "5656565656565656"
    * @param counterAmount [integer]: current rule spent amount. ex: 1000
    * @param currencySymbol [string]: currency symbol. ex: "R$"
    * @param currencyName [string]: currency name. ex: "Brazilian Real"
    */

    name: string
    amount: number

    readonly interval : string
    readonly schedule : string
    readonly purposes : string[] 
    readonly currencyCode : string[] 
    readonly categories : merchantCategories[]
    readonly countries : merchantCountry[]
    readonly methods : cardMethods[]
    readonly id : string
    readonly counterAmount : number
    readonly currencySymbol : string
    readonly currencyName  : string

    constructor(params?: {name: string | null, amount: number | null, interval?: string | null, schedule?: string | null, purposes?: string[] | null, currencyCode?: string[] | null, categories?: merchantCategories[] | null, countries?: merchantCountry[] | null, methods?: cardMethods[] | null, id?: string | null, counterAmount?: number | null, currencySymbol?: string | null, currencyName?: string | null})
    }
}
