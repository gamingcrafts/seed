import React from 'react';
import { connect } from 'react-redux';
import {
  getIndices,getIndexCustomMapping
} from '../store/actions/column-definition-actions';
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent, EuiSpacer, EuiBasicTable,
  EuiButton,
  EuiComboBox
} from '@elastic/eui';

class ColumnDefinitionContainer extends React.Component {

  constructor(props) {
    super(props);
    this.indices = [];
    this.state = {
      selectedOption: []
    };
  }
  componentDidMount() {
    this.props.getIndices();
  }

  onChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.getIndexCustomMapping(selectedOption[0].label)
  };

  render() {
    let { indices } = this.props.columnDefinitionReducer;
    this.indices=indices;
    if (indices === undefined) {
      return null;
    }
    else {
      return (
        <EuiComboBox
          placeholder="Select an Index"
          options={this.indices}
          onChange={this.onChange}
          selectedOptions={this.state.selectedOption}
          singleSelection={{ asPlainText: true }}
        />
      );
    }
  }

}

const mapStateToProps = ({ columnDefinitionReducer }) => {
  return { columnDefinitionReducer }
}

export default connect(mapStateToProps, { getIndices,getIndexCustomMapping })(ColumnDefinitionContainer)