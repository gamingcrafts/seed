const ruleEngineDefaultSettings  = {
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

  const ruleEngineDefaultOperators = [{
    name: 'equal',
    label: 'equal',
    labelForFormat: '==',
    reversedOp: 'not_equal'
  },
  {
    name: 'not_equal',
    label: 'not equal',
    labelForFormat: '!=',
    reversedOp: 'equal',
  },
  {
    name: 'less',
    label: 'lesser',
    labelForFormat: '<',
    reversedOp: 'greater_or_equal'
  },
  {
    name: 'less_or_equal',
    label: 'less than or equal',
    labelForFormat: '<=',
    reversedOp: 'greater'
  },
  {
    name: 'greater',
    label: 'greater',
    labelForFormat: '>',
    reversedOp: 'less_or_equal'
  },
  {
    name: 'greater_or_equal',
    label: 'greater then or equal',
    labelForFormat: '>=',
    reversedOp: 'less',
  },
  {
    name: 'between',
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
    name: 'not_between',
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
    name: 'is_empty',
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
    name: 'is_not_empty',
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
    name: 'select_equals',
    label: 'in',
    labelForFormat: '==',
    formatOp: (field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
      return `${field} == ${value}`;
    },
    reversedOp: 'select_not_equals',
  },
  {
    name: 'select_not_equals',
    label: 'not in',
    labelForFormat: '!=',
    formatOp: (field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
      return `${field} != ${value}`;
    },
    reversedOp: 'select_equals',
  },


  {
    name: 'text_select_equals',
    label: 'equal',
    labelForFormat: '==',
    formatOp: (field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
      return `${field} == ${value}`;
    },
    reversedOp: 'text_select_not_equals',
  },
  {
    name: 'text_select_not_equals',
    label: 'not equal',
    labelForFormat: '!=',
    formatOp: (field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
      return `${field} != ${value}`;
    },
    reversedOp: 'text_select_equals',
  },



  {
    name: 'date_between',
    label: 'in',
    labelForFormat: 'in'
  },
  {
    name: 'date_before',
    label: 'before',
    labelForFormat: '<'
  },
  {
    name: 'date_after',
    label: 'after',
    labelForFormat: '>'
  },

  {
    name: 'contains',
    label: 'in',
    labelForFormat: 'in'
  },




  {
    name: 'agg_equal',
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
    name: 'agg_not_equal',
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
    name: 'agg_less',
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
    name: 'agg_less_or_equal',
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
    name: 'agg_greater',
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
    name: 'agg_greater_or_equal',
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
    name: 'agg_between',
    label: 'Between',
    labelForFormat: 'BETWEEN',
    cardinality: 2,
    formatOp: (field, op, values, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay) => {
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
    name: 'agg_not_between',
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

const ruleEngineDefaultFields = [
  {
  "player": {
  "label": "Player Attributes",
  "type": "!struct",
  "subfields": {
  "city.keyword": {
  "label": "City",
  "type": "text",
  "operators": [
  "equal",
  "not_equal",
  "is_empty",
  "is_not_empty"
  ],
  "defaultOperator": "equal",
  "mainWidgetProps": {
  "valueLabel": "To",
  "valuePlaceholder": "Enter City Name"
  }
  },
  "gender": {
  "label": "Gender",
  "type": "select",
  "operators": [
  "text_select_equals"
  ],
  "defaultOperator": "text_select_equals",
  "listValues": {
  "Male": "Male",
  "Female": "Female",
  "male": "male",
  "female": "female"
  },
  "mainWidgetProps": {
  "valueLabel": "To",
  "valuePlaceholder": "Customer Gender"
  }
  },
  "loginStatus": {
  "label": "Login Status",
  "type": "select",
  "operators": [
  "text_select_equals"
  ],
  "defaultOperator": "text_select_equals",
  "listValues": {
  "Online": "Online",
  "Offline": "Offline"
  },
  "mainWidgetProps": {
  "valueLabel": "To",
  "valuePlaceholder": "Login Status"
  }
  },
  "levelPoints": {
  "label": "Level Points",
  "type": "number",
  "operators": [
  "less_or_equal",
  "greater_or_equal",
  "between"
  ],
  "defaultOperator": "greater_or_equal",
  "mainWidgetProps": {
  "valueLabel": "To",
  "valuePlaceholder": "Player Level points"
  }
  },
  "lastLogin": {
  "label": "Last Login",
  "type": "select",
  "operators": [
  "date_between",
  "date_before"
  ],
  "defaultOperator": "date_between",
  "listValues": {
  "now-15m-to-now": "Last 15 minutes",
  "now-30m-to-now": "Last 30 minutes",
  "now-1h-to-now": "Last 1 hour",
  "now-4h-to-now": "Last 4 hours",
  "now-12h-to-now": "Last 12 hours",
  "now-24h-to-now": "Last 24 hours",
  "now-48h-to-now": "Last 48 hours",
  "now-7d-to-now": "Last 7 days",
  "now-30d-to-now": "Last 30 days",
  "now-60d-to-now": "Last 60 days",
  "now-90d-to-now": "Last 90 days",
  "now-6M-to-now": "Last 6 months",
  "now-1y-to-now": "Last 1 year",
  "now-2y-to-now": "Last 2 years",
  "now-5y-to-now": "Last 5 years"
  },
  "mainWidgetProps": {}
  },
  "membershipDate": {
  "label": "Membership date",
  "type": "select",
  "operators": [
  "date_between",
  "date_before"
  ],
  "defaultOperator": "date_between",
  "listValues": {
  "now-15m-to-now": "Last 15 minutes",
  "now-30m-to-now": "Last 30 minutes",
  "now-1h-to-now": "Last 1 hour",
  "now-4h-to-now": "Last 4 hours",
  "now-12h-to-now": "Last 12 hours",
  "now-24h-to-now": "Last 24 hours",
  "now-48h-to-now": "Last 48 hours",
  "now-7d-to-now": "Last 7 days",
  "now-30d-to-now": "Last 30 days",
  "now-60d-to-now": "Last 60 days",
  "now-90d-to-now": "Last 90 days",
  "now-6M-to-now": "Last 6 months",
  "now-1y-to-now": "Last 1 year",
  "now-2y-to-now": "Last 2 years",
  "now-5y-to-now": "Last 5 years"
  },
  "mainWidgetProps": {}
  },
  "registrationTimestamp": {
  "label": "Registration",
  "type": "select",
  "operators": [
  "date_between",
  "date_before"
  ],
  "defaultOperator": "date_between",
  "listValues": {
  "now-15m-to-now": "Last 15 minutes",
  "now-30m-to-now": "Last 30 minutes",
  "now-1h-to-now": "Last 1 hour",
  "now-4h-to-now": "Last 4 hours",
  "now-12h-to-now": "Last 12 hours",
  "now-24h-to-now": "Last 24 hours",
  "now-48h-to-now": "Last 48 hours",
  "now-7d-to-now": "Last 7 days",
  "now-30d-to-now": "Last 30 days",
  "now-60d-to-now": "Last 60 days",
  "now-90d-to-now": "Last 90 days",
  "now-6M-to-now": "Last 6 months",
  "now-1y-to-now": "Last 1 year",
  "now-2y-to-now": "Last 2 years",
  "now-5y-to-now": "Last 5 years"
  },
  "mainWidgetProps": {}
  },
  "accountStatus": {
  "label": "Account Status",
  "type": "select",
  "operators": [
  "text_select_equals"
  ],
  "mainWidgetProps": {
  "valueLabel": "To",
  "valuePlaceholder": "Select Status"
  },
  "defaultOperator": "text_select_equals",
  "listValues": {
  "Active": "Active",
  "InActive": "InActive",
  "Blocked": "Blocked"
  }
  },
  "mailStatus": {
  "label": "Mail Status",
  "type": "number",
  "operators": [
  "equal"
  ],
  "mainWidgetProps": {
  "valueLabel": "To",
  "valuePlaceholder": "Status 1 or 0"
  }
  },
  "username": {
  "label": "User names",
  "type": "text",
  "operators": [
  "contains"
  ],
  "defaultOperator": "contains",
  "mainWidgetProps": {
  "valueLabel": "Value",
  "valuePlaceholder": "Comma Seperated Usernames"
  }
  },
  "id": {
  "label": "User Id",
  "type": "text",
  "operators": [
  "contains"
  ],
  "defaultOperator": "contains",
  "mainWidgetProps": {
  "valueLabel": "Value",
  "valuePlaceholder": "Comma Seperated Ids"
  }
  },
  "instantTotBalance": {
  "label": "Current Balance",
  "type": "number",
  "operators": [
  "less_or_equal",
  "greater_or_equal",
  "between"
  ],
  "defaultOperator": "greater_or_equal",
  "mainWidgetProps": {
  "valueLabel": "To",
  "valuePlaceholder": "Player Current Balance"
  }
  }
  }
  }
  },
  {
  "player_daily_kpis": {
  "label": "Player KPIs",
  "type": "!struct",
  "subfields": {
  "deposits": {
  "label": "No of Deposits made",
  "type": "number",
  "operators": [
  "agg_less_or_equal",
  "agg_greater_or_equal",
  "agg_between"
  ],
  "defaultOperator": "agg_between",
  "mainWidgetProps": {
  "valueLabel": "To",
  "valuePlaceholder": "Amount"
  }
  },
  "withdrawals": {
  "label": "No of Withdrawals made",
  "type": "number",
  "operators": [
  "agg_less_or_equal",
  "agg_greater_or_equal",
  "agg_between"
  ],
  "defaultOperator": "agg_between",
  "mainWidgetProps": {
  "valueLabel": "To",
  "valuePlaceholder": "Amount"
  }
  },
  "depositAmount": {
  "label": "Total Deposit Amount",
  "type": "number",
  "operators": [
  "agg_less_or_equal",
  "agg_greater_or_equal",
  "agg_between"
  ],
  "defaultOperator": "agg_between",
  "mainWidgetProps": {
  "valueLabel": "To",
  "valuePlaceholder": "Amount"
  }
  },
  "transactions": {
  "label": "No of Game transactions",
  "type": "number",
  "operators": [
  "agg_less_or_equal",
  "agg_greater_or_equal",
  "agg_between"
  ],
  "defaultOperator": "agg_between",
  "mainWidgetProps": {
  "valueLabel": "To",
  "valuePlaceholder": "Amount"
  }
  },
  "revenue": {
  "label": "Total Renenue",
  "type": "number",
  "operators": [
  "agg_less_or_equal",
  "agg_greater_or_equal",
  "agg_between"
  ],
  "defaultOperator": "agg_between",
  "mainWidgetProps": {
  "valueLabel": "To",
  "valuePlaceholder": "Amount"
  }
  },
  "realRevenue": {
  "label": "Real Revenue",
  "type": "number",
  "operators": [
  "agg_less_or_equal",
  "agg_greater_or_equal",
  "agg_between"
  ],
  "defaultOperator": "agg_between",
  "mainWidgetProps": {
  "valueLabel": "To",
  "valuePlaceholder": "Amount"
  }
  },
  "actualRevenue": {
  "label": "Actual Revenue",
  "type": "number",
  "operators": [
  "agg_less_or_equal",
  "agg_greater_or_equal",
  "agg_between"
  ],
  "defaultOperator": "agg_between",
  "mainWidgetProps": {
  "valueLabel": "To",
  "valuePlaceholder": "Amount"
  }
  },
  "bonusRevenue": {
  "label": "Bonus Revenue",
  "type": "number",
  "operators": [
  "agg_less_or_equal",
  "agg_greater_or_equal",
  "agg_between"
  ],
  "defaultOperator": "agg_between",
  "mainWidgetProps": {
  "valueLabel": "To",
  "valuePlaceholder": "Amount"
  }
  },
  "win": {
  "label": "Total Win",
  "type": "number",
  "operators": [
  "agg_less_or_equal",
  "agg_greater_or_equal",
  "agg_between"
  ],
  "defaultOperator": "agg_between",
  "mainWidgetProps": {
  "valueLabel": "To",
  "valuePlaceholder": "Amount"
  }
  },
  "pot": {
  "label": "Total Pot",
  "type": "number",
  "operators": [
  "agg_less_or_equal",
  "agg_greater_or_equal",
  "agg_between"
  ],
  "defaultOperator": "agg_between",
  "mainWidgetProps": {
  "valueLabel": "To",
  "valuePlaceholder": "Amount"
  }
  },
  "stake": {
  "label": "Total Stake",
  "type": "number",
  "operators": [
  "agg_less_or_equal",
  "agg_greater_or_equal",
  "agg_between"
  ],
  "defaultOperator": "agg_between",
  "mainWidgetProps": {
  "valueLabel": "To",
  "valuePlaceholder": "Amount"
  }
  }
  }
  }
  },
  {
  "segment": {
  "label": "Segments",
  "type": "!struct",
  "subfields": {
  "-existing-segment-": {
  "label": "Existing Segment",
  "type": "select",
  "operators": [
  "text_select_equals"
  ],
  "mainWidget": "select",
  "defaultOperator": "text_select_equals",
  "listValues": {},
  "mainWidgetProps": {
  "valueLabel": "",
  "valuePlaceholder": "Add Existing Segment"
  }
  }
  }
  }
  }
  ];

module.exports={
ruleEngineDefaultSettings,
ruleEngineDefaultOperators,ruleEngineDefaultFields
}