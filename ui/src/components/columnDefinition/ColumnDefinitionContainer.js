import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactJson from 'react-json-view';
import {
  getIndices, getIndexCustomMapping, saveCustomMapping, toogleCheckBox, updateTextBox
} from '../store/actions/column-definition-actions';
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiInMemoryTable,
  EuiButton, EuiCheckbox, EuiFieldText,
  EuiComboBox
} from '@elastic/eui';

class ColumnDefinitionContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  onCheckBoxChange = (e, item, type) => {
    this.props.toogleCheckBox({
      event: e,
      item: item,
      type: type
    })
  };

  saveCustomMapping = () => {
    let { indexData, columnDefinition } = this.props.columnDefinitionReducer;
    this.props.saveCustomMapping({
      index: indexData.name,
      columns: columnDefinition
    })
  }

  onTextBoxChange = (e, item, type) => {
    this.props.updateTextBox({
      event: e,
      item: item,
      type: type
    })

  }

  onChange = (selectedOption) => {
    if (selectedOption.length === 0) {
      this.setState({
        selectedOption: [],
        mappings: []
      })
    } else {
      this.setState({
        selectedOption
      });
      this.props.getIndexCustomMapping(selectedOption[0].label);
    }
  };

  renderComboBox = () => {
    const { indices } = this.props.columnDefinitionReducer;
    return (
      <EuiComboBox
        style={{ width: '400px' }}
        placeholder="Select an Index"
        options={indices}
        onChange={this.onChange}
        onSearchChange={this.onSearchChange}
        selectedOptions={this.state.selectedOption}
        singleSelection={{ asPlainText: true }}
      />
    )
  }

  renderAddButton = () => {
    return (
      <EuiButton
        fill
        onClick={this.saveCustomMapping}
        color="primary">Save</EuiButton>
    )
  }

  render() {
    let { mappings, columnDefinition, fetchingMapping } = this.props.columnDefinitionReducer;

    let search = {
      toolsLeft: this.renderComboBox(),
      toolsRight: this.renderAddButton(),
      box: {
        incremental: true,
      }
    }



    const columns = [
      {
        field: 'fieldName',
        name: 'Column Name',
        sortable: true,
        width: '15%',
        hideForMobile: false,
        'data-test-subj': 'columnNameCell',
      },
      {
        field: 'fieldDefinition',
        name: 'Column Type',
        sortable: true,
        width: '25%',
        hideForMobile: false,
        render: c => (<ReactJson src={c} name={false} collapsed={true} />),
        'data-test-subj': 'columnTypeCell',
      },
      {
        field: 'selected',
        name: 'Selected',
        sortable: false,
        width: '10%',
        hideForMobile: true,
        render: (value, item) => (
          <EuiCheckbox
            id={item.fieldName}
            checked={columnDefinition[item.fieldName] ? columnDefinition[item.fieldName].selected : false}
            onChange={(e) => this.onCheckBoxChange(e, item.fieldName, 'selected')} />
        ),
        'data-test-subj': 'selectedCell',
      },
      {
        field: 'label',
        name: 'Label',
        sortable: false,
        width: '20%',
        hideForMobile: true,
        render: (value, item) => (
          <EuiFieldText
            placeholder="Label to represent in table"
            disabled={columnDefinition[item.fieldName] ? !columnDefinition[item.fieldName].selected : true}
            value={columnDefinition[item.fieldName] ? columnDefinition[item.fieldName].label : ''}
            onChange={(e) => this.onTextBoxChange(e, item.fieldName, 'label')}
            aria-label="Use aria labels when no actual label is in use"
          />
        ),
        'data-test-subj': 'labelCell',
      },
      {
        field: 'sortable',
        name: 'Sortable',
        sortable: false,
        width: '10%',
        hideForMobile: true,
        render: (isSortable, item) => (
          <EuiCheckbox
            id={item.fieldName}
            checked={columnDefinition[item.fieldName] ? columnDefinition[item.fieldName].sortable : false}
            disabled={columnDefinition[item.fieldName] ? !columnDefinition[item.fieldName].selected : true}
            onChange={(e) => this.onCheckBoxChange(e, item.fieldName, 'sortable')}
          />
        ),
        'data-test-subj': 'sortableCell',
      },
      {
        field: 'dateColumn',
        name: 'Date Column',
        sortable: false,
        width: '10%',
        hideForMobile: true,
        render: (isDateColumn, item) => (
          <EuiCheckbox
            id={item.fieldName}
            checked={columnDefinition[item.fieldName] ? columnDefinition[item.fieldName].dateColumn : false}
            disabled={columnDefinition[item.fieldName] ? !columnDefinition[item.fieldName].selected : true}
            onChange={(e) => this.onCheckBoxChange(e, item.fieldName, 'dateColumn')}
          />
        ),
        'data-test-subj': 'dataColumnCell',
      },
      {
        field: 'currencyColumn',
        name: 'Currency Column',
        sortable: false,
        width: '10%',
        hideForMobile: true,
        render: (isCurrencyColumn, item) => (
          <EuiCheckbox
            id={item.fieldName}
            checked={columnDefinition[item.fieldName] ? columnDefinition[item.fieldName].currencyColumn : false}
            disabled={columnDefinition[item.fieldName] ? !columnDefinition[item.fieldName].selected : true}
            onChange={(e) => this.onCheckBoxChange(e, item.fieldName, 'currencyColumn')}
          />
        ),
        'data-test-subj': 'currencyColumnCell',
      },
      {
        field: 'format',
        name: 'Format',
        sortable: false,
        width: '20%',
        hideForMobile: true,
        render: (f, item) => (
          <EuiFieldText
            placeholder="Display Format"
            disabled={columnDefinition[item.fieldName] ? !columnDefinition[item.fieldName].selected : true}
            value={columnDefinition[item.fieldName] ? columnDefinition[item.fieldName].format : ''}
            aria-label="Use aria labels when no actual label is in use"
            onChange={(e) => this.onTextBoxChange(e, item.fieldName, 'format')}
          />
        ),
        'data-test-subj': 'formatCell',
      }
    ]
    return (
      <EuiPage>
        <EuiPageBody>
          <EuiPageContent>
            <EuiPageContentBody>
              <EuiInMemoryTable
                loading={fetchingMapping}
                items={mappings}
                columns={columns}
                search={search}
                pagination={true}
                sorting={true}
              />
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}

const mapStateToProps = ({ columnDefinitionReducer }) => ({ columnDefinitionReducer })

const actions = {
  getIndices,
  getIndexCustomMapping,
  saveCustomMapping,
  toogleCheckBox,
  updateTextBox
}

export default connect(mapStateToProps, actions)(ColumnDefinitionContainer)