import React from 'react';
import {connect} from 'react-redux';
import {
  hideRuleEngineReportsForm,
  updateReportText,
  updateReport,
  deleteReport
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
  EuiLink,
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
  EuiPanel
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

const ruleEngineReportsFrom = props => {
  let {reportsState,aliases} = props.RuleEngineReducer;
  let selectedReport = reportsState.selectedReport;
  var fieldsList = Object.keys(selectedReport.config.columns).map(key => {
    return {name:key,...selectedReport.config.columns[key]}
})
  let selectOptions = []

  selectOptions.push({value:'',text:'Select and Index'});
  aliases.forEach((alias)=>{
    selectOptions.push({value:alias,text:alias});
  })
  let actions=[{
    render: (item) => {
      return (
        <EuiLink
          onClick={() => this.deleteUser(item)}
          color="danger"
        >
          Delete
        </EuiLink>
      );
    }
  }]
  const columns = [
    {
      field: 'name',
      name: 'Column Name',
      sortable: true,
      width: '15%',
      hideForMobile: false,
      'data-test-subj': 'columnNameCell',
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
          checked={item['selected'] ? item['selected']: false}
        />
      ),
      'data-test-subj': 'selectedCell',
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
      'data-test-subj': 'selectedCell',
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
      'data-test-subj': 'selectedCell',
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
      'data-test-subj': 'selectedCell',
    },
    {
      field: 'format',
      name: 'Format',
      sortable: true,
      width: '15%',
      hideForMobile: false,
      'data-test-subj': 'columnNameCell',
    },{
      name:'Action',
      actions
    }
  ];
  return (<EuiPage>
    <EuiPageBody>
       <EuiPageContent>
          <EuiPageContentBody>
             <EuiFlexGroup>
                <EuiFlexItem grow={10}>
                   <h3>Report Edit</h3>
                </EuiFlexItem>
                <EuiFlexItem>
                </EuiFlexItem>
                <EuiFlexItem>
                   <EuiButton
                      fill
                      onClick={()=>hideReportForm(props)}
                      color="ghost">Back
                   </EuiButton>
                </EuiFlexItem>
                <EuiFlexItem>
                   <EuiButton
                      fill
                      onClick={()=>updateSeletedReport(props)}
                      color="primary">Update
                   </EuiButton>
                </EuiFlexItem>
                <EuiFlexItem>
                   <EuiButton
                      fill
                      onClick={()=>deleteSelectedReport(props)}
                      color="danger">Delete
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
                      onChange={(e) => updateReportTextBox(props,e,'indexName')}/>
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
                         />
                      <EuiPanel>
                         <EuiFlexGroup style={{ maxWidth: 900 }}>
                         <EuiFlexItem>
                            <EuiFormRow label="Column Name" >
                               <EuiFieldText />
                            </EuiFormRow>
                         </EuiFlexItem>
                         <EuiFlexItem>
                            <EuiFormRow label="Selected">
                               <EuiCheckbox
                                  label=""
                                  />
                            </EuiFormRow>
                         </EuiFlexItem>
                         <EuiFlexItem>
                            <EuiFormRow label="Sortable">
                               <EuiCheckbox
                                  label=""
                                  />
                            </EuiFormRow>
                         </EuiFlexItem>
             </EuiFlexGroup>
             <EuiFlexGroup style={{ maxWidth: 900 }}>
             <EuiFlexItem>
             <EuiFormRow label="DateColumn">
             <EuiCheckbox
                label=""
                />
             </EuiFormRow>
             </EuiFlexItem>
             <EuiFlexItem>
             <EuiFormRow label="Currency Column">
             <EuiCheckbox
                label=""
                />
             </EuiFormRow>
             </EuiFlexItem>
             <EuiFlexItem>
             <EuiFormRow label="Format" >
             <EuiFieldText />
             </EuiFormRow>
             </EuiFlexItem>
             <EuiFlexItem grow={false}>
             <EuiFormRow hasEmptyLabelSpace>
             <EuiButton>Add</EuiButton>
             </EuiFormRow>
             </EuiFlexItem>
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
const actions = {hideRuleEngineReportsForm,updateReportText,updateReport,deleteReport}
const RuleEngineReportsForm = connect(mapStateToProps, actions)(ruleEngineReportsFrom);

export default  RuleEngineReportsForm;