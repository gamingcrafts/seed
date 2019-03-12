const config = require('../../config');
const ESClient = require('../../server/esclient');
const INDEX = config.indexes.ruleEngineReports;
const TYPE = 'reports';
const client = new ESClient(INDEX, TYPE);

const index = async (report, id) => {
  if(report['config']!==undefined){
    report['config'] = JSON.stringify(report['config']);
  }
  const resp = await client.index({ body: report, id });
  return { ...report, id: resp._id };
};

const list = () => {
  return client
    .onResults(resp => resp.hits.hits.map(h => {
        
        let report  = h._source;
        if(report['config']!==undefined){
        report['config'] = JSON.parse(report['config'])
        }
        return { ...report, id: h._id }

}))
    .search({ size: 1000 });
};

module.exports = {
  index,
  list,
  del: client.delete.bind(client),
  get: client.get.bind(client)
};