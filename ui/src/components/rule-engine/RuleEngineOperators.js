import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentBody,
    EuiTextArea,EuiFieldText,EuiSpacer,EuiButton,EuiBadge
  
  } from '@elastic/eui';

class RuleEngineOperators extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          functionBody: '',
          argumentOne:'',
          argumentTwo:'',
          functionResult:''
        };
      }
      onChangeOne = e => {
        this.setState({
            argumentOne: e.target.value,
        });
      };
      onChangeTwo = e => {
        this.setState({
            argumentTwo: e.target.value,
        });
      };
      onChangeThree = e => {
        this.setState({
            functionBody: e.target.value,
        });
      };
      executeFuntion=()=>{
      
        const functionBody=this.state.functionBody;
        const argumentOne = this.state.argumentOne;
        const argumentTwo = this.state.argumentTwo;
        let executableFunction = new Function('a','b',functionBody);
        let functionResult = executableFunction(argumentOne,argumentTwo);
        this.setState({functionResult:functionResult});
      }
    render(){
        
        const result = this.state.functionResult;
        return (<EuiPage>
            <EuiPageBody>
              <EuiPageContent>
              <EuiPageContentBody>
              <EuiFieldText
              placeholder="This value is passed as a"
          value={this.state.argumentOne}
          onChange={this.onChangeOne}
         
        />
        <EuiFieldText
          placeholder="This value is passed as b"
          value={this.state.argumentTwo}
          onChange={this.onChangeTwo}
        />
        <EuiSpacer size="m" />
              <EuiTextArea
              placeholder="write code for function(a,b){}"
              onChange={this.onChangeThree}
          value={this.state.functionBody}
         
        />
        <EuiSpacer size="m" />
        <EuiButton
          fill
          iconType="compute"
          onClick={this.executeFuntion}
        >
        Execute
        </EuiButton>
        <EuiSpacer size="m" />
        <EuiBadge color="warning">
            Result: {result}
          </EuiBadge>
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