import { SAMPLE_GET_ALL_SUCCESS, SAMPLE_GET_ALL_FAILURE } from "./types";


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

export {
  getSamples
}