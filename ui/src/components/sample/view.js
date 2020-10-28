import React from 'react';

import {
  EuiBasicTable
} from '@elastic/eui';
import ReactJson from 'react-json-view';


class ViewSamples extends React.Component {

  render() {
  
      const samples  = [{"id":1,"content":{"test":"test"}}]

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
    )
  }
}


export default ViewSamples