import React from 'react';
import { connect } from 'react-redux';

import {
  EuiBasicTable,
  EuiButton
} from '@elastic/eui';
import ReactJson from 'react-json-view';
import {
  deleteSample
} from '../store/actions/samples-action'


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
    },{
      field:'deleteButton',
      name:"Delete",
      render : (c,item) =>(<EuiButton color="danger"
      size="s"
      fill
        onClick={(e) =>this.props.deleteSample(item)}
      >
        Delete
      </EuiButton>)
    }
  ];


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

export default connect(mapStateToProps, {deleteSample})(ViewSamples)