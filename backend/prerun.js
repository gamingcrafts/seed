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

  let defaultOperators = [ {
    label: 'equal',
    labelForFormat: '==',
    reversedOp: 'not_equal'
  },
   {
    label: 'not equal',
    labelForFormat: '!=',
    reversedOp: 'equal',
  },
   {
    label: 'lesser',
    labelForFormat: '<',
    reversedOp: 'greater_or_equal'
  },
  {
    label: 'less than or equal',
    labelForFormat: '<=',
    reversedOp: 'greater'
  },
  {
    label: 'greater',
    labelForFormat: '>',
    reversedOp: 'less_or_equal'
  },
   {
    label: 'greater then or equal',
    labelForFormat: '>=',
    reversedOp: 'less',
  },
  {
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
    valueLabels: [
      'Value from',
      'Value to'
    ],
    textSeparators: [
      null, null
    ],
    reversedOp: 'not_between'
  },
{
    label: 'Not between',
    labelForFormat: 'NOT BETWEEN',
    cardinality: 2,
    reversedOp: 'between',
    valueLabels: [
      'Value from',
      'Value to'
    ],
    textSeparators: [
      null,
      null
    ]
  },
  {
    isUnary: true,
    label: 'Empty',
    labelForFormat: 'IS EMPTY',
    cardinality: 0,
    reversedOp: 'is_not_empty',
    formatOp: (field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
      return isForDisplay ? `${field} IS EMPTY` : `!${field}`;
    }
  },
   {
    isUnary: true,
    label: 'Not Empty',
    labelForFormat: 'IS NOT EMPTY',
    cardinality: 0,
    reversedOp: 'is_empty',
    formatOp: (field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
      return isForDisplay ? `${field} IS NOT EMPTY` : `!!${field}`;
    }
  },
   {
    label: 'in',
    labelForFormat: '==',
    formatOp: (field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
      return `${field} == ${value}`;
    },
    reversedOp: 'select_not_equals',
  },
  {
    label: 'not in',
    labelForFormat: '!=',
    formatOp: (field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
      return `${field} != ${value}`;
    },
    reversedOp: 'select_equals',
  },


   {
    label: 'equal',
    labelForFormat: '==',
    formatOp: (field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
      return `${field} == ${value}`;
    },
    reversedOp: 'text_select_not_equals',
  },
  {
    label: 'not equal',
    labelForFormat: '!=',
    formatOp: (field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
      return `${field} != ${value}`;
    },
    reversedOp: 'text_select_equals',
  },



   {
    label: 'in',
    labelForFormat: 'in'
  },
 {
    label: 'before',
    labelForFormat: '<'
  },
  {
    label: 'after',
    labelForFormat: '>'
  },

   {
    label: 'in',
    labelForFormat: 'in'
  },




   {
    label: 'equal',
    labelForFormat: '==',
    reversedOp: 'agg_not_equal',
    options: {
      optionLabel: "In",
      optionTextBefore: "In",
      defaults: {
        timeframe: 'now-7d-to-now'
      }
    },
    formatOp: (field, op, values, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay) => {
      const optionValue = operatorOptions.get('timeframe');
      return `${field} ${opDef.labelForFormat} ${values} ${opDef.options.optionLabel} ${getReadableOptionValue(optionValue)}`
    }
  },
  {
    label: 'not equal',
    labelForFormat: '!=',
    reversedOp: 'agg_equal',
    options: {
      optionLabel: "In",
      optionTextBefore: "In",
      defaults: {
        timeframe: 'now-7d-to-now'
      }
    },
    formatOp: (field, op, values, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay) => {
      const optionValue = operatorOptions.get('timeframe');
      return `${field} ${opDef.labelForFormat} ${values} ${opDef.options.optionLabel} ${getReadableOptionValue(optionValue)}`
    }
  },
   {
    label: 'lesser',
    labelForFormat: '<',
    reversedOp: 'agg_greater_or_equal',
    options: {
      optionLabel: "In",
      optionTextBefore: "In",
      defaults: {
        timeframe: 'now-7d-to-now'
      }
    },
    formatOp: (field, op, values, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay) => {
      const optionValue = operatorOptions.get('timeframe');
      return `${field} ${opDef.labelForFormat} ${values} ${opDef.options.optionLabel} ${getReadableOptionValue(optionValue)}`
    }
  },
   {
    label: 'less than or equal',
    labelForFormat: '<=',
    reversedOp: 'agg_greater',
    options: {
      optionLabel: "In",
      optionTextBefore: "In",
      defaults: {
        timeframe: 'now-7d-to-now'
      }
    },
    formatOp: (field, op, values, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay) => {
      const optionValue = operatorOptions.get('timeframe');
      return `${field} ${opDef.labelForFormat} ${values} ${opDef.options.optionLabel} ${getReadableOptionValue(optionValue)}`
    }
  },
  {
    label: 'greater',
    labelForFormat: '>',
    reversedOp: 'agg_less_or_equal',
    options: {
      optionLabel: "In",
      optionTextBefore: "In",
      defaults: {
        timeframe: 'now-7d-to-now'
      }
    },
    formatOp: (field, op, values, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay) => {
      const optionValue = operatorOptions.get('timeframe');
      return `${field} ${opDef.labelForFormat} ${values} ${opDef.options.optionLabel} ${getReadableOptionValue(optionValue)}`
    }
  },
  {
    label: 'greater then or equal',
    labelForFormat: '>=',
    reversedOp: 'agg_less',
    options: {
      optionLabel: "In",
      optionTextBefore: "In",
      defaults: {
        timeframe: 'now-7d-to-now'
      }
    },
    formatOp: (field, op, values, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay) => {
      const optionValue = operatorOptions.get('timeframe');
      return `${field} ${opDef.labelForFormat} ${values} ${opDef.options.optionLabel} ${getReadableOptionValue(optionValue)}`
    }
  },

   {
    label: 'Between',
    labelForFormat: 'BETWEEN',
    cardinality: 2,
    formatOp: (field, op, values, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay) => {
      //console.log(JSON.stringify(field), JSON.stringify(op), JSON.stringify(values), JSON.stringify(valueSrcs), JSON.stringify(valueTypes), JSON.stringify(opDef), JSON.stringify(operatorOptions), JSON.stringify(isForDisplay))
      let valFrom = values.first();
      let valTo = values.get(1);
      const optionValue = operatorOptions.get('timeframe');
      if (isForDisplay)
        return `${field} >= ${valFrom} AND ${field} <= ${valTo} ${opDef.options.optionLabel} ${getReadableOptionValue(optionValue)}`;
      else
        return `${field} >= ${valFrom} && ${field} <= ${valTo}`;
    },
    valueLabels: [
      'Value from',
      'Value to'
    ],
    textSeparators: [
      null, null
    ],
    reversedOp: 'agg_not_between',
    options: {
      optionLabel: "In",
      optionTextBefore: "In",
      defaults: {
        timeframe: 'now-7d-to-now'
      }
    }
  },
   {
    label: 'Not between',
    labelForFormat: 'NOT BETWEEN',
    cardinality: 2,
    reversedOp: 'agg_between',
    valueLabels: [
      'Value from',
      'Value to'
    ],
    textSeparators: [
      null,
      null
    ],
    options: {
      optionLabel: "In",
      optionTextBefore: "In",
      defaults: {
        timeframe: 'now-7d-to-now'
      }
    }
  }
  ];
  var operatorsObject = {};
  defaultOperators.forEach(async function (dos) {
    if (dos['formatOp'] !== undefined)
      dos['formatOp'] = dos['formatOp'].toString()
    operatorsObject[dos.label] = dos;

  })
  let respForOperators = await ruleEngineOperatorsService.index(operatorsObject);
}
module.exports = {
  run
}