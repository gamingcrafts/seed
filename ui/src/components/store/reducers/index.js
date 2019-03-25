import { combineReducers } from 'redux';

import sampleReducer from './samples-reducer';
import columnDefinitionReducer from './column-definition-reducer';
import RuleEngineReducer from'./rule-engine-reducer';
import CardsReducer from'./cards-reducer';

const reducers = combineReducers({
  sampleReducer,columnDefinitionReducer,RuleEngineReducer,CardsReducer
});

export default reducers;