import {
    SETTINGS_GET_SUCCESS,
    SETTINGS_UPDATE_SUCCESS,
    UPDATE_SEGMENTATION_TEXT_BOX,
    UPDATE_SEGMENTATION_CHECK_BOX,
    UPDATE_SEGMENTATION_NUMBER_BOX,
    OPERATORS_GET_SUCCESS,
    // OPERATORS_GET_FAILURE,
    TOGGLE_RULE_ENGINE_OPERATOR_FORM,
    TOGGLE_RULE_ENGINE_OPERATOR_LIST,
    UPDATE_OPERATORS_TEXT_BOX,
    UPDATE_OPERATORS_NUMBER_BOX,
    FIELDS_GET_SUCCESS,
    // FIELDS_GET_FAILURE,
    TOGGLE_SUB_FIELDS_LIST,
    TOGGLE_FIELDS_LIST
} from "../actions/types";

import update from 'react-addons-update';

const INIT_STATE = {
    loading: true,
    loaded: false,
    settingsId: '',
    settings: {},
    operators: {},
    fields:{},
    operatorsState: {
        loading: false,
        selectedOperator: undefined,
        showListView: true,
        formatOpArgumentOne:undefined,
        formatOpArgumentTwo:undefined,
        formatOpFuntionResult:undefined
    },
    fieldsState:{
        showFieldsList:true,
        seletedField:null
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
                        cardinality:undefined,
                        reversedOp:'',
                        formatOp:''
                    }
                }
                else{
                    selectedOperator=state.operators[action.payload.name]
                    if(selectedOperator['formatOp']!==undefined){
                    selectedOperator['formatOp'] =selectedOperator['formatOp'].match(/=>[^{]+\{([\s\S]*)\}$/)[1]
                }
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
            case UPDATE_OPERATORS_TEXT_BOX:{
                let type = action.payload.type;
              let value = action.payload.value;
                return update(state, {
                    operatorsState: {
                        selectedOperator: {
                            $merge:{[type]:value}
                          }
                    }
                })
            }
            case UPDATE_OPERATORS_NUMBER_BOX:
            {
                let type = action.payload.type;
              let value = action.payload.value;
                return update(state, {
                    operatorsState: {
                        selectedOperator: {
                            $merge:{[type]:parseInt(value, 10)}
                          }
                    }
                })
            }
            case FIELDS_GET_SUCCESS:
            {
                return update(state, {
                    fields: {
                        $set: action.payload
                    },
                })
            }
            case TOGGLE_SUB_FIELDS_LIST: {
                
                return update(state, {
                    fieldsState: {
                        showFieldsList:{
                            $set:false
                        },
                        seletedField: {
                            $set: action.payload
                        }
                    },
                })
            }
            case TOGGLE_FIELDS_LIST: {
                return update(state, {
                    fieldsState: {
                        showFieldsList:{
                            $set:true
                        },
                        seletedField: {
                            $set: null
                        }
                    },
                })
            }

        default:
            return update(state, {})
    }
}