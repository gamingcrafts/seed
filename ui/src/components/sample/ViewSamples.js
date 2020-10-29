import React from 'react';
import { EuiBasicTable } from '@elastic/eui';
import ReactJson from 'react-json-view';

function ViewSamples() {

  const samples  = [{ "id": 1,"content": { "test": "test" } }];

  const columns = [{
    field: 'id',
    name: 'ID'
  }, {
    field: 'content',
    name: 'Content',
    render: c => (<ReactJson src={c} collapsed={true}/>)
  }];

  return (
      <EuiBasicTable
          items={samples}
          columns={columns}
      />
  );
}

export default ViewSamples;