import React from 'react';
import {
  connect
} from 'react-redux';
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

import {showAddReportModal,
  hideAddReportModal,updateAddReportObjectTextBox,addReport} from '../store/actions/rule-engine-actions'

const toogleReportsForm=(props,e,name)=>{
  props.toogleRuleEngineReportsForm(name);
}
const addNewReport=(props)=>{
  let {reportsState} = props.RuleEngineReducer;
  props.addReport(reportsState.addReportObject);

}

const onTextBoxChange=(props,e,type)=>{
  props.updateAddReportObjectTextBox({value:e.target.value,type:type})
}
const ruleEngineReportsList = (props) => {

  let {reports,reportsState} = props.RuleEngineReducer;

  const addReportForm=(
    <EuiForm>
    <EuiFormRow
      label="Name"
      compressed>
      <EuiFieldText
      name="name"
      placeholder="Name"
      value={reportsState['addReportObject']['name'] ? reportsState['addReportObject']['name']: ''}
      onChange={(e) => onTextBoxChange(props,e,'name')}/>
    </EuiFormRow>
    <EuiFormRow
      label="Description"
      compressed>
      <EuiFieldText
      placeholder="Description"
      value={reportsState['addReportObject']['description'] ? reportsState['addReportObject']['label']: ''}
      onChange={(e) => onTextBoxChange(props,e,'description')}/>
    </EuiFormRow>
    <EuiFormRow
      label="Status"
      compressed>
      <EuiFieldText
      placeholder="Status"
      value={reportsState['addReportObject']['status'] ? reportsState['addReportObject']['status']: ''}
      onChange={(e) => onTextBoxChange(props,e,'status')}/>
    </EuiFormRow>
    </EuiForm>
  );
  let modal;
  if(reportsState.showAddReportModal){
  modal = (
    <EuiOverlayMask>
      <EuiModal
        onClose={props.hideAddReportModal}
        initialFocus="[name=name]"
      >
        <EuiModalHeader>
          <EuiModalHeaderTitle >
           New Report
          </EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
        {addReportForm}
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButtonEmpty
            onClick={props.hideAddReportModal}
          >
            Cancel
          </EuiButtonEmpty>

          <EuiButton
           onClick={()=>addNewReport(props)}
            fill
          >
            Add
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    </EuiOverlayMask>
  );
  }
  
  const columns = [{
    field: 'name',
    name: 'Operator Name',
    sortable: true,
    truncateText: true,
    render: (value,item) =>
        (< EuiLink 
        onClick={(e)=>toogleReportsForm(this.props,e,value)}
        color = "primary" > {value} 
        </EuiLink>)

      },
    {
        field: 'name',
        name: 'Name',
        truncateText: true,
    },
    {
        field: 'description',
        name: 'Description',
        truncateText: true,
    },
    {
        field: 'status',
        name: 'status'
    }
  ];
  return (<EuiPage>
              <EuiPageBody>
                <EuiPageContent>
                <EuiPageContentBody>
                <EuiFlexGroup>
                  <EuiFlexItem grow={10}>
                  <h3>Rule-Engine Reports</h3>
                  </EuiFlexItem>
                  <EuiFlexItem>
                  </EuiFlexItem>
                  <EuiFlexItem>
                    <EuiButton
                      fill
                      onClick={props.showAddReportModal}
                      color="primary">Add</EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
                <EuiInMemoryTable 
                  items={reports}
                  columns={columns}
                  search={true}
                  pagination={true}
                  sorting={true}
                />
                {modal}
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
           </EuiPage>)
}

const mapStateToProps = ({
  RuleEngineReducer
}) => {
  return {
    RuleEngineReducer
  }
}
const actions = {
  showAddReportModal,
  hideAddReportModal,
  updateAddReportObjectTextBox,
  addReport
}


const RuleEngineReportsList = connect(mapStateToProps, actions)(ruleEngineReportsList);

export default  RuleEngineReportsList;