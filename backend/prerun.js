const ESClient = require('./server/esclient');
const kpis = require('./mappings/player_daily_kpis');
const ruleEngineSettingsService = require('./rule-engine/services/settings-service');
const ruleEngineOperatorsService = require('./rule-engine/services/operators-service');
let  {ruleEngineDefaultSettings,ruleEngineDefaultOperators,ruleEngineDefaultFields} = require('./prerun-data');

const run = async () => {
  let c = new ESClient();

  let res = await c.client().indices.exists({
    index: 'kpis'
  })
  if (!res) {
    new ESClient().client().indices.create({
      index: 'kpis',
      body: {
        mappings: {
          ...kpis
        }
      }
    });
  }
  //Insert Default Settings
  let respForSettings = await ruleEngineSettingsService.index(ruleEngineDefaultSettings);

 //Insert Default Operators
  let operatorsObject = {};
  ruleEngineDefaultOperators.forEach(async function (dos) {
    if (dos['formatOp'] !== undefined)
      dos['formatOp'] = dos['formatOp'].toString()
    operatorsObject[dos.name] = dos;

  })
  let respForOperators = await ruleEngineOperatorsService.index(operatorsObject);
}
module.exports = {
  run
}