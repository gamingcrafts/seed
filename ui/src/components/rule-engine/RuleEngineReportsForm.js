import {
  connect
} from 'react-redux';
const ruleEngineReportsFrom = props => ('Form-View')

const mapStateToProps = ({
  RuleEngineReducer
}) => {
  return {
    RuleEngineReducer
  }
}
const actions = {}


const RuleEngineReportsForm = connect(mapStateToProps, actions)(ruleEngineReportsFrom);

export default  RuleEngineReportsForm;