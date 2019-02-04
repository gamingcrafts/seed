import { SAMPLE_GET_ALL_SUCCESS, SAMPLE_GET_ALL_FAILURE, SAMPLE_CREATE_SUCCESS, SAMPLE_CREATE_FAILURE,SAMPLE_DELETE_SUCCESS } from "./types";


const getSamples = () => {
  return (dispatch, getState, http) => {
    http.get('/samples')
      .then(res => {
        dispatch({
          type: SAMPLE_GET_ALL_SUCCESS,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: SAMPLE_GET_ALL_FAILURE,
          payload: err
        })
      })
  }
}

const createSample = sample => {
  console.log("Create Sample")
  console.log(sample)
  return (dispatch, getState, http) => {
    http.post('/samples', sample)
      .then(res => {
        dispatch({
          type: SAMPLE_CREATE_SUCCESS,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: SAMPLE_CREATE_FAILURE,
          payload: err
        })
      })
  }
}

const deleteSample = sample => {
  console.log("Delete Sample")
  console.log(sample)
  return (dispatch, getState, http) => {
    http.delete('/samples/'+sample.id )
      .then(res => {
        dispatch({
          type:SAMPLE_DELETE_SUCCESS,
          payload:{id:sample.id}
        })
      })
      .catch(err => {
        dispatch({
          type: SAMPLE_CREATE_FAILURE,
          pauload: err
        })
      })
  }
}

export {
  getSamples,
  createSample,
  deleteSample
}