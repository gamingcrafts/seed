const ESClient = require('./server/esclient');

const kpis = require('./mappings/player_daily_kpis');
const custom_mappings = require('./mappings/custom_mappings');

const run = async () => {
  let c = new ESClient();

  let res = await c.client().indices.exists({
    index: 'kpis'
  })

  

  if(!res) {
    new ESClient().client().indices.create({
      index: 'kpis',
      body: {
        mappings: {
          ...kpis
        }
      }
    });

    new ESClient().client().indices.create({
      index: 'custom_mappings',
      body: {
        mappings: {
          ...custom_mappings
        }
      }
    })
  }

  c.client().indices.get({index:"*"},(err,res)=>{
    console.log("-------------------------------")
    console.log(res);
    console.log("-------------------------------")
  })
}
 
module.exports = {
  run
}