import React,{Fragment} from 'react';
import { connect } from 'react-redux';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiSelect,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText
} from '@elastic/eui';
import CardsSearchSortBar from './CardsSearchSortBar';
import CardsList from './CardsList';
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


const addActionModal = (props)=>{
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
          onChange={(e)=>updateCurrentCard(props,e,'action')}
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
    return {
      CardsReducer
    }
}
const actions = {
  hideAddActionModal,
  saveCardAction,
  updateCurrentCardValue
}
const AddActionModal = connect(mapStateToProps, actions)(addActionModal)
export default AddActionModal;