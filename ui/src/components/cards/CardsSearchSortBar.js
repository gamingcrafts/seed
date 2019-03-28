import React,{Fragment} from 'react';
import { connect } from 'react-redux';
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiFieldSearch,
    EuiFormRow,
    EuiSelect,
    EuiButton
} from '@elastic/eui';
import {showAddCardModal,filterUserCards} from '../store/actions/cards-actions';
const cardsSearch=(props,e)=>{
  props.filterUserCards(e.target.value)

}

const cardsSort=(props)=>{

}
const showUserCardAddModal=(props)=>{
  props.showAddCardModal();

}

const cardsSearchSortBar = (props)=>{
  const options = [
    { value: 'Default', text: 'Default' },
    { value: 'date-latest-to-oldest', text: 'Date - Latest to Oldest' },
    { value: 'date-oldest-to-latest', text: 'Date - Oldest to Latest' },
  ];
  return(
<EuiFlexGroup style={{ maxWidth: 900,marginLeft:200}}>
  <EuiFlexItem style={{ width: 300 }}>
    <EuiFormRow label="Search">
      <EuiFieldSearch
          placeholder="Type card name to search"
          value={undefined}
          onChange={(e)=>cardsSearch(props,e)}
        />
    </EuiFormRow>
    </EuiFlexItem>
    <EuiFlexItem style={{ width: 300 }}>
    <EuiFormRow label="Sort by">
      <EuiSelect
          options={options}
          value={'Default'}
          onChange={()=>cardsSort(props)}
      />
    </EuiFormRow>
    </EuiFlexItem>
    <EuiFlexItem  grow = {false} style={{ width: 100 ,marginTop:30}}>
    <EuiFormRow>
      <EuiButton 
          fill
          onClick={()=>showUserCardAddModal(props)}>
          Add a Card
      </EuiButton>
    </EuiFormRow>
  </EuiFlexItem>
</EuiFlexGroup>
)
}
const mapStateToProps = ({CardsReducer}) => {
  return {
    CardsReducer
  }
}
const actions = {
  showAddCardModal,
  filterUserCards
}
const CardsSearchSortBar = connect(mapStateToProps, actions)(cardsSearchSortBar)
export default CardsSearchSortBar;