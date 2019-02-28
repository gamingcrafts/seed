import {
  INDICES_GET_ALL_SUCCESS,
  INDICES_GET_ALL_FAILURE,
  POPULATE_CUSTOM_MAPPING_SUCCESS,
  TOGGLE_CHECK_BOX,
  UPDATE_TEXT_BOX, CUSTOM_MAPPING_CREATE_SUCCESS
} from "../actions/types";
import update from 'react-addons-update';

const INIT_STATE = {
  loading: true,
  loaded: false,
  indices: [],
  mappings: [],
  columnDefinition: {},
  indexData: {

  }
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case INDICES_GET_ALL_SUCCESS: {
      return update(state, {
        indices: {
          $set: action.payload.map(a => ({ label: a }))
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
    case POPULATE_CUSTOM_MAPPING_SUCCESS: {
      let mappings = [];
      let indexProperties = action.payload.indexProperties;
      let customMapping = action.payload.customMapping.data[0];
      Object.keys(indexProperties).forEach((key) => {
        mappings.push({ fieldName: key, fieldDefinition: indexProperties[key], selected: false, sortable: false, dateColumn: false, currencyColumn: false, label: '', format: '' })
      })
      let columnDefinition = {};
      let customMappingId = undefined;
      if (customMapping !== undefined) {
        customMappingId = customMapping.id;
        mappings.forEach((key) => {
          let propertyKey = key.fieldName;

          if (customMapping['columns'][propertyKey] !== undefined) {
            key.selected = customMapping['columns'][propertyKey].selected
            key.sortable = customMapping['columns'][propertyKey].sorted
            key.dateColumn = customMapping['columns'][propertyKey].dateColumn
            key.currencyColumn = customMapping['columns'][propertyKey].currencyColumn
            key.format = customMapping['columns'][propertyKey].format
            key.label = customMapping['columns'][propertyKey].label
            columnDefinition = {
              ...columnDefinition,
              [propertyKey]: {
                selected: customMapping['columns'][propertyKey].selected,
                sortable: customMapping['columns'][propertyKey].sortable,
                dateColumn: customMapping['columns'][propertyKey].dateColumn,
                currencyColumn: customMapping['columns'][propertyKey].currencyColumn,
                format: customMapping['columns'][propertyKey].format,
                label: customMapping['columns'][propertyKey].label
              }
            }
          }
        })
      }
      return update(state, {
        indexData: {
          $set: { name: action.payload.indexName, id: customMappingId }
        },
        mappings: {
          $set: mappings
        }
        ,
        columnDefinition: {
          $set: columnDefinition
        }
      })
    }
    case CUSTOM_MAPPING_CREATE_SUCCESS: {
      return update(state, {
        indexData: {
          $set: { name: action.payload.indexName, id: action.payload.indexId }
        }
      })
    }
    case TOGGLE_CHECK_BOX: {
      let checkBoxValidation, updatedObject = {};
      let type = action.payload.type;
      let e = action.payload.event;
      let item = action.payload.item;
      if (type === 'dateColumn') {
        checkBoxValidation = {
          dateColumn: e.target.checked,
          currencyColumn: !e.target.checked
        }
      }
      else if (type === 'currencyColumn') {
        checkBoxValidation = {
          dateColumn: !e.target.checked,
          currencyColumn: e.target.checked
        }
      }
      else if (type === 'sortable') {
        checkBoxValidation = {
          sortable: e.target.checked
        }
      }
      //------------------Selected Toggle----------------------
      if (type === 'selected') {
        updatedObject = {
          $merge: {
            [item]: {
              'selected': e.target.checked
            }
          }
        }
      }
      else {
        updatedObject = {
          [item]: {
            $merge: checkBoxValidation
          }
        }
      }
      return update(state, {
        columnDefinition: {
          ...updatedObject
        }
      })
    }
    case UPDATE_TEXT_BOX: {
      let type = action.payload.type;
      let e = action.payload.event;
      let item = action.payload.item;
      return update(state, {
        columnDefinition: {
          [item]: {
            $merge: { [type]: e.target.value }
          }
        }
      })
    }



    default:
      return update(state, {})
  }
}