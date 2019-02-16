import {
  INDICES_GET_ALL_SUCCESS,
  INDICES_GET_ALL_FAILURE,
  POPULATE_CUSTOM_MAPPING_SUCCESS,
  TOGGLE_CHECK_BOX,
  UPDATE_TEXT_BOX
} from './types';


const getIndices = () => {
  return (dispatch, getState, http) => {
    http.get('/indices')
      .then(res => {
        dispatch({
          type: INDICES_GET_ALL_SUCCESS,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: INDICES_GET_ALL_FAILURE,
          payload: err
        })
      })
  }
}

const getIndexCustomMapping = selectedIndex => {
  return (dispatch, getState, http) => {
    let mappings = {};
    http.get('/indices/' + selectedIndex)
      .then(resp => {
        mappings.indexProperties = resp.data;

        http.get('/custommappings/' + selectedIndex)
          .then(customMapping => {
            mappings.customMapping = customMapping;
            dispatch({
              type: POPULATE_CUSTOM_MAPPING_SUCCESS,
              payload: {
                indexName: selectedIndex,
                ...mappings
              }
            })
          })
      }).catch(err => {

      })
  }
}

const saveCustomMapping = customMap => {

  return (dispatch, getState, http) => {

    if(customMap.mappingId===undefined){
    http.post('/custommappings/', customMap).then(resp => {
      console.log(resp)
    }).catch(err => {

    })
  }
  else{
    http.put('/custommappings/'+customMap.mappingId, customMap).then(resp => {
      console.log(resp)
    }).catch(err => {

    })
  }
  }
}
const toogleCheckBox = checkBoxOptions => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_CHECK_BOX,
      payload: checkBoxOptions
    })
  }
}

const updateTextBox = textBoxValue => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_TEXT_BOX,
      payload: textBoxValue
    })
  }
}



export {
  getIndices,
  getIndexCustomMapping,
  saveCustomMapping,
  toogleCheckBox,
  updateTextBox
}