import React from 'react';
import { connect } from 'react-redux';

import {
  EuiBasicTable
} from '@elastic/eui';
import ReactJson from 'react-json-view';


class ViewSamples extends React.Component {

  render() {
    const { samples } = this.props.sampleReducer;

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

const mapStateToProps = ({ sampleReducer }) => {
  return { sampleReducer }
}

export default connect(mapStateToProps, null)(ViewSamples)