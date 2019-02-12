const ESClient = require('../../server/esclient');

const getAllindices = async () => {
  return await new ESClient().client().indices.get({
    index: "*"
  });
}

const getMapping = async indexName => {
  let resp = await new ESClient().client().indices.getMapping({ 
    index: indexName
  });

  let type = Object.keys(resp[indexName].mappings)[0];
  return resp[indexName].mappings[type].properties;
}


module.exports = {
  getAllindices,
  getMapping
};