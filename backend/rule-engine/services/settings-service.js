const config = require('../../config');
const ESClient = require('../../server/esclient');
const INDEX = config.indexes.ruleEngine;
const TYPE = 'ruleEngine';
const client = new ESClient(INDEX, TYPE);

const index = async (settings) => {
    const resp = await client.index({
        body: {
            config: JSON.stringify(settings)
        },
        id: "engine_settings"
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
    let ruleEngineSettings = {}
    if (resp['hits']['hits'][0]._source.config !== undefined) {
        ruleEngineSettings = JSON.parse(resp['hits']['hits'][0]._source.config);
    }
    return ruleEngineSettings;

};

module.exports = {
    index,
    list,
    get: client.get.bind(client)
};