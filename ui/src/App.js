import React from 'react';
import './App.css';
import axios from 'axios';
import SampleContainer from './components/sample/SampleContainer';

function App() {
  const axiosInstance = axios.create({
  });

  return (
    <SampleContainer />
  );
}

export default App;
