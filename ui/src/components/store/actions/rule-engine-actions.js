import {
  SETTINGS_GET_SUCCESS,
  SETTINGS_GET_FAILURE,
  UPDATE_SEGMENTATION_TEXT_BOX,
  UPDATE_SEGMENTATION_CHECK_BOX,
  UPDATE_SEGMENTATION_NUMBER_BOX,
  OPERATORS_GET_SUCCESS,
  OPERATORS_GET_FAILURE,
  TOGGLE_RULE_ENGINE_OPERATOR_FORM,
  TOGGLE_RULE_ENGINE_OPERATOR_LIST,
  UPDATE_OPERATORS_TEXT_BOX,
  UPDATE_OPERATORS_NUMBER_BOX,
  FIELDS_GET_SUCCESS,
  TOGGLE_SUB_FIELDS_LIST,
  TOGGLE_FIELDS_LIST,
  SHOW_ADD_FIELD_MODAL,
  SHOW_ADD_SUB_FIELD_MODAL,
  HIDE_ADD_FIELD_MODAL,
  HIDE_ADD_SUB_FIELD_MODAL,
  UPDATE_FIELDS_TEXT_BOX,
  UPDATE_FIELDS_SUCCESS,
  UPDATE_SUB_FIELDS_TEXT_BOX,
  UPDATE_SUB_FIELDS_SUCCESS,
  UPDATE_LOCAL_UPDATED_SUB_FIELD_LIST,
  UPDATE_SELECTED_SUB_FIELD_LIST,
  UPDATE_SELECTED_FIELD_LIST,
  UPDATE_ARGUMENTS_AREA,
  UPDATE_OPERATOR_FUNCTION_RESULT,
  REPORTS_GET_SUCCESS,
  SHOW_ADD_REPORT_MODAL,
  HIDE_ADD_REPORT_MODAL,
  UPDATE_REPORT_LIST_TEXT_BOX,
  CREATE_NEW_REPORT_SUCCESS,
  SHOW_REPORT_FORM,HIDE_REPORT_FORM,
  UPDATE_REPORT_FORM_TEXT_BOX,
  UPDATE_REPORT_SUCCESS
} from "../actions/types";
const getSettings = () => {
  return (dispatch, getState, http) => {
    http.get('/ruleengine/settings/')
      .then(res => {
        dispatch({
          type: SETTINGS_GET_SUCCESS,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: SETTINGS_GET_FAILURE,
          payload: err
        })
      })
  }
}
const updateSettings = settings => {
  return (dispatch, getState, http) => {
    http.put('/ruleengine/settings/', settings).then(resp => {
    }).catch(err => {
    })
  }
}
const updateTextBox = textBoxValue => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_SEGMENTATION_TEXT_BOX,
      payload: textBoxValue
    })
  }
}
const toogleCheckBox = checkBoxValue => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_SEGMENTATION_CHECK_BOX,
      payload: checkBoxValue
    })
  }
}
const updateNumberBox = textBoxValue => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_SEGMENTATION_NUMBER_BOX,
      payload: textBoxValue
    })
  }
}
const getOperators = () => {
  return (dispatch, getState, http) => {
    http.get('/ruleengine/operators/')
      .then(res => {
        dispatch({
          type: OPERATORS_GET_SUCCESS,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: OPERATORS_GET_FAILURE,
          payload: err
        })
      })
  }
}
const toogleRuleEngineOperatorForm = (operatorName) => {
  var operator ={name: undefined};
  if (operatorName !== undefined) {
    operator['name'] = operatorName
  }
  return (dispatch, getState, http) => {
    dispatch({
      type: TOGGLE_RULE_ENGINE_OPERATOR_FORM,
      payload: operator
    })
  }
}
const toogleRuleEngineOperatorList = () => {
  return (dispatch, getState, http) => {
    dispatch({
      type: TOGGLE_RULE_ENGINE_OPERATOR_LIST
    })
  }
}
const updateOperatorsTextBox=(textBoxValue)=>{
  return (dispatch) => {
    dispatch({
      type: UPDATE_OPERATORS_TEXT_BOX,
      payload: textBoxValue
    })
  }
}
const updateOperatorsNumberBox=(numberBoxValue)=>{
  return (dispatch) => {
    dispatch({
      type: UPDATE_OPERATORS_NUMBER_BOX,
      payload: numberBoxValue
    })
  }
}
const updateArgumentsBox = (value)=>{
  return (dispatch) => {
    dispatch({
      type: UPDATE_ARGUMENTS_AREA,
      payload: value
    })
  }
}

