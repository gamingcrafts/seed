import React, { Component, Fragment } from 'react';
import ColumnDefinitionContainer from '../columnDefinition/ColumnDefinitionContainer';
import RuleEngineHome from '../rule-engine/RuleEngineHome';
import ReportsHome from '../reports/ReportsHome'
import CardsHome from '../cards/CardsHome'
import { connect } from 'react-redux';
import {
  getIndices
} from '../store/actions/column-definition-actions';
import {
  getSettings,getReports
} from '../store/actions/rule-engine-actions';

import {
  EuiTabbedContent
} from '@elastic/eui';

class HomePage extends Component {
  constructor(props) {
    super(props);



    this.tabs = [{
      id: 'generalSettings',
      name: 'General Settings',
      content: (
        <Fragment>
         General Settings
        </Fragment>
      ),
    }, {
      id: 'columnDefinition',
      name: 'Column Definition',
      content: (
        <ColumnDefinitionContainer />
      ),
    }, {
      id: 'ruleEngine',
      name: 'Rule Engine',
      content: (
        <RuleEngineHome/>
      ),
    },
    {
      id:'reportsHome',
      name:'Reports',
      content:(
        <ReportsHome/>
      )
    },
    {
      id:'cardsHome',
      name:'Cards',
      content:(
        <CardsHome/>
      )
    }
  ];
  }
  componentDidMount() {
    this.props.getIndices();
    this.props.getSettings();
    this.props.getReports();
  }



  render() {
    return (
      <EuiTabbedContent
        tabs={this.tabs}
        initialSelectedTab={this.tabs[4]}
      />
    );
  }
}
const mapStateToProps = ({
    columnDefinitionReducer
  }) => {
    return {
      columnDefinitionReducer
    }
  }
  const actions = {
    getIndices,getSettings,getReports
  }
  export default connect(mapStateToProps, actions)(HomePage)