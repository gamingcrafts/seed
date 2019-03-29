import React,{Fragment} from 'react';
import { connect } from 'react-redux';
import {
EuiButton,
EuiButtonEmpty,
EuiFieldText,
EuiForm,
EuiFormRow,
EuiFlexItem,
EuiFlexGroup
} from '@elastic/eui';

import {hideEditPage,addOrEditCard,updateCurrentCardValue} from '../store/actions/cards-actions';
import { EuiSpacer } from '@elastic/eui';


const updateCurrentCard = (props,e,type)=>{
let updatedValue={type:type,value:e.target.value};
props.updateCurrentCardValue(updatedValue);
}
const updateUserGroupCard = (props)=>{
props.addOrEditCard();
}
const editCardPage = (props)=>{
let {currentCard} = props.CardsReducer;
const editForm = (

<EuiFlexGroup justifyContent="spaceAround" >
<EuiForm >
  <h2>Edit User Group Card</h2>
  <EuiSpacer size="l" />
   <EuiFormRow label="Card Name">
      <EuiFieldText name="cardName"
         value={currentCard.name} 
         disabled
         onChange={(e)=>
      updateCurrentCard(props,e,'name')}/>
   </EuiFormRow>
   <EuiFormRow label="Description">
      <EuiFieldText name="cardDescription" 
         value={currentCard.description}
         onChange={(e)=>
      updateCurrentCard(props,e,'description')}/>
   </EuiFormRow>
   <EuiFlexGroup style={{ maxWidth: 600 }}>
   <EuiFlexItem>
      <EuiFormRow>
         <EuiButtonEmpty
            onClick={()=>props.hideEditPage()}>
            Cancel
         </EuiButtonEmpty>
      </EuiFormRow>
   </EuiFlexItem>
   <EuiFlexItem>
      <EuiFormRow>
         <EuiButton onClick={()=>updateUserGroupCard(props)} fill>
            Save
         </EuiButton>
      </EuiFormRow>
   </EuiFlexItem>
   </EuiFlexGroup>
</EuiForm>
</EuiFlexGroup>
);
return ( 
<Fragment>
   {editForm}
</Fragment>
)
}
const mapStateToProps = ({CardsReducer}) => {
return {
CardsReducer
}
}
const actions = {
addOrEditCard,
hideEditPage,
updateCurrentCardValue
}
const EditCardPage = connect(mapStateToProps, actions)(editCardPage)
export default EditCardPage;