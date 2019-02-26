import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentBody,
    EuiInMemoryTable,
    EuiLink
  
  } from '@elastic/eui';
import {getOperators} from '../store/actions/rule-engine-actions'
class RuleEngineOperators extends Component {
   
render(){
  let {operators} = this.props.RuleEngineReducer;
  var operatorsList = Object.keys(operators).map(key => {
    return operators[key];
})
  const columns = [{
    field: 'name',
    name: 'Operator Name',
    sortable: true,
    truncateText: true,
    render:(value)=>
      (<EuiLink color="primary">
        {value}
      </EuiLink>)
    
  }, 
  {
    field: 'label',
    name: 'Label',
    truncateText: true,
  },
  {
    field: 'labelForFormat',
    name: 'Label for Format',
    truncateText: true,
  }, {
    field: 'cardinality',
    name: 'Cardinality'
  }, {
    field: 'reversedOp',
    name: 'Reversed Operator',
    sortable: true
  }, {
    field: 'formatOp',
    name: 'formatOp',
    truncateText: true
    
  }];
  return (<EuiPage>
            <EuiPageBody>
              <EuiPageContent>
              <EuiPageContentBody>
              <EuiInMemoryTable
          items={operatorsList}
          columns={columns}
          search={true}
          pagination={true}
          sorting={true}
        />
              </EuiPageContentBody>
            </EuiPageContent>
          </EuiPageBody>
        </EuiPage>)
    }
}
const mapStateToProps = ({RuleEngineReducer}) => {
    return {
        RuleEngineReducer
    }
  }
const actions = {}
export default connect(mapStateToProps, actions)(RuleEngineOperators)