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
  EuiRange,
  EuiSwitch,
} from '@elastic/eui';
import CardsSearchSortBar from './CardsSearchSortBar';
import CardsList from './CardsList';
import {hideAddCardModal,addOrEditCard,updateCurrentCardValue} from '../store/actions/cards-actions';

const hideUserCardAddModal=(props)=>{
    props.hideAddCardModal();
}

const updateCurrentCard = (props,e,type)=>{
  let updatedValue={type:type,value:e.target.value};

  props.updateCurrentCardValue(updatedValue);
}
const addUserGroupCard = (props)=>{
  props.addOrEditCard();
}


const addCardModal = (props)=>{
  let {currentCard} = props.CardsReducer;
  const addForm = (
    <EuiForm>
      <EuiFormRow
        label="Card Name"
      >
        <EuiFieldText name="cardName"
        value={currentCard.name} 
        onChange={(e)=>updateCurrentCard(props,e,'name')}/>
      </EuiFormRow>
      <EuiFormRow
        label="Description"
      >
        <EuiFieldText name="cardDescription" 
        value={currentCard.description}
        onChange={(e)=>updateCurrentCard(props,e,'description')}/>
      </EuiFormRow>
    </EuiForm>
  );
  
  
  const addModal = (
            <EuiOverlayMask>
            <EuiModal
              onClose={()=>
                hideUserCardAddModal(props)}>
              <EuiModalHeader>
                  <EuiModalHeaderTitle >
                   Add User Group Card
                  </EuiModalHeaderTitle>
              </EuiModalHeader>
              <EuiModalBody>
                  {addForm}
              </EuiModalBody>
              <EuiModalFooter>
                  <EuiButtonEmpty
                    onClick={()=>hideUserCardAddModal(props)}>
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
        {addModal}
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
  hideAddCardModal,
  updateCurrentCardValue
}
const AddCardModal = connect(mapStateToProps, actions)(addCardModal)
export default AddCardModal;