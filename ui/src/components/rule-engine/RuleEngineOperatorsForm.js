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
    EuiLink,
    EuiFieldText,
    EuiFieldNumber,
    EuiTextArea
  
  } from '@elastic/eui';

  import {toogleRuleEngineOperatorList} from '../store/actions/rule-engine-actions'
class RuleEngineOperatorsForm extends Component {
   
render(){
  let {operatorsState}  = this.props.RuleEngineReducer;
  let selectedOperator = operatorsState.selectedOperator;
  if(selectedOperator!==undefined){
  return (
    <EuiPage>
    <EuiPageBody>
      <EuiPageContent>
      <EuiPageContentBody>
      <EuiFlexGroup>
        <EuiFlexItem >
        <EuiFieldText
          placeholder="Name"
          value={selectedOperator.name}
         
        />
        <EuiFieldText
          placeholder="Label"
          value={selectedOperator.label}
         
        />
        <EuiFieldText
          placeholder="Label For Format"
          value={selectedOperator.labelForFormat}
         
        />
        <EuiFieldNumber
          placeholder="Cardinality"
          value={selectedOperator.cardinality}
       
        />
        <EuiFieldText
          placeholder="Reversed Operator"
          value={selectedOperator.reversedOp}
         
        />
        <EuiTextArea
          placeholder="FormatOp"
          
          value={selectedOperator.formatOp}
        
        />
        </EuiFlexItem>
        <EuiFlexItem >
        <EuiButton
          onClick={() => window.alert('Button clicked')}
        >
          Save
        </EuiButton>
        <EuiButton color="warning"
          onClick={() => this.props.toogleRuleEngineOperatorList()}
        >
          Cancel
        </EuiButton>
        </EuiFlexItem>
        
      </EuiFlexGroup>

      </EuiPageContentBody>
    </EuiPageContent>
  </EuiPageBody>
</EuiPage>
  )
  }
  else{
    return 'Hello'
  }
}
}
const mapStateToProps = ({RuleEngineReducer}) => {
    return {
        RuleEngineReducer
    }
  }
const actions = {toogleRuleEngineOperatorList}
export default connect(mapStateToProps, actions)(RuleEngineOperatorsForm)