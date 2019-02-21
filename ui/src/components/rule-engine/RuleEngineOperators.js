import  { Component } from 'react';
import { connect } from 'react-redux';

class RuleEngineOperators extends Component {
    
    render(){
        return ("Operators")
    }
}
const mapStateToProps = ({RuleEngineReducer}) => {
    return {
        RuleEngineReducer
    }
  }
const actions = {}
export default connect(mapStateToProps, actions)(RuleEngineOperators)