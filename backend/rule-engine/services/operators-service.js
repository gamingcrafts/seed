const config = require('../../config');
const ESClient = require('../../server/esclient');
const INDEX = config.indexes.ruleEngine;
const TYPE = 'ruleEngine';
const client = new ESClient(INDEX, TYPE);

const index = async (settings) => {
    const resp = await client.index({
        body: {
            operators: JSON.stringify(settings)
        },
        id: "engine_operators"
    });
    return {
        ...settings
    };
};

const list = async () => {
    let resp = await client
        .onResults()
        .search({
            size: 1000
        });
    let ruleEngineOperators = {}
    if (resp['hits']['hits'][0]._source.operators !== undefined) {
        ruleEngineOperators = JSON.parse(resp['hits']['hits'][0]._source.operators);
    }
    return ruleEngineOperators;
};

module.exports = {
    index,
    list,
    get: client.get.bind(client)
};