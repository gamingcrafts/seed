import React from 'react';
import { connect } from 'react-redux';
import RuleEngineReportsList from './RuleEngineReportsList';
import RuleEngineReportsForm from './RuleEngineReportsForm';


const ruleEngineReports = (props)=>{
  let {reportsState} = props.RuleEngineReducer;

  if(reportsState.showReportsList){
  return <RuleEngineReportsList/>
  }
  else{
   return <RuleEngineReportsForm/>
  }
}
const mapStateToProps = ({RuleEngineReducer}) => {
    return {
        RuleEngineReducer
    }
  }
const actions = {}
export default connect(mapStateToProps, actions)(ruleEngineReports)