const assert = require('assert');
const starkbank = require('../index.js');
const generateExampleBoletosJson = require('./utils/boleto.js').generateExampleBoletosJson;

starkbank.user = require('./utils/user').exampleProject;

describe('TestBoletoPost', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let boletos = generateExampleBoletosJson(5);
        boletos = await starkbank.boleto.create(boletos);
        for (let boleto of boletos) {
            assert(typeof boleto.id == 'string');
        }
    });
});

describe('TestBoletoGet', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const boletos = await starkbank.boleto.query({ limit: 150 });
        for await (let boleto of boletos) {
            assert(typeof boleto.id == 'string');
            i += 1;
        }
        assert(i === 150);
    });
});

describe('TestBoletoPostAndDelete', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let boletos = generateExampleBoletosJson(1);
        boletos = await starkbank.boleto.create(boletos);
        let boleto = boletos[0];
        assert(typeof boleto.id == 'string');
        boleto = await starkbank.boleto.delete(boleto.id);
        assert(typeof boleto.id == 'string');
    });
});

describe('TestBoletoInfoGet', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let boletos = await starkbank.boleto.query({ limit: 1 });
        for await (let boleto of boletos) {
            assert(typeof boleto.id == 'string');
            boleto = await starkbank.boleto.get(boleto.id);
            assert(typeof boleto.id == 'string');
        }
    });
});

describe('TestBoletoPdfGet', function () {
    this.timeout(30000);
    it('test_success', async () => {
        let boletos = await starkbank.boleto.query({ limit: 1 });
        for await (let boleto of boletos) {
            assert(typeof boleto.id == 'string');
            let pdf = await starkbank.boleto.pdf(boleto.id, { layout: 'booklet', hiddenFields: ["customerAddress"] });
            assert(Buffer.isBuffer(pdf));
        }
    });
});

describe('TestBoletoGetPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.boleto.page({ limit: 5, cursor: cursor });
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
