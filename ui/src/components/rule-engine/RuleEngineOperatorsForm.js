import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentBody,
    EuiFlexGroup,
    EuiFlexItem,
    EuiInMemoryTable,
    EuiButton,
    EuiLink
  
  } from '@elastic/eui';


class RuleEngineOperatorsForm extends Component {
   
render(){
  return (
    <EuiPage>
    <EuiPageBody>
      <EuiPageContent>
      <EuiPageContentBody>
      <EuiFlexGroup>
        <EuiFlexItem grow={10}>
        Hello
        </EuiFlexItem>
        
      </EuiFlexGroup>

      </EuiPageContentBody>
    </EuiPageContent>
  </EuiPageBody>
</EuiPage>
  )
}
}
const mapStateToProps = ({RuleEngineReducer}) => {
    return {
        RuleEngineReducer
    }
  }
const actions = {}
export default connect(mapStateToProps, actions)(RuleEngineOperatorsForm)