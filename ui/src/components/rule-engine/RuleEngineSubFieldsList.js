import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactJson from 'react-json-view';

import {
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentBody,
    EuiInMemoryTable,
    
  
  } from '@elastic/eui';
  import {
    toogleFieldsList
  } from '../store/actions/rule-engine-actions';

class RuleEngineSubFieldsList extends Component {
render(){
  let {fields,fieldsState} = this.props.RuleEngineReducer;
  let subFields = fields[fieldsState.seletedField]['subfields'];
  let subfieldsList = Object.keys(subFields).map((key)=>{
    return {key:key,value:subFields[key]}
  })

  const columns = [
    {
      field: 'key',
      name: 'Key',
      truncateText: true,
  },
    {
    field: 'value',
    name: 'Value',
    sortable: true,
    truncateText: true,
    render: c => (<ReactJson src={c} name={null} collapsed={true}/>)

      }
    ]
    return ( <EuiPage>
      <EuiPageBody>
        <EuiPageContent>
        <EuiPageContentBody>
          
          <EuiInMemoryTable
              items={subfieldsList}
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
const actions = {toogleFieldsList}
export default connect(mapStateToProps, actions)(RuleEngineSubFieldsList)