const config = require('../../config');
const ESClient = require('../../server/esclient');
const INDEX = config.indexes.settings;
const TYPE = 'settings';
const client = new ESClient(INDEX, TYPE);

const index = async (settings, id) => {
    const settingsString = {settings:JSON.stringify(settings)};
    const resp = await client.index({
        body: settingsString,
        id:"1zsdf22322n2hjh2h2-settings-324kj23jkg32hg327"
    });
    return {
        ...settings,
        id: resp._id
    };
};

const list = () => {
    return client
        .onResults(resp => resp.hits.hits.map(h => {
            const settings = {settings:JSON.parse(h._source.settings),
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