const ESClient = require('./server/esclient');
const kpis = require('./mappings/player_daily_kpis');
const config = require('./config');
const ruleEngineSettingsService = require('./rule-engine/services/settings-service');
const ruleEngineOperatorsService = require('./rule-engine/services/operators-service');
const ruleEngineFieldsService = require('./rule-engine/services/fields-service');
let  {ruleEngineDefaultSettings,ruleEngineDefaultOperators,ruleEngineDefaultFields} = require('./prerun-data');

const run = async () => {
  let c = new ESClient();

  let res = await c.client().indices.exists({
    index: 'kpis'
  })
  let isSettingIndexExists = await c.client().indices.exists({
    index: config.indexes.setting
  })
  let isRuleEngineIndexExists = await c.client().indices.exists({
    index: config.indexes.ruleEngine
  })

  
  if (!res) {
    new ESClient().client().indices.create({
      index: 'kpis',
      body: {
        mappings: {
          ...kpis
        },
        "aliases" : {
          "KPI" : {}
      }
      }
    });
  }
  if(!isSettingIndexExists){
    new ESClient().client().indices.create({
      index: config.indexes.setting,
      body:{
        "aliases" : {
          "Settings" : {}
      }
      }
      
    });
  }
  if(!isRuleEngineIndexExists){
    new ESClient().client().indices.create({
      index: config.indexes.ruleEngine,
      body:{
        "aliases" : {
          "Rule-Engine" : {}
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

  let fieldsObject = {};
  ruleEngineDefaultFields.forEach((field)=>{
    let indexName = Object.keys(field)[0]
    fieldsObject[indexName] = field[indexName];
  })
  let resForFields = await ruleEngineFieldsService.index(fieldsObject);
}
module.exports = {
  run
}