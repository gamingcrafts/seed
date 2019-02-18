import React, { Component, Fragment } from 'react';
import ColumnDefinitionContainer from '../columnDefinition/ColumnDefinitionContainer';
import { connect } from 'react-redux';
import {
  getIndices, getIndexCustomMapping,saveCustomMapping,toogleCheckBox,updateTextBox
} from '../store/actions/column-definition-actions';

import {
  EuiTabbedContent,
  EuiTitle,
  EuiText,
  EuiSpacer,
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
        <Fragment>
         Segmentation
        </Fragment>
      ),
    }];
  }
  componentDidMount() {
    this.props.getIndices();
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
    getIndices
  }
  export default connect(mapStateToProps, actions)(HomePage)