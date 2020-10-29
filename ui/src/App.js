import React from 'react';
import './App.css';
import axios from 'axios';
import SampleContainer from './components/sample/SampleContainer';
import {SamplesStoreProvider} from "./store/samplesStore";
import {EuiPageContent} from "@elastic/eui";

function App() {
  const axiosInstance = axios.create({
  });

  return (
    <SamplesStoreProvider>
      <SampleContainer />
    </SamplesStoreProvider>
  );
}

export default App;
