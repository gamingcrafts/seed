import {UPDATE_TOASTS,REMOVE_TOASTS } from "../actions/types";
import update from 'react-addons-update';


const INIT_STATE = {
  toasts:[],
  toastId:0
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case UPDATE_TOASTS:{
      console.log(action.payload)
      return update(state, {

        toasts: { $set: action.payload.toasts },
        toastId: { $set: action.payload.id }
      })
    } 

    case REMOVE_TOASTS:{
      return update(state, {
        toasts: { $set: [] },
        toastId: { $set: 0 }
      })
    }
    default:
      return update(state, {})
  }
}