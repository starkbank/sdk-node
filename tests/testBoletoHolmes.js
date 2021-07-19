const assert = require('assert');
const starkbank = require('../index.js');
const generateExampleBoletosJson = require('./utils/boleto.js').generateExampleBoletosJson;

starkbank.user = require('./utils/user').exampleProject;

describe('TestBoletoHolmesPost', function(){
    this.timeout(30000);
    it('test_success', async () => {
        let boletos = generateExampleBoletosJson(5);
        boletos = await starkbank.boleto.create(boletos);
        let holmes = [];
        for (let boleto of boletos) {
            assert(typeof boleto.id == 'string');
            holmes.push(new starkbank.BoletoHolmes({ boletoId: boleto.id }))
        }
        holmes = await starkbank.boletoHolmes.create(holmes);
        for (let sherlock of holmes) {
            assert(typeof sherlock.id == 'string');
        }
    });
});

describe('TestBoletoHolmesGet', function(){
    this.timeout(30000);
    it('test_success', async () => {
        let i = 0;
        const holmes = await starkbank.boletoHolmes.query({limit: 150});
        for await (let sherlock of holmes) {
            assert(typeof sherlock.id == 'string');
            i += 1;
        }
        assert(i <= 150);
    });
});

describe('TestBoletoHolmesInfoGet', function(){
    this.timeout(30000);
    it('test_success', async () => {
        let holmes = await starkbank.boletoHolmes.query({limit: 1});
        for await (let sherlock of holmes) {
            assert(typeof sherlock.id == 'string');
            sherlock = await starkbank.boletoHolmes.get(sherlock.id);
            assert(typeof sherlock.id == 'string');
        }
    });
});

describe('TestBoletoHolmesGetPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.boletoHolmes.page({ limit: 5, cursor: cursor });
            for (let entity of page) {
                assert(!ids.includes(entity.id));
                ids.push(entity.id);
            }
            if (cursor == null) {
                break;
            }
        }
        assert(ids.length == 10);
    });
});
