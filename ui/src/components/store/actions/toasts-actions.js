import {UPDATE_TOASTS,REMOVE_TOASTS } from "../actions/types";
const addToast = (newToast)=>{
  return (dispatch, getState, http) => {
    let { toasts,toastId} = getState().ToastsReducer;
    newToast['id']=toastId+1;
    let newToasts = toasts.concat(newToast)
    dispatch({
      type: UPDATE_TOASTS,
      payload: {
        toasts:newToasts,
        id:toastId+1
      }
    })
  }
}

const deleteToast = (toast)=>{
console.log(toast)
}

const removeToasts=()=>{
  return (dispatch, getState, http) => {
   
    dispatch({
      type: REMOVE_TOASTS
    })
  }
}
export{
  addToast,
  deleteToast,
  removeToasts
}