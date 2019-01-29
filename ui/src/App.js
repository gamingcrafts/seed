import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import thunk from 'redux-thunk';
import reducers from './components/store/reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import SampleContainer from './components/sample/SampleContainer';

const axiosInstance = axios.create({
});

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk.withExtraArgument(axiosInstance)),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SampleContainer />
      </Provider>
    );
  }
}

export default App;
