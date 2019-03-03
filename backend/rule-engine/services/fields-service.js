const config = require('../../config');
const ESClient = require('../../server/esclient');
const INDEX = config.indexes.ruleEngineFields;
const TYPE = 'ruleEngine';
const client = new ESClient(INDEX, TYPE);

const index = async (fields) => {
    const resp = await client.index({
        body: fields,
        id: "engine_fields"
    });
    return {
        ...fields
    };
};

const list = async () => {
    let resp = await client
        .onResults()
        .search({
            size: 1000
        });
    let fieldsDocument = undefined;
    resp['hits']['hits'].some((hit) => {
        if (hit._id === 'engine_fields') {
            fieldsDocument = hit;
            return true;
        }
    })
    let ruleEngineFields = {}
    if (fieldsDocument['_source'] !== undefined) {
        ruleEngineFields = fieldsDocument['_source'];
    }

    return ruleEngineFields;
};

module.exports = {
    index,
    list,
    get: client.get.bind(client)
};