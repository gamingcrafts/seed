import React,{Component} from 'react';
import { connect } from 'react-redux';
import ReactJson from 'react-json-view';
import {
  getIndices,getIndexCustomMapping
} from '../store/actions/column-definition-actions';
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle, EuiSpacer, EuiBasicTable,
  EuiButton,EuiCheckbox,EuiFieldText,
  EuiComboBox,
  EuiFlexGroup,
  EuiFlexItem
} from '@elastic/eui';

class ColumnDefinitionContainer extends Component {

  constructor(props) {
    super(props);
    
    this.indices=[];
    
    this.mappings=[];
    this.state = {
      selectedOption: [],
      mappings:[],
      pageIndex: 0,
      pageSize: 5,
      showPerPageOptions: true
    }
  }
  componentDidMount() {
    this.props.getIndices();
    
  }

  onCheckBoxChange = e => {
    console.log(e);
  };
  

  onChange = (selectedOption) => {
   console.log(selectedOption)

    if(selectedOption.length===0){
      this.setState({
        selectedOption:[],
        mappings:[]
      })
      
    }
    else{
      this.setState({ selectedOption });
    this.props.getIndexCustomMapping(selectedOption[0].label);
    }
  };

    onSearchChange=(arg)=>{
      console.log(arg);
    };

    onTableChange = ({ page = {} }) => {
      const {
        index: pageIndex,
        size: pageSize,
      } = page;
  
      this.setState({
        pageIndex,
        pageSize,
      });
    };
  
  render() {
    let { indices,mappings } = this.props.columnDefinitionReducer;
    this.indices=indices;
    
    this.mappings=mappings;
   
    if (this.indices === undefined) {
      return null;
    }
    else {
      const {
        pageIndex,
        pageSize,
        showPerPageOptions
      } = this.state;
      const pagination = {
        pageIndex ,
        pageSize ,
        totalItemCount:20,
        pageSizeOptions: [10, 20, 30],
        showPerPageOptions
      };
      const columns = [{
        field: 'fieldName',
        name: 'Column Name',
        sortable: true,
        width:'15%',
        hideForMobile: false,
        'data-test-subj': 'columnNameCell',
      },
      {
        field: 'fieldDefinition',
        name: 'Column Type',
        sortable: true,
        width:'25%',
        hideForMobile: false,
        render: c => (<ReactJson src={c} collapsed={true}/>),
        'data-test-subj': 'columnTypeCell',
      },
      {
        field: 'label',
        name: 'Label',
        sortable: false,
        width:'20%',
        hideForMobile: true,
        render:l=>(<EuiFieldText
          placeholder=""
          onChange={this.onChange}
          aria-label="Use aria labels when no actual label is in use"
        />),
        'data-test-subj': 'labelCell',
      },
      {
        field: 'seleted',
        name: 'Selected',
        sortable: false,
        width:'10%',
        hideForMobile: true,
        render:(isSelected,item)=>{
         return( <EuiCheckbox
          id={item.fieldName}
          
          checked={isSelected}
          onChange={this.onCheckBoxChange}
          
        />)
        },
        'data-test-subj': 'selectedCell',
      },
      {
        field: 'sortable',
        name: 'Sortable',
        sortable: false,
        width:'10%',
        hideForMobile: true,
        render:(isSortable,item)=>{
         return( <EuiCheckbox
          id={item.fieldName}
          
          checked={isSortable}
          onChange={this.onCheckBoxChange}
          
        />)
        },
        'data-test-subj': 'sortableCell',
      },
      {
        field: 'dateColumn',
        name: 'Date Column',
        sortable: false,
        width:'10%',
        hideForMobile: true,
        render:(isDateColumn,item)=>{
         return( <EuiCheckbox
          id={item.fieldName}
          
          checked={isDateColumn}
          onChange={this.onCheckBoxChange}
          
        />)
        },
        'data-test-subj': 'dataColumnCell',
      },
      {
        field: 'currencyColumn',
        name: 'Currency Column',
        sortable: false,
        width:'10%',
        hideForMobile: true,
        render:(isCurrencyColumn,item)=>{
         return( <EuiCheckbox
          id={item.fieldName}
          
          checked={isCurrencyColumn}
          onChange={this.onCheckBoxChange}
          
        />)
        },
        'data-test-subj': 'currencyColumnCell',
      },
      {
        field: 'format',
        name: 'Format',
        sortable: false,
        width:'20%',
        hideForMobile: true,
        'data-test-subj': 'formatCell',
      }
    ] 
      return (
        <EuiPage>
    <EuiPageBody>
      <EuiPageHeader>
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>Indices Column Definition</h1>
          </EuiTitle>
        </EuiPageHeaderSection>
      </EuiPageHeader>
      <EuiPageContent>
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>Index :</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>
        <EuiFlexGroup>
          <EuiFlexItem grow={10}>
        <EuiComboBox
          placeholder="Select an Index"
          options={this.indices}
          onChange={this.onChange}
          onSearchChange={this.onSearchChange}
          selectedOptions={this.state.selectedOption}
          singleSelection={{ asPlainText: true }}
        />
        </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer/>
     

    
    <EuiFlexGroup>
         <EuiFlexItem>
        <EuiBasicTable
      items={this.mappings}
      columns={columns}
      pagination = {pagination}
      onChange={this.onTableChange}
    />
    </EuiFlexItem>
    </EuiFlexGroup>
        </EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
        
    


      );
    }
  }

}

const mapStateToProps = ({ columnDefinitionReducer }) => {
  return { columnDefinitionReducer }
}

export default connect(mapStateToProps, { getIndices,getIndexCustomMapping })(ColumnDefinitionContainer)