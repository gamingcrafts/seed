import {
  SETTINGS_GET_SUCCESS,
  SETTINGS_GET_FAILURE,
  UPDATE_SEGMENTATION_TEXT_BOX,
  UPDATE_SEGMENTATION_CHECK_BOX,
  UPDATE_SEGMENTATION_NUMBER_BOX,
  OPERATORS_GET_SUCCESS,
  OPERATORS_GET_FAILURE,
  TOGGLE_RULE_ENGINE_OPERATOR_FORM,
  TOGGLE_RULE_ENGINE_OPERATOR_LIST
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
      console.log(resp);
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
  console.log("toogleRuleEngineOperatorForm--->"+operatorName)
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
export {
  getSettings,
  updateTextBox,
  toogleCheckBox,
  updateSettings,
  updateNumberBox,
  getOperators,
  toogleRuleEngineOperatorForm,
  toogleRuleEngineOperatorList
}