import React from 'react';
import {connect} from 'react-redux';
import {
  hideRuleEngineReportsForm,
  updateReportText,
  updateReport,
  deleteReport,
  updateConfigColumnText,
  updateConfigColumnCheck,
  addOrUpdateConfigColumn,
  deleteConfigColumn,
  showConfigColumnAdd,
  showConfigColumnEdit,showConfigColumnDelete,fetchColumnDefinitionsForIndex
} from '../store/actions/rule-engine-actions';
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiFlexGroup,
  EuiFlexItem,
  EuiInMemoryTable,
  EuiButton,
//   EuiLink,
  // EuiOverlayMask,
  // EuiModal,
  // EuiModalHeader,
  // EuiModalHeaderTitle,
  // EuiModalBody,
  // EuiModalFooter,
  // EuiButtonEmpty,
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiTextArea,
  EuiSelect,
  EuiCheckbox,
  EuiPanel,
  EuiSwitch
} from '@elastic/eui';

const hideReportForm=(props)=>{
  props.hideRuleEngineReportsForm();
}

 const updateSeletedReport=(props)=>{
  let {reportsState} = props.RuleEngineReducer;
  let selectedReport = reportsState.selectedReport;
  props.updateReport(selectedReport);

 }

 const deleteSelectedReport=(props)=>{
  let {reportsState} = props.RuleEngineReducer;
  let selectedReport = reportsState.selectedReport;
  props.deleteReport(selectedReport);
 }

 const updateReportTextBox=(props,e,type)=>{
    props.updateReportText({value:e.target.value,type:type})
 }
 const updateColumnTextBox=(props,e,type)=>{
   props.updateConfigColumnText({value:e.target.value,type:type})
 }
 const updateColumnCheckBox=(props,e,type)=>{
   props.updateConfigColumnCheck({value:e.target.checked,type:type})
 }

 const showAddConfigColumnForm =(props)=>{
   props.showConfigColumnAdd();
 }
 const showEditConfigColumnForm =(props,item)=>{
    props.showConfigColumnEdit(item);
}
const showDeleteConfigColumnForm =(props,item)=>{
   props.showConfigColumnDelete(item);
}
 const addOrEditConfigColumn=(props)=>{
    let {reportsState} = props.RuleEngineReducer;
    props.addOrUpdateConfigColumn(reportsState.configColumnObject,reportsState.selectedReport);

 }
 const deleteConfigColumnInReport=(props)=>{

   let {reportsState} = props.RuleEngineReducer;
   props.deleteConfigColumn(reportsState.configColumnObject,reportsState.selectedReport);
    
 }
 const updateColumnDefinitionsForIndex=(props,e)=>{
    props.fetchColumnDefinitionsForIndex(e.target.value);
 }