const executeOperatorFunction=(operatorValue,args)=>{
  return (dispatch, getState, http) => {
  
  var argsObj = JSON.parse(args);
  let {field, op, values, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay} = argsObj;
  let functionBody = operatorValue.formatOp;
  let excutableFunction = new Function('field', 'op', 'values', 'valueSrcs', 'valueTypes', 'opDef', 'operatorOptions', 'isForDisplay',functionBody);
  let functionResult = excutableFunction(field, op, values, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay);
  dispatch({
    type: UPDATE_OPERATOR_FUNCTION_RESULT,
    payload: functionResult
  })
  }
}
const updateOperators = operators => {
  return (dispatch, getState, http) => {
    http.put('/ruleengine/operators/', operators).then(resp => {
      dispatch({
        type: TOGGLE_RULE_ENGINE_OPERATOR_LIST
      })
    }).catch(err => {
    })
  }
}
const getFields = () => {
  return (dispatch, getState, http) => {
    http.get('/ruleengine/fields/')
      .then(res => {
        dispatch({
          type: FIELDS_GET_SUCCESS,
          payload: res.data
        })
      }).catch(err => {
      })
  }
}
const toogleSubFieldsList = (fieldName)=>{
  return (dispatch, getState, http) => {
    dispatch({
      type: TOGGLE_SUB_FIELDS_LIST,
      payload: fieldName
    })
  }
}
const toogleFieldsList = ()=>{
  return (dispatch, getState, http) => {
    dispatch({
      type: TOGGLE_FIELDS_LIST
    })
  }
}

const showAddFieldModal = ()=>{
  return (dispatch, getState, http) => {
    dispatch({
      type: SHOW_ADD_FIELD_MODAL
    })
  }
}

const hideAddFieldModal = ()=>{
  return (dispatch, getState, http) => {
    dispatch({
      type: HIDE_ADD_FIELD_MODAL
    })
  }
}

const showAddSubFieldModal = ()=>{
  return (dispatch, getState, http) => {
    dispatch({
      type: SHOW_ADD_SUB_FIELD_MODAL
    })
  }
}

const hideAddSubFieldModal = ()=>{
  return (dispatch, getState, http) => {
    dispatch({
      type: HIDE_ADD_SUB_FIELD_MODAL
    })
  }
}

const updateAddFieldsTextBox=(textBoxValue)=>{
  return (dispatch) => {
    dispatch({
      type: UPDATE_FIELDS_TEXT_BOX,
      payload: textBoxValue
    })
  }
}

const updateSubAddFieldsTextBox=(textBoxValue)=>{
  return (dispatch) => {
    dispatch({
      type: UPDATE_SUB_FIELDS_TEXT_BOX,
      payload: textBoxValue
    })
  }
}

const updateRuleEngineFields = (fields)=>{
  return (dispatch, getState, http) => {
    http.put('/ruleengine/fields/', fields).then(resp => {
      dispatch({
        type: UPDATE_FIELDS_SUCCESS,
        payload: {fields:fields}
      })
    }).catch(err => {
    })
  }
}

const updateRuleEngineSubFields = (fields)=>{
  return (dispatch, getState, http) => {
    http.put('/ruleengine/fields/', fields).then(resp => {
      dispatch({
        type: UPDATE_SUB_FIELDS_SUCCESS,
        payload: {fields:fields}
      })
    }).catch(err => {
    })
  }

}

const updateRuleEngineSubfieldsLocalList=(fields)=>{
  return (dispatch, getState, http) => {
    dispatch({
      type: UPDATE_LOCAL_UPDATED_SUB_FIELD_LIST,
      payload: {fields:fields}
    })
 }
}
const updateSelectedSubFields = (selectedField,selectedSubFields)=>{

  return (dispatch, getState, http) => {
    dispatch({
      type: UPDATE_SELECTED_SUB_FIELD_LIST,
      payload: {field:selectedField,subFields:selectedSubFields}
    })
 }
}

