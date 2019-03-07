import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

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
    updateRuleEngineSubFields,showAddSubFieldModal,updateSubAddFieldsTextBox,
    toogleFieldsList,hideAddSubFieldModal,
    updateRuleEngineSubfieldsLocalList,updateSelectedSubFields
  } from '../store/actions/rule-engine-actions';

class RuleEngineSubFieldsList extends Component {
  updateSubFields = (jsonData,type)=>{
   let {fieldsState} = this.props.RuleEngineReducer;
 
   let updatedFields = fieldsState.updatedFields;
   this.props.updateRuleEngineSubFields(updatedFields);
  }

  updateRuleEngineSubfieldsLocalList = (jsonData,type)=>{
    let {fields,fieldsState} = this.props.RuleEngineReducer;
    let selectedField = fieldsState.selectedField;
    let updatedFields = _.cloneDeep(fields);
    updatedFields[selectedField]['subfields'][type]=jsonData.updated_src;
    this.props.updateRuleEngineSubfieldsLocalList(updatedFields);
   }

   deleteSubFields = ()=>{
    let {fields,fieldsState} = this.props.RuleEngineReducer;
    let selectedField = fieldsState.selectedField;
    let updatedFields = fields;
    let subFieldsToBeDeleted = fieldsState.selectedSubFieldsToDelete;
    subFieldsToBeDeleted.forEach(subField => {
      delete updatedFields[selectedField]['subfields'][subField];
    });
     this.props.updateRuleEngineSubFields(updatedFields);
   }

   onSelectionChange = (s)=>{
    let {fieldsState} = this.props.RuleEngineReducer;
    this.props.updateSelectedSubFields(fieldsState.selectedField,s);
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
    let {fields,fieldsState} = this.props.RuleEngineReducer;
    let selectedField = fieldsState.selectedField;
    let selectedFieldSubProperties = {
      ...fields[selectedField]['subfields'],
      [fieldsState.addSubFieldKey]:{}
      
    }
    fields[selectedField]['subfields'] = selectedFieldSubProperties;
    this.props.updateRuleEngineSubFields(fields)

  }
  toogleFieldsList = ()=>{
    this.props.toogleFieldsList();
  }
  renderRightButtons = () => {
    let {fieldsState} = this.props.RuleEngineReducer;
    let isSubFieldsUpdated = (fieldsState.updatedFields!==undefined)?false:true;
    let deleteButton;
    if(fieldsState.selectedSubFieldsToDelete.length>0){
      deleteButton=(<EuiButton
        fill
        onClick={this.deleteSubFields}
        color="danger">Delete</EuiButton>
        );
    }
    return (
      <EuiForm>
      <EuiButton
        fill
        style={{ marginRight: '20px' }}
        onClick={this.showAddSubFieldModal}
        color="primary">Add</EuiButton>
          <EuiButton
          fill
          style={{ marginRight: '20px' }}
          disabled={isSubFieldsUpdated}
          onClick={this.updateSubFields}
          color="secondary">Update</EuiButton>
          {deleteButton}
          </EuiForm>
    )
  }
  renderBackButton = () => {
    return (
      <EuiButton
        fill
        onClick={this.toogleFieldsList}
        color="ghost">Back</EuiButton>
    )
  }
render(){

  let search = {
    toolsLeft: this.renderBackButton(),
    toolsRight: this.renderRightButtons(),
    box: {
      incremental: true,
    }
  }
  let selection = {
    selectable:()=>true,
    onSelectionChange: this.onSelectionChange
  };
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
                  onAdd={(e)=>this.updateRuleEngineSubfieldsLocalList(e,item.key)} 
                  onEdit={(e)=>this.updateRuleEngineSubfieldsLocalList(e,item.key)} 
                  onDelete={(e)=>this.updateRuleEngineSubfieldsLocalList(e,item.key)} 
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
              itemId="key"
              columns={columns}
              search={search}
              selection={selection}
              isSelectable={true}
              pagination={true}
              sorting={true}
          />
          {modal}
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
const actions = {updateRuleEngineSubFields,showAddSubFieldModal,updateRuleEngineSubfieldsLocalList,
  hideAddSubFieldModal,updateSubAddFieldsTextBox,toogleFieldsList,updateSelectedSubFields}
export default connect(mapStateToProps, actions)(RuleEngineSubFieldsList)