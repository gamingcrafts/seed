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
  EuiLink

} from '@elastic/eui';



const toogleReportsForm=(props,e,name)=>{
  props.toogleRuleEngineReportsForm(name);
}
const ruleEngineReportsList = (props) => {

  let {reports} = props.RuleEngineReducer;
 
  
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
                      onClick={toogleReportsForm}
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
const actions = {}


const RuleEngineReportsList = connect(mapStateToProps, actions)(ruleEngineReportsList);

export default  RuleEngineReportsList;