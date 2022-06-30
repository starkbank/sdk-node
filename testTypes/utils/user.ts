import starkbank from "starkbank";

export const exampleProject = new starkbank.Project(
    {
        environment: 'sandbox',
        id: process.env.DEVELOPMENT_PROJECT_ID || "", // '5656565656565656',
        privateKey: process.env.DEVELOPMENT_PRIVATE_KEY || "" // '-----BEGIN EC PRIVATE KEY-----\nMHQCAQEEIMCwW74H6egQkTiz87WDvLNm7fK/cA+ctA2vg/bbHx3woAcGBSuBBAAK\noUQDQgAE0iaeEHEgr3oTbCfh8U2L+r7zoaeOX964xaAnND5jATGpD/tHec6Oe9U1\nIF16ZoTVt1FzZ8WkYQ3XomRD4HS13A==\n-----END EC PRIVATE KEY-----'
    }
);

export const exampleOrganization = new starkbank.Organization(
    {
        environment: 'sandbox',
        id: process.env.DEVELOPMENT_ORGANIZATION_ID || "", // '5656565656565656',
        privateKey: process.env.DEVELOPMENT_ORGANIZATION_PRIVATE_KEY || "" // '-----BEGIN EC PRIVATE KEY-----\nMHQCAQEEIMCwW74H6egQkTiz87WDvLNm7fK/cA+ctA2vg/bbHx3woAcGBSuBBAAK\noUQDQgAE0iaeEHEgr3oTbCfh8U2L+r7zoaeOX964xaAnND5jATGpD/tHec6Oe9U1\nIF16ZoTVt1FzZ8WkYQ3XomRD4HS13A==\n-----END EC PRIVATE KEY-----'
    }
);