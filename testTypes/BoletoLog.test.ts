///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';
import { exampleProject } from './utils/user';


starkbank.user = exampleProject;


describe('TestBoletoLogGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let i = 0;
        const logs = await starkbank.boleto.log.query({limit: 150});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            i += 1;
        }
        assert(i === 150);
    });
});


describe('TestBoletoLogInfoGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let logs = await starkbank.boleto.log.query({limit: 1});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            log = await starkbank.boleto.log.get(log.id);
            assert(typeof log.id == 'string');
        }
    });
});


describe('TestBoletoLogGetPage', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
        let cursor: string | null = null;
        let page: starkbank.boleto.Log[] | null = null;    
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.boleto.log.page({ limit: 5, cursor: cursor });
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
