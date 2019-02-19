import React, { Component, Fragment } from 'react';
import ColumnDefinitionContainer from '../columnDefinition/ColumnDefinitionContainer';
import RuleEngine from '../rule-engine/RuleEngine';
import { connect } from 'react-redux';
import {
  getIndices
} from '../store/actions/column-definition-actions';
import {
  getSettings
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
      id: 'segmentation',
      name: 'Segmentation',
      content: (
        <RuleEngine/>
      ),
    }];
  }
  componentDidMount() {
    this.props.getIndices();
    this.props.getSettings();
  }



  render() {
    return (
      <EuiTabbedContent
        tabs={this.tabs}
        initialSelectedTab={this.tabs[1]}
        onTabClick={(tab) => { console.log('clicked tab', tab); }}
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
    getIndices,getSettings
  }
  export default connect(mapStateToProps, actions)(HomePage)