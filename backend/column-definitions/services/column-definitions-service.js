const config = require('../../config');
const ESClient = require('../../server/esclient');
const INDEX = config.indexes.setting;
const TYPE = 'optikpi_setting';
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

const getOneCustomMapping = async (indexName) => {
  console.log("---------------Get One Mapping------------")
  return client
    .onResults((resp) =>{
      console.log(resp);
      resp.hits.hits.filter((r) => r._source.indexName == indexName).map(h => ({
        ...h._source,
        id: h._id
      }))})
    .search({
      size: 1000
    });
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
  getOneCustomMapping
};