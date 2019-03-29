import React from 'react';
import { connect } from 'react-redux';
import {
EuiLink
} from '@elastic/eui';
import {showAddCardModal} from '../store/actions/cards-actions';
const showUserCardAddModal=(props)=>{
props.showAddCardModal();
}
const noCardsFoundComponent = (props)=>{
return(
<p style={{textAlign:'center'}}>
   No User Cards Found. Click 
   <span>
      <EuiLink paddingSize ="l" onClick={() => showUserCardAddModal(props)}> here </EuiLink>
   </span>
   to add one!
</p>
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