const updateSelectedFields = (selectedFields)=>{
  return (dispatch, getState, http) => {
    dispatch({
      type: UPDATE_SELECTED_FIELD_LIST,
      payload: {fields:selectedFields}
    })
 }
}

const getReports = () => {
  return (dispatch, getState, http) => {
    http.get('/ruleengine/reports/')
      .then(res => {
        dispatch({
          type: REPORTS_GET_SUCCESS,
          payload: res.data
        })
      }).catch(err => {
      })
  }
}

const showAddReportModal = ()=>{
  return (dispatch, getState, http) => {
    dispatch({
      type: SHOW_ADD_REPORT_MODAL
    })
  }
}

const hideAddReportModal = ()=>{
  return (dispatch, getState, http) => {
    dispatch({
      type: HIDE_ADD_REPORT_MODAL
    })
  }
}

const updateAddReportObjectTextBox=(textBoxValue)=>{
  return (dispatch) => {
    dispatch({
      type: UPDATE_REPORT_LIST_TEXT_BOX,
      payload: textBoxValue
    })
  }
}

const addReport = (newReport)=>{
  return (dispatch, getState, http) => {
    http.post('/ruleengine/reports/', newReport).then(resp => {
      dispatch({
        type: CREATE_NEW_REPORT_SUCCESS,
        payload: resp.data
      })
    
    }).catch(err => {
    })
  }
}

const showRuleEngineReportsForm = (selectedReport)=>{
  if(selectedReport['config']===undefined){
    selectedReport['config']={
      indexName:'',
      query:'',
      sortField:'',
      sortDirection:''
    }
  }
  return (dispatch, getState, http) => {
    http.get('/alias')
      .then(res => {
        dispatch({
          type: SHOW_REPORT_FORM,
          payload:{selectedReport:selectedReport,aliases:res.data}
        })
      })
      .catch(err => {
        })
  }
}

const hideRuleEngineReportsForm=()=>{
  return (dispatch, getState, http) => {
    dispatch({
      type: HIDE_REPORT_FORM
    })
  }
}
const updateReportText=(textBoxValue)=>{
  return (dispatch) => {
    dispatch({
      type: UPDATE_REPORT_FORM_TEXT_BOX,
      payload: textBoxValue
    })
  }
}
const updateReport=(updatedReport)=>{
  return (dispatch, getState, http) => {
    http.put('/ruleengine/reports/'+updatedReport.id, updatedReport).then(resp => {
      http.get('/ruleengine/reports/')
      .then(res => {
        dispatch({
          type: REPORTS_GET_SUCCESS,
          payload: res.data
        })
      }).catch(err => {
      })
      }).catch(err => {
    })
  }
}
const deleteReport = (selectedReport)=>{
  return (dispatch, getState, http) => {
    http.delete('/ruleengine/reports/'+selectedReport.id).then(resp => {
      http.get('/ruleengine/reports/')
      .then(res => {
        dispatch({
          type: REPORTS_GET_SUCCESS,
          payload: res.data
        })
      }).catch(err => {
      })
      }).catch(err => {
    })
  }
}
export {
  getSettings,
  updateTextBox,
  toogleCheckBox,
  updateSettings,
  updateNumberBox,
  getOperators,
  toogleRuleEngineOperatorForm,
  toogleRuleEngineOperatorList,
  updateOperatorsTextBox,
  updateOperatorsNumberBox,
  updateArgumentsBox,
  executeOperatorFunction,
  updateOperators,
  getFields,
  toogleSubFieldsList,
  toogleFieldsList,
  showAddFieldModal,
  hideAddFieldModal,
  showAddSubFieldModal,
  hideAddSubFieldModal,
  updateAddFieldsTextBox,
  updateRuleEngineFields,
  updateSubAddFieldsTextBox,
  updateRuleEngineSubFields,
  updateRuleEngineSubfieldsLocalList,
  updateSelectedSubFields,
  updateSelectedFields,
  getReports,
  showAddReportModal,
  hideAddReportModal,
  updateAddReportObjectTextBox,
  addReport,
  showRuleEngineReportsForm,
  hideRuleEngineReportsForm,
  updateReportText,
  updateReport,
  deleteReport
}