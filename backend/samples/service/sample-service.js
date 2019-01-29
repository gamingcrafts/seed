const config = require('../../config');
const ESClient = require('../../server/esclient');
const INDEX = config.indexes.sample;
const TYPE = 'sample';
const client = new ESClient(INDEX, TYPE);

const index = async (sample, id) => {
  const resp = await client.index({ body: sample, id });
  return { ...sample, id: resp._id };
};

module.exports = {
  index,
  del: client.delete.bind(client),
  get: client.get.bind(client)
};