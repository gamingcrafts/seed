import React from 'react';
import { connect } from 'react-redux';
import CreateSample from './create';
import ViewSamples from './view';
import {
  getSamples
} from '../store/actions/samples-action';

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent
} from '@elastic/eui'
import { EuiSpacer } from '@elastic/eui';
class SampleContainer extends React.Component {

  componentDidMount() {
    this.props.getSamples();
  }

  render() {
    return (
      <EuiPage>
        <EuiPageBody>
          <EuiPageContent>
            <ViewSamples />
            <EuiSpacer size="xl"/>
            <CreateSample />
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    )
  }
}

const mapStateToProps = ({ sampleReducer }) => {
  return { sampleReducer }
}

export default connect(mapStateToProps, {
  getSamples
})(SampleContainer)