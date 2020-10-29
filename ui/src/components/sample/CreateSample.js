import React, {useState} from 'react';
import ReactJson from 'react-json-view'

import {
  EuiButton
} from '@elastic/eui';

import { EuiSpacer } from '@elastic/eui';

function CreateSample() {
  const [json, setJson] = useState({
    content: {},
  });

  const onAdd = e => {
    setJson(e.updated_src)
  }

  const onEdit = e => {
    setJson(e.updated_src);
  }

  const onDelete = e => {
    setJson(e.updated_src);
  }

  const save = () => {
    //this.props.createSample(this.state.json)
  }

  return (
    <React.Fragment>
      <p>Add a Sample</p>
      <EuiSpacer size="s"/>
      <ReactJson src={json}
                 onAdd={onAdd}
                 onEdit={onEdit}
                 onDelete={onDelete} />
      <EuiSpacer size="s"/>
      <EuiButton onClick={save}>Save</EuiButton>
    </React.Fragment>
  );
}

export default CreateSample;