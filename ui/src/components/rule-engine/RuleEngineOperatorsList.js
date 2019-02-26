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
import {toogleRuleEngineOperatorForm,toogleRuleEngineOperatorList} from '../store/actions/rule-engine-actions'
class RuleEngineOperatorsList extends Component {
   

    toogleOperatorsForm=()=>{
        this.props.toogleRuleEngineOperatorForm();
    }
   
render(){
  let {
      operators
  } = this.props.RuleEngineReducer;
  var operatorsList = Object.keys(operators).map(key => {
      return operators[key];
  })
  const columns = [{
              field: 'name',
              name: 'Operator Name',
              sortable: true,
              truncateText: true,
              render: (value) =>
                  (< EuiLink color = "primary" > {value} </EuiLink>)

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
              },
              {
                  field: 'cardinality',
                  name: 'Cardinality'
              },
              {
                  field: 'reversedOp',
                  name: 'Reversed Operator',
                  sortable: true
              },
              {
                  field: 'formatOp',
                  name: 'formatOp',
                  truncateText: true

              }];
  return (<EuiPage>
            <EuiPageBody>
              <EuiPageContent>
              <EuiPageContentBody>
              <EuiFlexGroup>
                <EuiFlexItem grow={10}>
                
                </EuiFlexItem>
                {/* <EuiLoadingChart size="xl" mono/> */}

                <EuiFlexItem>
                {/* <EuiLoadingSpinner size="xl"/> */}
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiButton
                    fill
                    onClick={this.toogleOperatorsForm}
                    color="primary">Add</EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
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
const actions = {toogleRuleEngineOperatorForm,
    toogleRuleEngineOperatorList}
export default connect(mapStateToProps, actions)(RuleEngineOperatorsList)