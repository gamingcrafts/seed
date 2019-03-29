import React,{Fragment} from 'react';
import { connect } from 'react-redux';
import {
EuiButton,
EuiButtonEmpty,
EuiForm,
EuiFormRow,
EuiSelect,
EuiFlexGroup,
EuiFlexItem,
EuiText
} from '@elastic/eui';
import {
hideAddActionModal,
saveCardAction,
updateCurrentCardValue
} from '../store/actions/cards-actions';

const hideUserCardActionModal=(props)=>{
props.hideAddActionModal();
}

const updateCurrentCard = (props,e,type)=>{
let updatedValue={type:type,value:e.target.value};
props.updateCurrentCardValue(updatedValue);
}

const saveAction = (props)=>{
props.saveCardAction();
}

const addActionPage = (props)=>{
let {currentCard} = props.CardsReducer;
let options = [
{ value: '', text: 'Select an Action' },
{ value: 'SMS', text: 'SMS' },
{ value: 'EMAIL', text: 'EMAIL' },
{ value: 'PUSH', text: 'PUSH' }
];
const addActionForm = (
<EuiFlexGroup justifyContent="spaceAround">
   <EuiForm>
      <EuiFormRow label="Card Name">
         <EuiText grow={false}>
            {currentCard['name']}
         </EuiText>
      </EuiFormRow>
      <EuiFormRow label="Card Action">
         <EuiSelect
            options={options}
            value={currentCard['action']}
            onChange={(e)=>
         updateCurrentCard(props,e,'action')}
         />
      </EuiFormRow>
      <EuiFlexGroup style={{ maxWidth: 600 }}>
      <EuiFlexItem>
         <EuiFormRow>
            <EuiButtonEmpty
               onClick={()=>hideUserCardActionModal(props)}>
               Cancel
            </EuiButtonEmpty>
         </EuiFormRow>
      </EuiFlexItem>
      <EuiFlexItem>
         <EuiFormRow>
            <EuiButton onClick={()=>saveAction(props)} fill>
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
   {addActionForm}
</Fragment>
)
}
const mapStateToProps = ({CardsReducer}) => {
return {CardsReducer}
}
const actions = {
hideAddActionModal,
saveCardAction,
updateCurrentCardValue
}
const AddActionPage = connect(mapStateToProps, actions)(addActionPage)
export default AddActionPage;