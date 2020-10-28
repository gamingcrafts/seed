import React from 'react';
import CreateSample from './create';
import ViewSamples from './view';
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent
} from '@elastic/eui'
import { EuiSpacer } from '@elastic/eui';
class SampleContainer extends React.Component {


  componentDidMount() {
  
  }

  
  render() {
    return (
      <EuiPage>
        <EuiPageBody>
          <EuiPageContent>
            <ViewSamples/>
            <EuiSpacer size="xl"/>
            <CreateSample />
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    )
  }
}

export default SampleContainer