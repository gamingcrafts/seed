import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentBody,
    EuiFlexGroup,
    EuiFlexItem,
    EuiButton,
    EuiFieldText,
    EuiFieldNumber,
    EuiTextArea
  
  } from '@elastic/eui';

  import {toogleRuleEngineOperatorList,updateOperatorsTextBox} from '../store/actions/rule-engine-actions'
class RuleEngineOperatorsForm extends Component {

  onTextChange =(e,type)=>{
    let textBoxData = {type:type,value:e.target.value};
    this.props.updateOperatorsTextBox(textBoxData);
  }
   
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
          onChange={(e)=>{this.onTextChange(e,'name')}}
        />
        <EuiFieldText
          placeholder="Label"
          value={selectedOperator.label}
          onChange={(e)=>{this.onTextChange(e,'label')}}
        />
        <EuiFieldText
          placeholder="Label For Format"
          value={selectedOperator.labelForFormat}
          onChange={(e)=>{this.onTextChange(e,'labelForFormat')}}
        />
        <EuiFieldNumber
          placeholder="Cardinality"
          value={selectedOperator.cardinality}
       
        />
        <EuiFieldText
          placeholder="Reversed Operator"
          value={selectedOperator.reversedOp}
          onChange={(e)=>{this.onTextChange(e,'reversedOp')}}
        />
        <EuiTextArea
          placeholder="FormatOp"
          onChange={(e)=>{this.onTextChange(e,'formatOp')}}
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
const actions = {toogleRuleEngineOperatorList,updateOperatorsTextBox}
export default connect(mapStateToProps, actions)(RuleEngineOperatorsForm)