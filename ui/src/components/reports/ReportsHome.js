import React from 'react';
import { connect } from 'react-redux';
import ReportsList from './ReportsList';
import ReportsForm from './ReportsForm';


const reports = (props)=>{
   
  let {reportsState} = props.RuleEngineReducer;

  if(reportsState.showReportsList){
  return <ReportsList/>
  }
  else{
   return <ReportsForm/>
  }
}
const mapStateToProps = ({RuleEngineReducer}) => {
    return {
        RuleEngineReducer
    }
  }
const actions = {}
const ReportsHome = connect(mapStateToProps, actions)(reports)
export default ReportsHome;