import React from 'react';
import {connect} from 'react-redux';
import {hideRuleEngineReportsForm,updateReportText,updateReport} from '../store/actions/rule-engine-actions';
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
  EuiFieldText,
  EuiTextArea
} from '@elastic/eui';

const hideReportForm=(props)=>{
  props.hideRuleEngineReportsForm();
}

 const updateSeletedReport=(props)=>{
  let {reportsState} = props.RuleEngineReducer;
  let selectedReport = reportsState.selectedReport;
  props.updateReport(selectedReport);

 }

 const updateReportTextBox=(props,e,type)=>{
    props.updateReportText({value:e.target.value,type:type})
 }

const ruleEngineReportsFrom = props => {
  let {reportsState} = props.RuleEngineReducer;
  let selectedReport = reportsState.selectedReport;
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
            color="ghost">Back</EuiButton>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiButton
            fill
            onClick={()=>updateSeletedReport(props)}
            color="primary">Update</EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiForm>
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
      </EuiPageContentBody>
    </EuiPageContent>
  </EuiPageBody>
 </EuiPage>)
}




const mapStateToProps = ({RuleEngineReducer}) => {
  return {RuleEngineReducer}
}
const actions = {hideRuleEngineReportsForm,updateReportText,updateReport}
const RuleEngineReportsForm = connect(mapStateToProps, actions)(ruleEngineReportsFrom);

export default  RuleEngineReportsForm;