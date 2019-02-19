import {
    SETTINGS_GET_SUCCESS,
    SETTINGS_GET_FAILURE,
    SETTINGS_UPDATE_SUCCESS,
    SETTINGS_UPDATE_FAILURE,
    UPDATE_SEGMENTATION_TEXT_BOX,
    UPDATE_SEGMENTATION_CHECK_BOX
} from "../actions/types";

import update from 'react-addons-update';

const INIT_STATE = {
    loading: true,
    loaded: false,
    settingsId:'',
    settings:{}
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SETTINGS_GET_SUCCESS:{
            return update(state, {
                settingsId: { $set: action.payload.id },
                settings: { $set: action.payload.properties },
                
              })
        }
        case SETTINGS_UPDATE_SUCCESS:{
            return null;
        }

        case UPDATE_SEGMENTATION_TEXT_BOX:{
            let type = action.payload.type;
            let e = action.payload.event;
            return update(state, {
                settings: {
                    $merge:{[type]:e.target.value}
                      
                }
        })}

        case UPDATE_SEGMENTATION_CHECK_BOX:{
            let type = action.payload.type;
            let e = action.payload.event;
            return update(state, {
                settings: {
                    $merge:{[type]:e.target.checked}
                      
                }
        })}

        default:
            return update(state, {})
    }
}