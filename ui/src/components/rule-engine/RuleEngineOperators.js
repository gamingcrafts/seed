import React, { Component } from 'react';
import { connect } from 'react-redux';
import RuleEngineOperatorsList from './RuleEngineOperatorsList';
import RuleEngineOperatorsForm from './RuleEngineOperatorsForm';


class RuleEngineOperators extends Component {
   
render(){
  let {operatorsState} = this.props.RuleEngineReducer;
  if(operatorsState.showListView){
  return <RuleEngineOperatorsList/>
  }
  else{
    return <RuleEngineOperatorsForm/>
  }
}
}
const mapStateToProps = ({RuleEngineReducer}) => {
    return {
        RuleEngineReducer
    }
  }
const actions = {}
export default connect(mapStateToProps, actions)(RuleEngineOperators)