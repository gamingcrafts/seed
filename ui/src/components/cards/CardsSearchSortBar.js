import React from 'react';
import { connect } from 'react-redux';
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiFieldSearch,
    EuiFormRow,
    EuiSelect,
    EuiButton
} from '@elastic/eui';
import {showAddCardModal,filterUserCards,sortCardsByDate} from '../store/actions/cards-actions';
const cardsSearch=(props,e)=>{
  props.filterUserCards(e.target.value)

}

const cardsSort=(props,e)=>{
  props.sortCardsByDate(e.target.value);

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
          onChange={(e)=>cardsSort(props,e)}
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
  filterUserCards,
  sortCardsByDate
}
const CardsSearchSortBar = connect(mapStateToProps, actions)(cardsSearchSortBar)
export default CardsSearchSortBar;