import React, { Component } from 'react';
import { connect } from 'react-redux';

import RuleEngineFieldsList   from '../rule-engine/RuleEngineFieldsList';
import RuleEngineSubFieldsList   from '../rule-engine/RuleEngineSubFieldsList';

class RuleEngineFields extends Component {
  render(){
  let {fieldsState} = this.props.RuleEngineReducer;
  if(fieldsState.showFieldsList){
    return <RuleEngineFieldsList/>
  }
  else{
    return <RuleEngineSubFieldsList/>
  }
  }
}
const mapStateToProps = ({RuleEngineReducer}) => {
    return {
        RuleEngineReducer
    }
  }
const actions = {}
export default connect(mapStateToProps, actions)(RuleEngineFields)