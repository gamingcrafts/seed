import React from 'react';
import { connect } from 'react-redux';
import {
  getIndices
} from '../store/actions/column-definition-actions';
import {
    EuiPage,
    EuiPageBody,
    EuiPageContent,EuiSpacer, EuiBasicTable,
    EuiButton,
    EuiComboBox
  } from '@elastic/eui';

  class ColumnDefinitionContainer extends React.Component{

    constructor(props){
      super(props);
      this.indices=[];
      this.state={
        selectedOption:[]
      };

      
    }
    componentDidMount(){
      this.props.getIndices();
    }
    onChange = (selectedOptions) => {
      this.setState({
        selectedOption:selectedOptions[0].label,
      });
    };
    onCreateOption = (searchValue, flattenedOptions) => {
      // this.setState(prevState => ({
      //   selectedOptions: [].concat(searchValue),
      // }));
    }

    render(){
      let {indices} = this.props.columnDefinitionReducer;
      if(this.indices.length===0){
        Object.keys(indices).forEach((index)=>{
          if(index!=='custom_mapping'){
            this.indices.push({label:index});
          }
        });
      }
      if(indices===undefined)
      {
        return null;
      }
      else{
    return (
        <EuiComboBox
          placeholder="Select an Index"
          options={this.indices}
          onChange={this.onChange}
        
          singleSelection={{ asPlainText: true }}
        />
      );
      }
    }

  }

  const mapStateToProps = ({ columnDefinitionReducer }) => {
    return { columnDefinitionReducer }
  }
  
  export default connect(mapStateToProps, {getIndices})(ColumnDefinitionContainer)