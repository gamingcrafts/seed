import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactJson from 'react-json-view';

import {
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentBody,
    EuiInMemoryTable,
    EuiOverlayMask,
    EuiModal,
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiModalBody,
    EuiModalFooter,
    EuiButtonEmpty,
    EuiForm,
    EuiFormRow,
    EuiFieldText,
    EuiButton

    
  
  } from '@elastic/eui';
  import {
    toogleFieldsList,updateRuleEngineFields,showAddSubFieldModal,updateSubAddFieldsTextBox
  } from '../store/actions/rule-engine-actions';

class RuleEngineSubFieldsList extends Component {
  updateSubFields = (jsonData,type)=>{
   let {fields,fieldsState} = this.props.RuleEngineReducer;
   let selectedField = fieldsState.selectedField;
   let updatedFields = fields;
   updatedFields[selectedField]['subfields'][type]=jsonData.updated_src;
   this.props.updateRuleEngineFields(updatedFields);
  }

  showAddSubFieldModal = ()=>{
    this.props.showAddSubFieldModal();
  }
  hideAddSubFieldModal = ()=>{
    this.props.hideAddSubFieldModal();
  }
  onTextBoxChange=(e,type)=>{
    this.props.updateSubAddFieldsTextBox({value:e.target.value,type:'addSubFieldKey'})
  }
  addKeyToASubField=()=>{

  }
render(){
  let {fields,fieldsState} = this.props.RuleEngineReducer;
  let subFields = fields[fieldsState.selectedField]['subfields'];
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
    render: (c,item) => (<ReactJson 
                  src={c} 
                  name={null} 
                  onAdd={(e)=>this.updateSubFields(e,item.key)} 
                  onEdit={(e)=>this.updateSubFields(e,item.key)} 
                  onDelete={(e)=>this.updateSubFields(e,item.key)} 
                  collapsed={true}/>)

      }
    ];

    const addFieldForm=(
      <EuiForm>
      <EuiFormRow
        label="Key"
        compressed>
        <EuiFieldText
        name="key"
        placeholder="key"
        value={fieldsState['addSubFieldKey'] ? fieldsState['addSubFieldKey']: ''}
        onChange={(e) => this.onTextBoxChange(e,'key')}/>
      </EuiFormRow>
      
      </EuiForm>
    );
    let modal;
    if(fieldsState.showAddSubFieldModal){
      modal = (
        <EuiOverlayMask>
          <EuiModal
            onClose={this.hideAddSubFieldModal}
            initialFocus="[name=key]"
          >
            <EuiModalHeader>
              <EuiModalHeaderTitle >
               Add Sub-Field
              </EuiModalHeaderTitle>
            </EuiModalHeader>

            <EuiModalBody>
            {addFieldForm}
            </EuiModalBody>

            <EuiModalFooter>
              <EuiButtonEmpty
                onClick={this.hideAddSubFieldModal}
              >
                Cancel
              </EuiButtonEmpty>

              <EuiButton
                onClick={this.addKeyToASubField}
                fill
              >
                Add
              </EuiButton>
            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      );
      }
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
const actions = {toogleFieldsList,updateRuleEngineFields,showAddSubFieldModal,updateSubAddFieldsTextBox}
export default connect(mapStateToProps, actions)(RuleEngineSubFieldsList)