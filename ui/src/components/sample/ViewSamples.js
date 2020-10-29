import React, {useEffect} from 'react';
import { EuiBasicTable } from '@elastic/eui';
import ReactJson from 'react-json-view';
import { Observer } from "mobx-react-lite";
import { useSamplesStore } from "../../store/samplesStore";

function ViewSamples() {

  const { samples } = useSamplesStore();

  const columns = [{
    field: 'id',
    name: 'ID'
  }, {
    field: 'content',
    name: 'Content',
    render: c => (<ReactJson src={c} collapsed={true}/>)
  }];

  return (
    <Observer>{() =>
      <EuiBasicTable
          items={samples}
          columns={columns}
      />
    }</Observer>
  );
}

export default ViewSamples;