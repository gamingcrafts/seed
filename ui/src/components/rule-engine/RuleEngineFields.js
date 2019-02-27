import React, { Component } from 'react';
import { connect } from 'react-redux';



class RuleEngineFields extends Component {
   
render(){
//   let {operatorsState} = this.props.RuleEngineReducer;
//   if(operatorsState.showListView){
//   return <RuleEngineOperatorsList/>
//   }
//   else{
//     return <RuleEngineOperatorsForm/>
//   }
return 'Fields'
}
}
const mapStateToProps = ({RuleEngineReducer}) => {
    return {
        RuleEngineReducer
    }
  }
const actions = {}
export default connect(mapStateToProps, actions)(RuleEngineFields)