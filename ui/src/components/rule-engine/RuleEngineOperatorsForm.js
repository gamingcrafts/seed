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
    EuiTextArea,
    EuiCodeEditor,
    EuiFormRow,
    EuiBadge
  } from '@elastic/eui';
 import {
    toogleRuleEngineOperatorList,
    updateOperatorsTextBox,updateOperatorsNumberBox,updateArgumentsBox,executeOperatorFunction,
    updateOperators
  } from '../store/actions/rule-engine-actions'

  import 'brace/theme/github';
  import 'brace/mode/javascript';
  import 'brace/snippets/javascript';
  import 'brace/ext/language_tools';
class RuleEngineOperatorsForm extends Component {

  onTextChange =(e,type)=>{
    let textBoxData = {type:type,value:e.target.value};
    this.props.updateOperatorsTextBox(textBoxData);
  }
  onArgumentTextChange=(e,type)=>{
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
  onArgumentChange=(e)=>{
    this.props.updateArgumentsBox(e.target.value);
  }
  executeFunction=()=>{
    let {operatorsState}  = this.props.RuleEngineReducer;
    let selectedOperator = operatorsState.selectedOperator;
    let argumentsBody = operatorsState.argumentsBody;
    this.props.executeOperatorFunction(selectedOperator,argumentsBody);
  }
  updateOperators=()=>{
    let {operators,operatorsState}=this.props.RuleEngineReducer;
    
    let currentOperator = operatorsState.selectedOperator;
    if(currentOperator.name!==''){
      const functionStart = '(field, op, values, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay) => {';
      const functionClose = '}'
      currentOperator['formatOp'] = functionStart+currentOperator['formatOp']+functionClose;
    operators[currentOperator.name] = currentOperator;
    
    }
    this.props.updateOperators(operators);
  }
   
render(){
  let {operatorsState}  = this.props.RuleEngineReducer;
  let selectedOperator = operatorsState.selectedOperator;
  let argumentsBody = operatorsState.argumentsBody;

  let functionResult = operatorsState.functionResult;

  let functionResultLabel;
  if(functionResult!==undefined){
    functionResultLabel= (<EuiBadge color="warning">
      {functionResult}
    </EuiBadge>)
  }
 
  
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
        
        <EuiFormRow
          label="Reversed Operator"
        >
        <EuiFieldText
          placeholder="Reversed Operator"
          value={selectedOperator.reversedOp}
          onChange={(e)=>{this.onTextChange(e,'reversedOp')}}
        />
        </EuiFormRow>
        <EuiButton color="ghost" fill={true}
          onClick={() => this.props.toogleRuleEngineOperatorList()}
        >
          Cancel
        </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem >
          <EuiFormRow
          label="Arguments"
        >
        <EuiTextArea
          placeholder="Arguments"
          value={argumentsBody}
          onChange={this.onArgumentChange}
        />
        </EuiFormRow>
        <EuiButton color="ghost" fill={true} iconType="compute"
          onClick={() => this.executeFunction()}
        >
          Execute
        </EuiButton>
        {functionResultLabel}
        <h5>FormatOp:</h5>
        <h6>{'(field, op, values, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay) => {'}</h6>
        
        <EuiFormRow
          label=""
        >
        <EuiCodeEditor
        mode="javascript"
        theme="github"
        width="600px"
        height="208px"
        value={selectedOperator.formatOp}
        onChange={this.onCodeChange}
        setOptions={{
          fontSize: '14px',
          enableBasicAutocompletion: true,
          enableSnippets: true,
          enableLiveAutocompletion: true,
        }}
        aria-label="Code Editor"
      />
        </EuiFormRow>
        <h6>{'}'}</h6>
        <EuiButton
        color="secondary"
        fill={true}
          onClick={() => this.updateOperators()}
        >
          Save
        </EuiButton>
        </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageContentBody>
    </EuiPageContent>
  </EuiPageBody>
</EuiPage>)
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
const actions = {toogleRuleEngineOperatorList,
  updateOperatorsTextBox,updateOperators,updateOperatorsNumberBox,updateArgumentsBox,executeOperatorFunction}
export default connect(mapStateToProps, actions)(RuleEngineOperatorsForm)