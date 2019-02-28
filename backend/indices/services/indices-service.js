const ESClient = require('../../server/esclient');

const getAliases = async () => {
  let aliases = await new ESClient().client().cat.aliases({
    format: 'json'
  });

  return aliases.map(a => a.alias);
}

const getMapping = async indexName => {
  let mappings = {};
  let resp = await new ESClient().client().indices.getMapping({
    index: indexName
  });

  let values = Object.values(resp);
  values.forEach(value => {
    let types = Object.values(value.mappings || {});
    types.forEach(type => {
      mappings = type.properties || {};
    })
  });

  return mappings;
}


module.exports = {
  getMapping,
  getAliases
};