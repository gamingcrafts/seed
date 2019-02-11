import { combineReducers } from 'redux';

import sampleReducer from './samples-reducer';
import columnDefinitionReducer from './column-definition-reducer';

const reducers = combineReducers({
  sampleReducer,columnDefinitionReducer
});

export default reducers;