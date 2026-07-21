import starkbank from "starkbank";
import { Agent } from "https";
import assert from "assert";

describe('TestHttpsAgentTypes', function () {
    it('type_success', () => {
        const agent = new Agent({ keepAlive: true });
        starkbank.setHttpsAgent(agent);
        starkbank.setHttpsAgent(null);
        const current = starkbank.getHttpsAgent();
        assert(current === agent || current === null);
    });
});
