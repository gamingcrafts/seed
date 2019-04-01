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
import{
  deleteToast
} from '../store/actions/toasts-actions';

import {
  EuiTabbedContent,
  EuiGlobalToastList
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
    let{toasts} = this.props.ToastsReducer;
    return (
      <Fragment>
      <EuiTabbedContent
        tabs={this.tabs}
        initialSelectedTab={this.tabs[4]}
      />
      <EuiGlobalToastList
      toasts={toasts}
      dismissToast={this.props.deleteToast}
      toastLifeTimeMs={4000}
    />
    </Fragment>
    );
  }
}
const mapStateToProps = ({
    columnDefinitionReducer,ToastsReducer
  }) => {
    return {
      columnDefinitionReducer,ToastsReducer
    }
  }
  const actions = {
    getIndices,getSettings,getReports,deleteToast
  }
  export default connect(mapStateToProps, actions)(HomePage)