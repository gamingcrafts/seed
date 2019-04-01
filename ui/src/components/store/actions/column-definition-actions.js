import {
  INDICES_GET_ALL_SUCCESS,
  INDICES_GET_ALL_FAILURE,
  POPULATE_CUSTOM_MAPPING_SUCCESS,
  TOGGLE_CHECK_BOX,
  UPDATE_TEXT_BOX,
  CUSTOM_MAPPING_CREATE_SUCCESS,
  CUSTOM_MAPPING_FETCHING_FLAG
} from './types';

import React from 'react';

import {addToast} from './toasts-actions';


const getIndices = () => {
  return (dispatch, getState, http) => {
    http.get('/alias')
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

    dispatch({
      type: CUSTOM_MAPPING_FETCHING_FLAG,
      payload: true
    })


    let mappings = {};
    http.get('/alias/' + selectedIndex)
      .then(resp => {
        mappings.indexProperties = resp.data;

        http.get('/coldef/' + selectedIndex)
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
        // TODO: Handle error block with toast
      })
  }
}


const saveCustomMapping = customMap => {
  return (dispatch, getState, http) => {
    if (customMap.mappingId === undefined) {
      http.post('/coldef/', customMap).then(resp => {
        dispatch({
          type: CUSTOM_MAPPING_CREATE_SUCCESS,
          payload: {
            indexName: resp.data.indexName,
            indexId: resp.data.id
          }
        })
      }).catch(err => {
        // TODO: Handle error block with toast
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