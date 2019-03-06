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
    UPDATE_SUB_FIELDS_SUCCESS
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
  updateRuleEngineSubFields
}