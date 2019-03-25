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
  EuiSelect
} from '@elastic/eui';
import CardsSearchSortBar from './CardsSearchSortBar';
import CardsList from './CardsList';
import {
 hideAddActionModal,
  addOrEditCard,
  updateCurrentCardValue
} from '../store/actions/cards-actions';

const hideUserCardActionModal=(props)=>{
    props.hideAddActionModal();
}

const updateCurrentCard = (props,e,type)=>{
  let updatedValue={type:type,value:e.target.value};

  props.updateCurrentCardValue(updatedValue);
}
const addUserGroupCard = (props)=>{
  props.addOrEditCard();
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
    <EuiForm>
      <EuiFormRow
        label="Card Action"
      >
        <EuiSelect
          options={options}
          value={currentCard['action']}
          onChange={(e)=>updateCurrentCard(props,e,'action')}
        />
      </EuiFormRow>
     
    </EuiForm>
  );
  
  
  const addActionModal = (
            <EuiOverlayMask>
            <EuiModal
              onClose={()=>
                hideUserCardActionModal(props)}>
              <EuiModalHeader>
                  <EuiModalHeaderTitle >
                   Add Action to user group
                  </EuiModalHeaderTitle>
              </EuiModalHeader>
              <EuiModalBody>
                  {addActionForm}
              </EuiModalBody>
              <EuiModalFooter>
                  <EuiButtonEmpty
                    onClick={()=>hideUserCardActionModal(props)}>
                    Cancel
                  </EuiButtonEmpty>
                  <EuiButton
                    onClick={()=>addUserGroupCard(props)}
                    fill>
                    Save
                  </EuiButton>
              </EuiModalFooter>
            </EuiModal>
        </EuiOverlayMask>
        )
      return ( 
        <Fragment>
        {addActionModal}
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
  addOrEditCard,
  updateCurrentCardValue
}
const AddActionModal = connect(mapStateToProps, actions)(addActionModal)
export default AddActionModal;