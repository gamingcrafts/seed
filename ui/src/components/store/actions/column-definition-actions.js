import { INDICES_GET_ALL_SUCCESS, INDICES_GET_ALL_FAILURE} from './types';


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

  const getIndexCustomMapping=selectedIndex=>{
    return(dispatch,getState,http) => {
      http.get('/custommappings/'+selectedIndex).then(res=>{
        console.log(res);
        http.get('/indices/'+selectedIndex).then(res=>{
          console.log(res);
        })
      }).catch(err =>{

      })
    }
  }

  export {
      getIndices,
      getIndexCustomMapping
  }