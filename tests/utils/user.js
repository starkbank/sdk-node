const starkbank = require('../../starkbank');

exports.exampleProject = new starkbank.Project(
    {
        environment: 'development',
        id: '4835770477051904',
        privateKey: `-----BEGIN EC PARAMETERS-----
BgUrgQQACg==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHQCAQEEIIoYWZ2OGwqX6n1EVvj1C1YvWHSGqqhZJzfsZZnk0SVgoAcGBSuBBAAK
oUQDQgAEGS1jWJXoK9RUk+qoNNFquO7X4JzRf5ZA5UDJUfPCbbKe5KwtrBKTJC1/
vRGIpAM5gNsxdfKgmoXNriiuY4LEPQ==
-----END EC PRIVATE KEY-----
`
    }
);
