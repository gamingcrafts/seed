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
    EuiLink,
    EuiOverlayMask,
    EuiModal,
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiModalBody,
    EuiModalFooter,
    EuiButtonEmpty,
    EuiForm,
    EuiFormRow,
    EuiFieldText
  
  } from '@elastic/eui';
  import {
    toogleSubFieldsList,showAddFieldModal,hideAddFieldModal,updateAddFieldsTextBox,updateRuleEngineFields
  } from '../store/actions/rule-engine-actions';

class RuleEngineFieldsList extends Component{
    toogleSubFieldsList = (e,fieldName)=>{
        this.props.toogleSubFieldsList(fieldName);
    }
    showAddFieldModal = ()=>{
      this.props.showAddFieldModal();
    }
    hideAddFieldModal = ()=>{
      this.props.hideAddFieldModal();
    }
    onTextBoxChange=(e,type)=>{
      this.props.updateAddFieldsTextBox({value:e.target.value,type:type})
    }
    addNewField=()=>{
      let {fields,fieldsState} = this.props.RuleEngineReducer;
      let newFieldTobeAdded = fieldsState['addFieldObject'];
      let fieldName = newFieldTobeAdded['name'];
      let newFields ={
        ...fields,
        
          [fieldName]:{
              label:newFieldTobeAdded.label,
              type:newFieldTobeAdded.type,
              subfields:{}
          }
        
      }
      this.props.updateRuleEngineFields(newFields);
    }
render(){
    let {fields,fieldsState} = this.props.RuleEngineReducer;
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
        const addFieldForm=(
          <EuiForm>
          <EuiFormRow
            label="Name"
            compressed>
            <EuiFieldText
            name="name"
            placeholder="Name"
            value={fieldsState['addFieldObject']['name'] ? fieldsState['addFieldObject']['name']: ''}
            onChange={(e) => this.onTextBoxChange(e,'name')}/>
          </EuiFormRow>
          <EuiFormRow
            label="Label"
            compressed>
            <EuiFieldText
            placeholder="Label"
            value={fieldsState['addFieldObject']['label'] ? fieldsState['addFieldObject']['label']: ''}
            onChange={(e) => this.onTextBoxChange(e,'label')}/>
          </EuiFormRow>
          <EuiFormRow
            label="Type"
            compressed>
            <EuiFieldText
            placeholder="Type"
            value={fieldsState['addFieldObject']['type'] ? fieldsState['addFieldObject']['type']: ''}
            onChange={(e) => this.onTextBoxChange(e,'type')}/>
          </EuiFormRow>
          </EuiForm>
        );
        let modal;
        if(fieldsState.showAddFieldModal){
        modal = (
          <EuiOverlayMask>
            <EuiModal
              onClose={this.hideAddFieldModal}
              initialFocus="[name=name]"
            >
              <EuiModalHeader>
                <EuiModalHeaderTitle >
                 Add Field
                </EuiModalHeaderTitle>
              </EuiModalHeader>
  
              <EuiModalBody>
              {addFieldForm}
              </EuiModalBody>
  
              <EuiModalFooter>
                <EuiButtonEmpty
                  onClick={this.hideAddFieldModal}
                >
                  Cancel
                </EuiButtonEmpty>
  
                <EuiButton
                  onClick={this.addNewField}
                  fill
                >
                  Add
                </EuiButton>
              </EuiModalFooter>
            </EuiModal>
          </EuiOverlayMask>
        );
        }
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
                onClick={this.showAddFieldModal}
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
            {modal}
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
const actions = {toogleSubFieldsList,showAddFieldModal,hideAddFieldModal,updateAddFieldsTextBox,updateRuleEngineFields}
export default connect(mapStateToProps, actions)(RuleEngineFieldsList)