import React, { Component } from 'react';
import RuleEngineSettings from '../rule-engine/RuleEngineSettings';
import RuleEngineOperators from '../rule-engine/RuleEngineOperators';
import { connect } from 'react-redux';
import {
  getIndices
} from '../store/actions/column-definition-actions';
import {
  getSettings,getOperators
} from '../store/actions/rule-engine-actions';

import {
  EuiTabbedContent
} from '@elastic/eui';

class RuleEngineHome extends Component {
  constructor(props) {
    super(props);
    this.tabs = [
      {
      id: 'ruleEngineSettings',
      name: 'Settings',
      content: (
        <RuleEngineSettings />
      ),
    }, {
      id: 'ruleEngineOperators',
      name: 'Operators',
      content: (
        <RuleEngineOperators/>
      ),
    }];
  }
  componentDidMount() {
    this.props.getOperators()
  }
render() {
    return (
      <EuiTabbedContent
        tabs={this.tabs}
        initialSelectedTab={this.tabs[1]}
      />
    );
  }
}
const mapStateToProps = ({
    RuleEngineReducer
  }) => {
    return {
        RuleEngineReducer
    }
  }
  const actions = {
    getIndices,getSettings,getOperators
  }
  export default connect(mapStateToProps, actions)(RuleEngineHome)