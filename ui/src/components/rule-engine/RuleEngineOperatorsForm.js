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
    // EuiTextArea,
    EuiCodeEditor,
    EuiFormRow,
    EuiSpacer
  
  } from '@elastic/eui';
 import {
    toogleRuleEngineOperatorList,
    updateOperatorsTextBox,updateOperatorsNumberBox,
    updateOperators
  } from '../store/actions/rule-engine-actions'

  import 'brace/theme/github';
  import 'brace/mode/javascript';
  import 'brace/snippets/javascript';
  import 'brace/ext/language_tools';
class RuleEngineOperatorsForm extends Component {

  onTextChange =(e,type)=>{
    console.log(e);
    let textBoxData = {type:type,value:e.target.value};
    this.props.updateOperatorsTextBox(textBoxData);
  }
  onNumberChange=(e,type)=>{
    let numberBoxData = {type:type,value:e.target.value};
    this.props.updateOperatorsNumberBox(numberBoxData);
  }
  onCodeChange=(value)=>{
    let textBoxData = {type:'formatOp',value:value};
    this.props.updateOperatorsTextBox(textBoxData);
  }
  updateOperators=()=>{
    let {operators,operatorsState}=this.props.RuleEngineReducer;
    
    let currentOperator = operatorsState.selectedOperator;
    console.log(currentOperator);
    if(currentOperator.name!=='')
    operators[currentOperator.name] = currentOperator;
    console.log(operators);
    this.props.updateOperators(operators);
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
     
        
        <EuiFormRow
          label="Name"
        >
        <EuiFieldText
          placeholder="Name"
          value={selectedOperator.name}
          onChange={(e)=>{this.onTextChange(e,'name')}}
        />
        </EuiFormRow>
        <EuiFormRow
          label="Label"
        >
        <EuiFieldText
          placeholder="Label"
          value={selectedOperator.label}
          onChange={(e)=>{this.onTextChange(e,'label')}}
        />
        </EuiFormRow>
        <EuiFormRow
          label="Label For Format"
        >
        <EuiFieldText
          placeholder="Label For Format"
          value={selectedOperator.labelForFormat}
          onChange={(e)=>{this.onTextChange(e,'labelForFormat')}}
        />
        </EuiFormRow>
        <EuiFormRow
          label="Cardinality"
        >
        <EuiFieldNumber
          placeholder="Cardinality"
          value={selectedOperator.cardinality}
            onChange={(e)=>this.onNumberChange(e,'cardinality')}
        />
        </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem >
        <EuiFormRow
          label="Reversed Operator"
        >
        <EuiFieldText
          placeholder="Reversed Operator"
          value={selectedOperator.reversedOp}
          onChange={(e)=>{this.onTextChange(e,'reversedOp')}}
        />
        </EuiFormRow>
        <EuiFormRow
          label="FormatOp"
        >
        {/* <EuiTextArea
          placeholder="FormatOp"
          onChange={(e)=>{this.onTextChange(e,'formatOp')}}
          value={selectedOperator.formatOp}
        
        /> */}

        <EuiCodeEditor
        mode="javascript"
        theme="github"
        width="100%"
        value={selectedOperator.formatOp}
        onChange={this.onCodeChange}
        setOptions={{
          fontSize: '14px',
          enableBasicAutocompletion: true,
          enableSnippets: true,
          enableLiveAutocompletion: true,
        }}
        onBlur={() => { console.log('blur'); }} // eslint-disable-line no-console
        aria-label="Code Editor"
      />
        </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem >
        <EuiButton
          onClick={() => this.updateOperators()}
        >
          Save
        </EuiButton>
        <EuiSpacer size="xl" />
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
const actions = {toogleRuleEngineOperatorList,updateOperatorsTextBox,updateOperators,updateOperatorsNumberBox}
export default connect(mapStateToProps, actions)(RuleEngineOperatorsForm)