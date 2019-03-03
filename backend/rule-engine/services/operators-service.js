const config = require('../../config');
const ESClient = require('../../server/esclient');
const INDEX = config.indexes.ruleEngine;
const TYPE = 'ruleEngine';
const client = new ESClient(INDEX, TYPE);

const index = async (operators) => {
    const resp = await client.index({
        body: {
            operators: JSON.stringify(operators)
        },
        id: "engine_operators"
    });
    return {
        ...operators
    };
};

const list = async () => {
    let resp = await client
        .onResults()
        .search({
            size: 1000
        });
    let operatorsDocument = undefined;
    resp['hits']['hits'].some((hit) => {
        if (hit._id === 'engine_operators') {
            operatorsDocument = hit;
            return true;
        }
    })
    let ruleEngineOperators = {}
    if (operatorsDocument['_source']['operators'] !== undefined) {
        ruleEngineOperators = operatorsDocument['_source']['operators'];
    }

    return ruleEngineOperators;
};

module.exports = {
    index,
    list,
    get: client.get.bind(client)
};