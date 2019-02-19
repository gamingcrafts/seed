const ESClient = require('./server/esclient');

const kpis = require('./mappings/player_daily_kpis');

const settingsService = require('./settings/services/settings-service');

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
  let resp = await settingsService.index(defaultSettings);

}
 
module.exports = {
  run
}