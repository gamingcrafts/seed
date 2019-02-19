import {
  SETTINGS_GET_SUCCESS,
  SETTINGS_GET_FAILURE,
  UPDATE_SEGMENTATION_TEXT_BOX,
  UPDATE_SEGMENTATION_CHECK_BOX,
  UPDATE_SEGMENTATION_NUMBER_BOX
} from "../actions/types";

const getSettings = () => {
  return (dispatch, getState, http) => {
    http.get('/settings')
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

    http.put('/settings/', settings).then(resp => {
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
export {
  getSettings,
  updateTextBox,
  toogleCheckBox,
  updateSettings,
  updateNumberBox
}