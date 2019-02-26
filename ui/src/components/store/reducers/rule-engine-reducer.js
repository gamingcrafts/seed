import {
    SETTINGS_GET_SUCCESS,
    SETTINGS_UPDATE_SUCCESS,
    UPDATE_SEGMENTATION_TEXT_BOX,
    UPDATE_SEGMENTATION_CHECK_BOX,
    UPDATE_SEGMENTATION_NUMBER_BOX,
    OPERATORS_GET_SUCCESS,
    OPERATORS_GET_FAILURE,
    TOGGLE_RULE_ENGINE_OPERATOR_FORM,
    TOGGLE_RULE_ENGINE_OPERATOR_LIST
} from "../actions/types";

import update from 'react-addons-update';

const INIT_STATE = {
    loading: true,
    loaded: false,
    settingsId: '',
    settings: {},
    operators: {},
    operatorsState: {
        loading: false,
        selectedOperator: undefined,
        showListView: true
    }
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SETTINGS_GET_SUCCESS:
            {
                return update(state, {
                    settings: {
                        $set: action.payload
                    },

                })
            }
        case SETTINGS_UPDATE_SUCCESS:
            {
                return null;
            }

        case UPDATE_SEGMENTATION_TEXT_BOX:
            {
                let type = action.payload.type;
                let e = action.payload.event;
                return update(state, {
                    settings: {
                        $merge: {
                            [type]: e.target.value
                        }

                    }
                })
            }

        case UPDATE_SEGMENTATION_CHECK_BOX:
            {
                let type = action.payload.type;
                let e = action.payload.event;
                return update(state, {
                    settings: {
                        $merge: {
                            [type]: e.target.checked
                        }

                    }
                })
            }

        case UPDATE_SEGMENTATION_NUMBER_BOX:
            {
                let type = action.payload.type;
                let e = action.payload.event;
                return update(state, {
                    settings: {
                        $merge: {
                            [type]: parseInt(e.target.value, 10)
                        }

                    }
                })
            }

        case OPERATORS_GET_SUCCESS:
            {
                return update(state, {
                    operators: {
                        $set: action.payload
                    },

                })
            }
        case TOGGLE_RULE_ENGINE_OPERATOR_FORM:
            {
                let selectedOperator;
                if(action.payload.name===undefined){
                    selectedOperator={
                        name:'',
                        label:'',
                        labelForFormat:'',
                        cardinality:0,
                        reversedOp:'',
                        formatOp:''
                    }
                }
                else{
                    selectedOperator=state.operators[action.payload.name]
                }
                return update(state, {
                    operatorsState: {
                        $set:{
                        selectedOperator:  selectedOperator,
                        showListView:false
                    }
                        
                    }
                })
            }
        case TOGGLE_RULE_ENGINE_OPERATOR_LIST:
            {
                return update(state, {
                    operatorsState: {
                        selectedOperator: {
                            $set: undefined
                        },
                        showListView: {
                            $set: true
                        }
                    }
                })
            }

        default:
            return update(state, {})
    }
}