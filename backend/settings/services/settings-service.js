const config = require('../../config');
const ESClient = require('../../server/esclient');
const INDEX = config.indexes.settings;
const TYPE = 'settings';
const client = new ESClient(INDEX, TYPE);

const index = async (settings) => {
    console.log("-----------------Settings---------------------")
    console.log(settings);
    const resp = await client.index({
        body: {config:JSON.stringify(settings)},
        id:"52ca246b-c595-4f9f-959b-2196ea411e8d"
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
        console.log(JSON.parse(resp['hits']['hits'][0]._source.config));
        return JSON.parse(resp['hits']['hits'][0]._source.config);
};

module.exports = {
    index,
    list,
    get: client.get.bind(client)
};