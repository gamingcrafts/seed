const ESClient = require('./server/esclient');
const kpis = require('./mappings/player_daily_kpis');
const ruleEngineSettingsService = require('./rule-engine/services/settings-service');
const ruleEngineOperatorsService = require('./rule-engine/services/operators-service');

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

  const defaultSettings = {
    maxLabelsLength: 50,
    dropdownPlacement: 'bottomRight',
    hideConjForOne: true,
    renderSize: 'large',
    renderConjsAsRadios: false,
    renderFieldAndOpAsDropdown: true,
    groupActionsPosition: 'topRight', // oneOf [topLeft, topCenter, topRight, bottomLeft, bottomCenter, bottomRight]
    clearValueOnChangeField: false, //false - if prev & next fields have same type (widget), keep
    clearValueOnChangeOp: false,
    setDefaultFieldAndOp: false,
    maxNesting: 2,
    fieldSeparatorDisplay: '->',
    showLabels: true,
    valueLabel: "Value",
    valuePlaceholder: "Value",
    fieldLabel: "Filter users based on",
    operatorLabel: "Is",
    fieldPlaceholder: "Criteria",
    operatorPlaceholder: "",
    deleteLabel: null,
    addGroupLabel: "Add group",
    addRuleLabel: "Add rule",
    readonlyMode: false,
    notLabel: "Not",
    showNot: false,
    delGroupLabel: "Remove group",
    canLeaveEmptyGroup: false, //after deletion
    canReorder: true
  };
  let resp = await ruleEngineSettingsService.index(defaultSettings);

  let defaultOperators = {
    label: 'Between',
    labelForFormat: 'BETWEEN',
    cardinality: 2,
    formatOp: (field, op, values, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay) => {
      let valFrom = values.first();
      let valTo = values.get(1);
      if (isForDisplay)
        return `${field} >= ${valFrom} AND ${field} <= ${valTo}`;
      else
        return `${field} >= ${valFrom} && ${field} <= ${valTo}`;
    },
    reversedOp: 'not_between'
  }
  defaultOperators['formatOp'] = defaultOperators['formatOp'].toString();
  let respForOperators = await ruleEngineOperatorsService.index(defaultOperators);

}

module.exports = {
  run
}