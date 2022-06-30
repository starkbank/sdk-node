
const segmentMap = {
    "1": "Prefeituras",
    "2": "Saneamento",
    "3": "Energia Elétrica e Gás",
    "4": "Telecomunicações",
    "5": "Órgãos Governamentais",
    "6": "Carnes e Assemelhados ou demais empresas",
    "7": "Multas de trânsito",
    "9": "Uso exclusivo do banco",
};

const utilitySegments = new Set(["2", "3", "4"]);
const taxSegments = new Set(["1", "5"]);

const taxes = require('./taxes.json');

const utilities = require('./utilities.json');

utilities.forEach( (utility) => {
    utility["type"] = "utility";
});

const businessMap = new Map();

(utilities.concat(taxes)).forEach( (business) => {
    if (businessMap.get(business["segment"]) == null) 
        businessMap.set(business["segment"], new Map());
    businessMap.get(business["segment"]).set(business["code"], business);
});

const choice = (choices) => {
    let randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

const randomUtilityBusiness = () => {return choice(utilities)};

const randomTaxBusiness = () => {return choice(taxes)};

const randomBusiness = () => {return choice(utilities.concat(taxes))};

exports.choice = choice;
exports.utilitySegments = utilitySegments;
exports.taxSegments = taxSegments;
exports.businessMap = businessMap;
exports.randomUtilityBusiness = randomUtilityBusiness;
exports.randomTaxBusiness = randomTaxBusiness;
exports.randomBusiness = randomBusiness;
