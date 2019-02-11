import {
    INDICES_GET_ALL_SUCCESS,
    INDICES_GET_ALL_FAILURE
} from "../actions/types";
import update from 'react-addons-update';


const INIT_STATE = {
    loading: true,
    loaded: false,
    indices: []
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case INDICES_GET_ALL_SUCCESS:{
            let indices=[];
            Object.keys(action.payload).forEach((index) => {
                if (index !== 'custom_mapping') {
                  indices.push({ label: index });
                }
              });
            return update(state, {
                indices: {
                    $set: indices
                },
                loading: {
                    $set: false
                },
                loaded: {
                    $set: false
                }
            })
        }
        case INDICES_GET_ALL_FAILURE:
            return update(state, {
                loading: {
                    $set: false
                },
                loaded: {
                    $set: false
                }
            })
            
        default:
            return update(state, {})
    }
}