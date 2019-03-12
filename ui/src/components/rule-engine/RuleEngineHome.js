import React, { Component } from 'react';
import RuleEngineSettings from '../rule-engine/RuleEngineSettings';
import RuleEngineOperators from '../rule-engine/RuleEngineOperators';
import RuleEngineFields from '../rule-engine/RuleEngineFields';
import RuleEngineReports from '../rule-engine/RuleEngineReports';
import { connect } from 'react-redux';
import {
  getIndices
} from '../store/actions/column-definition-actions';
import {
  getSettings,getOperators,getFields
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
      )
    }, {
      id: 'ruleEngineOperators',
      name: 'Operators',
      content: (
        <RuleEngineOperators/>
      )
    },
    {
      id: 'ruleEngineFields',
      name: 'Fields',
      content: (
        <RuleEngineFields/>
      )
    },
    {
      id:'ruleEngineReports',
      name:'Reports',
      content:(
        <RuleEngineReports/>
      )
    }
  ];
  }
  componentDidMount() {
    this.props.getOperators();
    this.props.getFields();
  }
render() {
    return (
      <EuiTabbedContent
        tabs={this.tabs}
        initialSelectedTab={this.tabs[2]}
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
    getIndices,getSettings,getOperators,getFields
  }
  export default connect(mapStateToProps, actions)(RuleEngineHome)