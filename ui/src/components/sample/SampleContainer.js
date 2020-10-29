import React, {useEffect} from 'react';
import CreateSample from './CreateSample';
import ViewSamples from './ViewSamples';
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent
} from '@elastic/eui'
import { EuiSpacer } from '@elastic/eui';

function SampleContainer() {
  useEffect(() => {

  })

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
  );
}

export default SampleContainer;