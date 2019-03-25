import React,{Fragment} from 'react';
import { connect } from 'react-redux';
import {
  EuiPanel

} from '@elastic/eui';
import {showAddCardModal} from '../store/actions/cards-actions';

const showUserCardAddModal=(props)=>{
  props.showAddCardModal();

}

const noCardsFoundComponent = (props)=>{

  return(
    <EuiPanel paddingSize="l" onClick={() => showUserCardAddModal(props)}>
      <p>No User Cards Found. Click here to add one!</p>
    </EuiPanel>
)
}
const mapStateToProps = ({CardsReducer}) => {
  return {
    CardsReducer
  }
}
const actions = {
  showAddCardModal
}
const NoCardsFound = connect(mapStateToProps, actions)(noCardsFoundComponent)
export default NoCardsFound;