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
    UPDATE_ARGUMENTS_AREA,
    FIELDS_GET_SUCCESS,
    // FIELDS_GET_FAILURE,
    TOGGLE_SUB_FIELDS_LIST,
    TOGGLE_FIELDS_LIST,
    SHOW_ADD_FIELD_MODAL,
    SHOW_ADD_SUB_FIELD_MODAL,
    HIDE_ADD_FIELD_MODAL,
    HIDE_ADD_SUB_FIELD_MODAL,
    UPDATE_FIELDS_TEXT_BOX,
    UPDATE_FIELDS_SUCCESS,
    UPDATE_SUB_FIELDS_TEXT_BOX,
    UPDATE_SUB_FIELDS_SUCCESS,
    UPDATE_LOCAL_UPDATED_SUB_FIELD_LIST,
    UPDATE_SELECTED_SUB_FIELD_LIST,
    UPDATE_SELECTED_FIELD_LIST,
    UPDATE_OPERATOR_FUNCTION_RESULT,
    REPORTS_GET_SUCCESS
} from "../actions/types";

import update from 'react-addons-update';

const INIT_STATE = {
    loading: true,
    loaded: false,
    settingsId: '',
    settings: {},
    operators: {},
    fields:{},
    reports:[],
    operatorsState: {
        loading: false,
        selectedOperator: undefined,
        showListView: true,
        formatOpArgumentOne:undefined,
        formatOpArgumentTwo:undefined,
        formatOpFuntionResult:undefined,
        functionResult:undefined,
        argumentsBody:'{\nfield:{}, \nop:[],\n values;[],\n valueSrcs;{}, \nvalueTypes:[], \nopDef:[],\n operatorOptions:[],\n isForDisplay:true\n}'
    },
    fieldsState:{
        showFieldsList:true,
        selectedField:null,
        showAddFieldModal:false,
        showAddSubFieldModal:false,
        updatedFields:undefined,
        selectedSubFieldsToDelete:[],
        selectedFieldsToDelete:[],
        addSubFieldKey:'',
        addFieldObject:{name:'',label:'',type:'!struct',subfields:{}}
    },
    reportsState:{
        showReportsList:true,
        selectedReport:null
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
                let argumentsBody = '{\n"field":{}, \n"op":[],\n "values":[],\n "valueSrcs":{}, \n"valueTypes":[], \n"opDef":[],\n "operatorOptions":[],\n "isForDisplay":true\n}';
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
                        showListView:false,
                        argumentsBody:argumentsBody
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
            case UPDATE_ARGUMENTS_AREA:{
                return update(state, {
                    operatorsState: {
                        $merge:{'argumentsBody':action.payload}
                       }
                    }
                )
            }
            
            case UPDATE_OPERATOR_FUNCTION_RESULT:{
                return update(state, {
                    operatorsState: {
                        functionResult: {
                            $set: action.payload
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
                        selectedField: {
                            $set: action.payload
                        },
                        updatedFields: {
                            $set: undefined
                        },
                        selectedSubFieldsToDelete: {
                            $set: []
                        },
                        selectedFieldsToDelete: {
                            $set: []
                        }
                    },
                })
            }
            case TOGGLE_FIELDS_LIST: {
                return update(state, {
                    fieldsState: {
                        showFieldsList: {
                            $set: true
                        },
                        selectedField: {
                            $set: null
                        },
                        updatedFields: {
                            $set: undefined
                        },
                        selectedSubFieldsToDelete: {
                            $set: []
                        },
                        selectedFieldsToDelete: {
                            $set: []
                        }
                    },
                })
            }
            case SHOW_ADD_FIELD_MODAL:{
                return update(state, {
                    fieldsState: {
                        showAddFieldModal: {
                            $set: true
                        }
                    },
                })
            }
            case HIDE_ADD_FIELD_MODAL:{
                return update(state, {
                    fieldsState: {
                        showAddFieldModal: {
                            $set: false
                        }
                    },
                })
            }
            case SHOW_ADD_SUB_FIELD_MODAL:{
                return update(state, {
                    fieldsState: {
                        showAddSubFieldModal: {
                            $set: true
                        }
                    },
                })
            }
            case HIDE_ADD_SUB_FIELD_MODAL:{
                return update(state, {
                    fieldsState: {
                        showAddSubFieldModal: {
                            $set: false
                        }
                    },
                })
            }
            case UPDATE_FIELDS_TEXT_BOX:{
                let type = action.payload.type;
                let value = action.payload.value;
                return update(state, {
                    fieldsState: {
                        addFieldObject: {
                            $merge:{[type]:value}
                        }
                    },
                })
            }
            case UPDATE_SUB_FIELDS_TEXT_BOX:{
                let type = action.payload.type;
                let value = action.payload.value;
                return update(state, {
                    fieldsState: {
                       
                            $merge:{[type]:value}
                        
                    },
                })

            }
            case UPDATE_FIELDS_SUCCESS:{
                let fields = action.payload.fields
                let addFieldObject = {name:'',label:'',type:'',subfields:{}};
                return update(state, {
                    fields:{
                        $set:fields
                    },
                    fieldsState: {
                        addFieldObject: {
                           $set:addFieldObject
                        },
                        showAddFieldModal: {
                            $set: false
                        }
                    },
                })
            }
            
            case UPDATE_SUB_FIELDS_SUCCESS:{
                let fields = action.payload.fields
                let addSubFieldKey = '';
                return update(state, {
                    fields:{
                        $set:fields
                    },
                    fieldsState: {
                        addSubFieldKey: {
                           $set:addSubFieldKey
                        },
                        showAddSubFieldModal: {
                            $set: false
                        },
                        updatedFields:{
                            $set:undefined
                        },
                        selectedSubFieldsToDelete:{
                            $set:[]
                        }
                    },
                })
            }
            case UPDATE_LOCAL_UPDATED_SUB_FIELD_LIST:{
                let fields = action.payload.fields
              
                return update(state, {
                    
                    fieldsState: {
                        updatedFields: {
                           $set:fields
                        }
                    },
                })
            }
            case UPDATE_SELECTED_SUB_FIELD_LIST:{
                let selectedSubFields = [];
                let {field,subFields} =action.payload;
                subFields.forEach((subField)=>{
                    
                    selectedSubFields.push(subField.key);
                })
                return update(state, {
                    fieldsState:{
                    selectedSubFieldsToDelete:{
                       $set:selectedSubFields
                    }
                   },
                })
            }
            case UPDATE_SELECTED_FIELD_LIST:{
                let selectedFields = [];
                let {fields} =action.payload;
                fields.forEach((field)=>{
                    
                    selectedFields.push(field.name);
                })
                return update(state, {
                    fieldsState:{
                    selectedFieldsToDelete:{
                       $set:selectedFields
                    }
                   },
                })
            }

            case REPORTS_GET_SUCCESS:
            {
                
                return update(state, {
                    reports: {
                        $set: action.payload
                    },
                })
            }

        default:
            return update(state, {})
    }
}