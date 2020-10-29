import React, {useEffect} from 'react';
import { EuiBasicTable } from '@elastic/eui';
import ReactJson from 'react-json-view';
import { Observer } from "mobx-react-lite";
import { useSamplesStore } from "../../store/samplesStore";
import axios from "axios";

function ViewSamples() {

  const store = useSamplesStore();
  const { samples, setSamples } = store;

  useEffect(() => {
    axios.get("http://localhost:8000/samples")
      .then(res => {
        console.log(res.data);
        setSamples(res.data);
      }).catch((error) => {
        console.log("Error" + error);
    })
  }, [setSamples]);

  console.log('SAMPLES RESULT:');
  console.log(samples);

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