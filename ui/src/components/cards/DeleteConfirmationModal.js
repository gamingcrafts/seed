import React,{Fragment} from 'react';
import { connect } from 'react-redux';
import {
  EuiOverlayMask,
  EuiConfirmModal,
  EUI_MODAL_CONFIRM_BUTTON
} from '@elastic/eui';
import {hideDeleteModal,deleteCard} from '../store/actions/cards-actions';


const deleteCardConfirmationModal = (props)=>{
  let deleteCardModal=(
    <EuiOverlayMask>
          <EuiConfirmModal
            title="Do you really want to delete the card?"
            onCancel={()=>props.hideDeleteModal()}
            onConfirm={()=>props.deleteCard()}
            cancelButtonText="No"
            confirmButtonText="Delete"
            buttonColor="danger"
            defaultFocusedButton={EUI_MODAL_CONFIRM_BUTTON}
          >
          </EuiConfirmModal>
        </EuiOverlayMask>
  );
  return ( 
    <Fragment>
    {deleteCardModal}
    </Fragment>
 )
}

const mapStateToProps = ({CardsReducer}) => {
  return {
    CardsReducer
  }
}

const actions = {
  hideDeleteModal,
  deleteCard
}
const DeleteCardConfirmationModal = connect(mapStateToProps, actions)(deleteCardConfirmationModal)
export default DeleteCardConfirmationModal;