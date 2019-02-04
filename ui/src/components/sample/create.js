import React from 'react';
import { connect } from 'react-redux';
import ReactJson from 'react-json-view'

import {
  EuiButton
} from '@elastic/eui';

import {
  createSample
} from '../store/actions/samples-action'
import { EuiSpacer } from '@elastic/eui';

class CreateSample extends React.Component {
  state = {
    json: {
      content: {}
    }
  }

  onAdd = e => {
    this.setState({
      json: e.updated_src
    })
  }

  onEdit = e => {
    this.setState({
      json: e.updated_src
    })
  }

  onDelete = e => {
    this.setState({
      json: e.updated_src
    })
  }

  save = () => {
    this.props.createSample(this.state.json)
  }

  render() {
    const { json } = this.state;
    return (
      <React.Fragment>
        <p>Add a Sample</p>
        <EuiSpacer size="s"/>
        <ReactJson src={json}
          onAdd={this.onAdd}
          onEdit={this.onEdit}
          onDelete={this.onDelete} />
        <EuiSpacer size="s"/>
        <EuiButton onClick={this.save}>Save</EuiButton>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ sampleStore }) => {
  return { sampleStore }
}

export default connect(mapStateToProps, {
  createSample
})(CreateSample)