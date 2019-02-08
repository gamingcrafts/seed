const ESClient = require('./server/esclient');

const kpis = require('./mappings/player_daily_kpis');

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