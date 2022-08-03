const starkbank = require('../../index.js');

exports.exampleProject = new starkbank.Project(
    {
        environment: 'sandbox',
        id: process.env.SANDBOX_ID || '5656565656565656',
        privateKey: process.env.SANDBOX_PRIVATE_KEY || '-----BEGIN EC PRIVATE KEY-----\nMHQCAQEEIMCwW74H6egQkTiz87WDvLNm7fK/cA+ctA2vg/bbHx3woAcGBSuBBAAK\noUQDQgAE0iaeEHEgr3oTbCfh8U2L+r7zoaeOX964xaAnND5jATGpD/tHec6Oe9U1\nIF16ZoTVt1FzZ8WkYQ3XomRD4HS13A==\n-----END EC PRIVATE KEY-----'
    }
);

exports.exampleOrganization = new starkbank.Organization(
    {
        environment: 'sandbox',
        id: process.env.SANDBOX_ORGANIZATION_ID || '5656565656565656',
        privateKey: process.env.SANDBOX_ORGANIZATION_PRIVATE_KEY || '-----BEGIN EC PRIVATE KEY-----\nMHQCAQEEIMCwW74H6egQkTiz87WDvLNm7fK/cA+ctA2vg/bbHx3woAcGBSuBBAAK\noUQDQgAE0iaeEHEgr3oTbCfh8U2L+r7zoaeOX964xaAnND5jATGpD/tHec6Oe9U1\nIF16ZoTVt1FzZ8WkYQ3XomRD4HS13A==\n-----END EC PRIVATE KEY-----'
    }
);
