import React from 'react';
import { connect } from 'react-redux';

import {
  getSamples
} from '../store/actions/samples-action';

class SampleContainer extends React.Component {

  componentDidMount() {
    this.props.getSamples();
  }

  render() {
    return (
      <p>Works!!!</p>
    )
  }
}

const mapStateToProps = ({ sampleReducer }) => {
  return { sampleReducer }
}

export default connect(mapStateToProps, {
  getSamples
})(SampleContainer)