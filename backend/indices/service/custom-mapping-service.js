const config = require('../../config');
const ESClient = require('../../server/esclient');
const INDEX = config.indexes.customMapping;
const TYPE = 'customMapping';
const client = new ESClient(INDEX, TYPE);

const index = async (customMapping, id) => {
    const resp = await client.index({
        body: customMapping,
        id
    });
    return {
        ...customMapping,
        id: resp._id
    };
};

const getAllindices = async () => {
   let resp=  await new ESClient().client().indices.get({
        index: "*"
    });

    
        if (!resp){
            return new Error("Get all Indices Error");
        }
        else{
            console.log(resp)
            return resp;
        }
    
}
const list = () => {
    return client
        .onResults(resp => resp.hits.hits.map(h => ({
            ...h._source,
            id: h._id
        })))
        .search({
            size: 1000
        });
};

module.exports = {
    index,
    list,
    get: client.get.bind(client),
    getAllindices
};