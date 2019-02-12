import { INDICES_GET_ALL_SUCCESS, INDICES_GET_ALL_FAILURE,POPULATE_CUSTOM_MAPPING_SUCCESS} from './types';


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
      let mappings={};
      http.get('/indices/'+selectedIndex).then(resp=>{
        mappings.indexProperties=resp.data;
        http.get('/custommappings/'+selectedIndex).then(customMapping=>{
         mappings.customMapping=customMapping;
         dispatch({
          type: POPULATE_CUSTOM_MAPPING_SUCCESS,
          payload: mappings
        })

        })
      }).catch(err =>{

      })
    }
  }

  export {
      getIndices,
      getIndexCustomMapping
  }