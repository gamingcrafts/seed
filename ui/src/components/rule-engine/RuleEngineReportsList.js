import {
  connect
} from 'react-redux';
const ruleEngineReportsList = props => ('List-View')

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