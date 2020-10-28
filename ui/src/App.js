import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SampleContainer from './components/sample/SampleContainer';

const axiosInstance = axios.create({
});



class App extends Component {
  render() {
    return (
        <SampleContainer />
    );
  }
}

export default App;
