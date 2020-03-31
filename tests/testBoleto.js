const assert = require('assert');
const starkbank = require('../starkbank');
const generateExampleBoletosJson = require('./utils/boleto.js').generateExampleBoletosJson;

starkbank.user = require('./utils/user').exampleProject;

describe('TestBoletoPost', () => {
    it('test_success', async () => {
        let boletos = generateExampleBoletosJson(5);
        boletos = await starkbank.boleto.create(boletos);
        for (let boleto of boletos) {
            assert(typeof boleto.id == 'string');
        }
    });
});

describe('TestBoletoGet', () => {
    it('test_success', async () => {
        let i = 0;
        const boletos = await starkbank.boleto.query({limit:150});
        for await (let boleto of boletos) {
            assert(typeof boleto.id == 'string');
            i += 1;
        }
        assert(i === 150);
        console.log('Number of boletos:', i);
    });
});

describe('TestBoletoPostAndDelete', () => {
    it('test_success', async () => {
        let boletos = generateExampleBoletosJson(1);
        boletos = await starkbank.boleto.create(boletos);
        let boleto = boletos[0];
        assert(typeof boleto.id == 'string');
        boleto = await starkbank.boleto.delete(boleto.id);
        assert(typeof boleto.id == 'string');
    });
});

describe('TestBoletoInfoGet', () => {
    it('test_success', async () => {
        let boletos = await starkbank.boleto.query({limit: 1});
        for await (let boleto of boletos) {
            assert(typeof boleto.id == 'string');
            boleto = await starkbank.boleto.get(boleto.id);
            assert(typeof boleto.id == 'string');
        }
    });
});

describe('TestBoletoPdfGet', () => {
    it('test_success', async () => {
        let boletos = await starkbank.boleto.query({limit: 1});
        for await (let boleto of boletos) {
            assert(typeof boleto.id == 'string');
            let pdf = await starkbank.boleto.pdf(boleto.id);
            assert(typeof pdf == 'string');
        }
    });
});
