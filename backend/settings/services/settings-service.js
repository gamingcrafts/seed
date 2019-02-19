const config = require('../../config');
const ESClient = require('../../server/esclient');
const INDEX = config.indexes.settings;
const TYPE = 'settings';
const client = new ESClient(INDEX, TYPE);

const index = async (settings) => {
    console.log(settings)
    const settingsString = JSON.stringify(settings);
    const resp = await client.index({
        body: {properties:settingsString},
        id:"1zsdf22322n2hjh2h2-settings-324kj23jkg32hg327"
    });
    console.log(settings);
    return {
        ...settings,
        id: resp._id
    };
};

const list = () => {
    return client
        .onResults(resp => resp.hits.hits.map(h => {
            const settings = {properties:JSON.parse(h._source.properties),
            id: h._id}
            return settings;
        }))
        .search({
            size: 1000
        });
};

module.exports = {
    index,
    list,
    get: client.get.bind(client)
};