const reportsFrom = props => {
  let {reportsState,aliases} = props.RuleEngineReducer;
  let selectedReport = reportsState.selectedReport;
  let configColumnObject = reportsState.configColumnObject;
  var fieldsList = Object.keys(selectedReport.config.columns).map(key => {
    return {name:key,...selectedReport.config.columns[key]}
})
  let selectOptions = []

  selectOptions.push({value:'',text:'Select and Index'});
  aliases.forEach((alias)=>{
    selectOptions.push({value:alias,text:alias});
  })
  let actions=[
 {
   name: 'Edit',
   isPrimary: true,
   description: 'Edit this user',
   icon: 'pencil',
   type: 'icon',
   onClick: (item) => showEditConfigColumnForm(props,item),
 }, 
 {
   name: 'Delete',
   description: 'Delete this user',
   icon: 'trash',
   color: 'danger',
   type: 'icon',
   onClick: (item) => showDeleteConfigColumnForm(props,item),
   isPrimary: true,
 }]
  const columns = [
    {
      field: 'name',
      name: 'Column Name',
      sortable: true,
      width: '15%',
      hideForMobile: false,
      'data-test-subj': 'name',
    },
    {
      field: 'label',
      name: 'Label',
      sortable: true,
      width: '20%',
      hideForMobile: false,
      'data-test-subj': 'label',
    },
    {
      field: 'format',
      name: 'Format',
      sortable: true,
      width: '15%',
      hideForMobile: false,
      'data-test-subj': 'format',
    },
    {
      field: 'selected',
      name: 'Selected',
      sortable: false,
      width: '10%',
      hideForMobile: true,
      render: (value, item) => (
        <EuiCheckbox
          id={item.name}
          onChange={()=>{}}
          checked={item['selected'] ? item['selected']: false}
        />
      ),
      'data-test-subj': 'selected',
    },
    {
      field: 'sortable',
      name: 'Sortable',
      sortable: false,
      width: '10%',
      hideForMobile: true,
      render: (value, item) => (
        <EuiCheckbox
          id={item.name}
          checked={item['sortable'] ? item['sortable']: false}
        />
      ),
      'data-test-subj': 'sortable',
    },
    {
      field: 'dateColumn',
      name: 'Date',
      sortable: false,
      width: '10%',
      hideForMobile: true,
      render: (value, item) => (
        <EuiCheckbox
          id={item.name}
          checked={item['dateColumn'] ? item['dateColumn']: false}
        />
      ),
      'data-test-subj': 'dateC',
    },
    {
      field: 'currencyColumn',
      name: 'Currency',
      sortable: false,
      width: '10%',
      hideForMobile: true,
      render: (value, item) => (
        <EuiCheckbox
          id={item.name}
          checked={item['currencyColumn'] ? item['currencyColumn']: false}
        />
      ),
      'data-test-subj': 'currency',
    },
   {
      name:'Actions',
      actions
    }
  ];
  let addButton,updateButton,deleteButton,cancelButton;
  if(reportsState.columnAddButtonVisible){
     addButton=(
      <EuiFlexItem grow={1.5}>
      <EuiFormRow hasEmptyLabelSpace>
      <EuiButton onClick={(e)=>addOrEditConfigColumn(props)}
      style={{ marginTop: -40 }} iconType="plusInCircle" fill size="s">Add</EuiButton>
      </EuiFormRow>
      </EuiFlexItem>)
  }
  if (reportsState.columnCancelButtonVisible){
     cancelButton=(<EuiFlexItem grow={1.5}>
      <EuiFormRow hasEmptyLabelSpace>
      <EuiButton style={{ marginTop: -40 }}fill 
      onClick={(e)=>showAddConfigColumnForm(props)}
      color="warning" size="s" iconType="editorUndo">Cancel</EuiButton>
      </EuiFormRow>
      </EuiFlexItem>)
  }
 
  if (reportsState.columnUpdateButtonVisible){
   updateButton=(<EuiFlexItem grow={1.5}>
    <EuiFormRow hasEmptyLabelSpace>
      <EuiButton style={{ marginTop: -40 }}
      fill color="secondary" 
      onClick={(e)=>addOrEditConfigColumn(props)}
      size="s" iconType="save">Update</EuiButton>
    </EuiFormRow>
    </EuiFlexItem>)
}
if (reportsState.columnDeleteButtonVisible){
   deleteButton=(<EuiFlexItem grow={1.5}>
    <EuiFormRow hasEmptyLabelSpace>
    <EuiButton style={{ marginTop: -40 }}fill 
   
    onClick={(e)=>deleteConfigColumnInReport(props)}
    color="danger" size="s" iconType="trash">Delete</EuiButton>
    </EuiFormRow>
    </EuiFlexItem>)
}
  return (<EuiPage>
   <EuiPageBody>
      <EuiPageContent>
         <EuiPageContentBody>
            <EuiFlexGroup>
               <EuiFlexItem grow={10}>
                  <h3><u>{selectedReport.name} </u>- Report Edit</h3>
               </EuiFlexItem>
               <EuiFlexItem>
               </EuiFlexItem>
               <EuiFlexItem>
                  <EuiButton
                     fill
                     iconType="sortLeft"
                     onClick={()=>hideReportForm(props)}
                     color="ghost">Back
                  </EuiButton>
               </EuiFlexItem>
              
               <EuiFlexItem>
                  <EuiButton
                     fill
                     iconType="trash"
                     onClick={()=>deleteSelectedReport(props)}
                     color="danger">Delete
                  </EuiButton>
               </EuiFlexItem>
               <EuiFlexItem>
                  <EuiButton
                     fill
                     iconType="save"
                     onClick={()=>updateSeletedReport(props)}
                     color="secondary">Update
                  </EuiButton>
               </EuiFlexItem>
            </EuiFlexGroup>
            <EuiFlexGroup>
               <EuiFlexItem style={{ maxWidth: 300 }}>
               <EuiPanel style={{ maxWidth: 300 }}>
               <EuiForm>
                  <EuiFormRow label="Index" compressed>
                     <EuiSelect
                     options={selectOptions}
                     value={ selectedReport['config']['indexName'] ?  selectedReport['config']['indexName']: null}
                     onChange={(e) => updateColumnDefinitionsForIndex(props,e)}/>
                  </EuiFormRow>
                  <EuiFormRow label="Query" compressed>
                     <EuiTextArea
                     name="query"
                     placeholder="Query"
                     value={selectedReport['config']['query'] ? selectedReport['config']['query']: ''}
                     onChange={(e) => updateReportTextBox(props,e,'query')}/>
                  </EuiFormRow>
                  <EuiFormRow label="Sort Field" compressed>
                     <EuiFieldText
                     placeholder="Sort Field"
                     value={selectedReport['config']['sortField'] ? selectedReport['config']['sortField']: ''}
                     onChange={(e) => updateReportTextBox(props,e,'sortField')}/>
                  </EuiFormRow>
                  <EuiFormRow label="Sort Direction" compressed>
                     <EuiFieldText
                     placeholder="Sort Direction"
                     value={selectedReport['config']['sortDirection'] ? selectedReport['config']['sortDirection']: ''}
                     onChange={(e) => updateReportTextBox(props,e,'sortDirection')}/>
                  </EuiFormRow>
               </EuiForm>
               </EuiPanel>
               </EuiFlexItem>
               <EuiFlexItem>
                  <EuiPanel>
                     <EuiInMemoryTable
                        items={fieldsList}
                        itemId="name"
                        columns={columns}
                        pagination={true}
                        sorting={true}
                        compressed={true}
                        />
                     <EuiPanel>
            <EuiFlexGroup style={{ maxWidth: 900 }}>
               <EuiFlexItem>
                  <EuiFormRow label="Column Name" >
                     <EuiFieldText compressed
                     disabled={reportsState.columnDeleteButtonVisible || reportsState.columnUpdateButtonVisible}
                     value={configColumnObject['name']?configColumnObject['name']:''} 
                     onChange={(e) => updateColumnTextBox(props,e,'name')}/>
                  </EuiFormRow>
               </EuiFlexItem>
               <EuiFlexItem>
                  <EuiFormRow label="Label" >
                     <EuiFieldText 
                     disabled={reportsState.columnDeleteButtonVisible}
                     value={configColumnObject['label']?configColumnObject['label']:''}
                     onChange={(e) => updateColumnTextBox(props,e,'label')}/>
                  </EuiFormRow>
               </EuiFlexItem>
               <EuiFlexItem>
                  <EuiFormRow label="Format" >
                     <EuiFieldText 
                     disabled={reportsState.columnDeleteButtonVisible}
                     value={configColumnObject['format']?configColumnObject['format']:''}
                     onChange={(e) => updateColumnTextBox(props,e,'format')}/>
                  </EuiFormRow>
               </EuiFlexItem>
            </EuiFlexGroup>
            <EuiFlexGroup style={{ maxWidth: 900 }} >
               <EuiFlexItem grow={1}>
               <EuiFormRow label="Selected">
               <EuiSwitch
                  label=""
                  disabled={reportsState.columnDeleteButtonVisible}
                  checked={configColumnObject['selected']?configColumnObject['selected']:false}
                  onChange={(e) => updateColumnCheckBox(props,e,'selected')}
                  />
               </EuiFormRow>
               </EuiFlexItem>
               <EuiFlexItem grow={1}>
               <EuiFormRow label="Sortable">
               <EuiSwitch
                  label=""
                  disabled={reportsState.columnDeleteButtonVisible}
                  checked={configColumnObject['sortable']?configColumnObject['sortable']:false}
                  onChange={(e) => updateColumnCheckBox(props,e,'sortable')}
                  />
               </EuiFormRow>
               </EuiFlexItem>
               <EuiFlexItem grow={1}>
               <EuiFormRow label="DateColumn">
               <EuiSwitch
                  label=""
                  disabled={reportsState.columnDeleteButtonVisible}
                  checked={configColumnObject['dateColumn']?configColumnObject['dateColumn']:false}
                  onChange={(e) => updateColumnCheckBox(props,e,'dateColumn')}
                  />
               </EuiFormRow>
               </EuiFlexItem>
               <EuiFlexItem grow={2}>
               <EuiFormRow label="Currency Column">
               <EuiSwitch
                  label=""
                  disabled={reportsState.columnDeleteButtonVisible}
                  checked={configColumnObject['currencyColumn']?configColumnObject['currencyColumn']:false}
                  onChange={(e) => updateColumnCheckBox(props,e,'currencyColumn')}
                  />
               </EuiFormRow>
               </EuiFlexItem>
              
               {addButton}
               {updateButton}
               {deleteButton}
               {cancelButton}
            </EuiFlexGroup>
         </EuiPanel>
      </EuiPanel>
   </EuiFlexItem>
</EuiFlexGroup>
         </EuiPageContentBody>
      </EuiPageContent>
   </EuiPageBody>
</EuiPage>)
}

const mapStateToProps = ({RuleEngineReducer}) => {
  return {RuleEngineReducer}
}
const actions = {
   hideRuleEngineReportsForm,
   updateReportText,
   updateReport,
   deleteReport,
   updateConfigColumnText,
   updateConfigColumnCheck,
   addOrUpdateConfigColumn,
   deleteConfigColumn,
   showConfigColumnAdd,
  showConfigColumnEdit,showConfigColumnDelete,fetchColumnDefinitionsForIndex
}
const ReportsForm = connect(mapStateToProps, actions)(reportsFrom);

export default  ReportsForm;