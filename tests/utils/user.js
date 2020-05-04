const starkbank = require('../../index.js');

exports.exampleProject = new starkbank.Project(
    {
        environment: 'sandbox',
        id: '5656565656565656',
        privateKey: `
        -----BEGIN EC PARAMETERS-----
        BgUrgQQACg==
        -----END EC PARAMETERS-----
        -----BEGIN EC PRIVATE KEY-----
        MHQCAQEEIMCwW74H6egQkTiz87WDvLNm7fK/cA+ctA2vg/bbHx3woAcGBSuBBAAK
        oUQDQgAE0iaeEHEgr3oTbCfh8U2L+r7zoaeOX964xaAnND5jATGpD/tHec6Oe9U1
        IF16ZoTVt1FzZ8WkYQ3XomRD4HS13A==
        -----END EC PRIVATE KEY-----
        `
    }
);
