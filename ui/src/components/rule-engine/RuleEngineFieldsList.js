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
  import {
    toogleSubFieldsList
  } from '../store/actions/rule-engine-actions';

class RuleEngineFieldsList extends Component{
    toogleSubFieldsList = (e,fieldName)=>{
        this.props.toogleSubFieldsList(fieldName);
    }
render(){
    let {fields} = this.props.RuleEngineReducer;
    var fieldsList = Object.keys(fields).map(key => {
        return {name:key,...fields[key]}
    })
    const columns = [{
        field: 'name',
        name: 'Field Name',
        sortable: true,
        truncateText: true,
        render: (value,item) =>
            (< EuiLink 
            onClick={(e)=>this.toogleSubFieldsList(e,value)}
            color = "primary" > {value} </EuiLink>)

          },
        {
            field: 'label',
            name: 'Label',
            truncateText: true,
        },
        {
            field: 'type',
            name: 'Type',
            truncateText: true,
        }]
    return (
    <EuiPage>
        <EuiPageBody>
          <EuiPageContent>
          <EuiPageContentBody>
            <EuiFlexGroup>
            <EuiFlexItem grow={10}>
            <h3>Rule-Engine Fields</h3>
            </EuiFlexItem>
            <EuiFlexItem>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiButton
                fill
                onClick={this.toogleFieldsForm}
                color="primary">Add</EuiButton>
            </EuiFlexItem>
            </EuiFlexGroup>
            <EuiInMemoryTable
                items={fieldsList}
                columns={columns}
                search={true}
                pagination={true}
                sorting={true}
            />
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>);
}
}
const mapStateToProps = ({RuleEngineReducer}) => {
    return {
        RuleEngineReducer
    }
  }
const actions = {toogleSubFieldsList}
export default connect(mapStateToProps, actions)(RuleEngineFieldsList)