import {
    INDICES_GET_ALL_SUCCESS,
    INDICES_GET_ALL_FAILURE,
    POPULATE_CUSTOM_MAPPING_SUCCESS
} from "../actions/types";
import update from 'react-addons-update';


const INIT_STATE = {
    loading: true,
    loaded: false,
    indices: [],
    mappings:[]
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
        case POPULATE_CUSTOM_MAPPING_SUCCESS:{
            //JS does not maintain order of the keys. But I have used this as there is only one propety 
            //for action.payload.indexProperties.data.mappings. 
            let indexPropertiesKeyName = Object.keys(action.payload.indexProperties.data.mappings)[0];
            let mappings=[];
            let indexProperties = action.payload.indexProperties.data.mappings[indexPropertiesKeyName].properties;
            let customMapping = action.payload.customMapping.data;
            Object.keys(indexProperties).forEach((key)=>{
                mappings.push({fieldName:key,fieldDefinition:indexProperties[key].type,selected:false,sortable:false,dateColumn:false,currencyColumn:false,label:'',format:''})
            })
            Object.keys(mappings).forEach((key)=>{
                if(customMapping[key]!==undefined){
                    mappings[key].fieldDefinition = customMapping[key].fieldDefinition;
                    mappings[key].selected =  customMapping[key].selected
                    mappings[key].sortable =  customMapping[key].sorted
                    mappings[key].dateColumn =  customMapping[key].dateColumn
                    mappings[key].currencyColumn =  customMapping[key].currencyColumn
                    mappings[key].format = customMapping[key].format
                    mappings[key].label = customMapping[key].label

                }
                
            })
            console.log(mappings)
            return update(state, {
                mappings:{
                    $set:mappings
                }
            })
        }
        default:
            return update(state, {})
    }
}