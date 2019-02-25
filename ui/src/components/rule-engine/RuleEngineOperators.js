import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentBody,
    EuiCodeEditor,EuiFieldText,EuiSpacer,EuiButton,EuiBadge,EuiSuperSelect,EuiTextArea,
    EuiHealth,EuiLink
  
  } from '@elastic/eui';

  import 'brace/theme/github';
import 'brace/mode/javascript';
import 'brace/snippets/javascript';
import 'brace/ext/language_tools';

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
      onChange = e =>{
        console.log(e.target);
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
      onChangeThree = (value) => {
        this.setState({
            functionBody: value,
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

      this.options = [
        {
          value: 'warning',
          inputDisplay: (
            <EuiLink
            
          >
           Click to add a new Operator
          </EuiLink>
          ),
          'data-test-subj': 'option-warning',
          disabled: true,
        },
        {
          value: 'minor',
          inputDisplay: (
            <EuiHealth color="warning" style={{ lineHeight: 'inherit' }}>
              Minor
            </EuiHealth>
          ),
          'data-test-subj': 'option-minor',
        },
        {
          value: 'critical',
          inputDisplay: 'Operator'
        
        },
      ];
        
        const result = this.state.functionResult;
        return (<EuiPage>
            <EuiPageBody>
              <EuiPageContent>
              <EuiPageContentBody>
              <EuiSuperSelect
        options={this.options}
        valueOfSelected={this.state.value}
        onChange={this.onChange}
      />
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
          {/* <EuiCodeEditor
              mode="javascript"
              theme="github"
              placeholder="write code for function(a,b){}"
              onChange={this.onChangeThree}
              value={this.state.functionBody}
              height="150px"
              setOptions={{
              fontSize: '14px',
              enableBasicAutocompletion: true,
              enableSnippets: true,
              enableLiveAutocompletion: true,
            }}
         /> */}
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