import React,{Fragment} from 'react';
import { connect } from 'react-redux';
import {
  EuiOverlayMask,
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiListGroup,
  EuiListGroupItem
  
} from '@elastic/eui';
import { hideAddCardTypeModal,
  selectNewCardType} from '../store/actions/cards-actions';


const addCardTypeModal = (props)=>{
  let cardTypeModal=(
    <EuiOverlayMask>
      <EuiModal onClose={()=>props.hideAddCardTypeModal()}>
        <EuiModalHeader>
              <EuiModalHeaderTitle >
                Select the Card Type
              </EuiModalHeaderTitle>
            </EuiModalHeader>

            <EuiModalBody>
            <EuiListGroup flush={false} bordered={false} maxWidth={288}>
          <EuiListGroupItem
            id="link1"
            iconType="bullseye"
            label="Metric Card"
            onClick={() => props.selectNewCardType('metric-card')}
            isActive
          
          />

          <EuiListGroupItem
            id="link2"
            iconType="beaker"
            onClick={() => props.selectNewCardType('trend-card')}
            label="Trend Card"
           
          />
        </EuiListGroup>
            </EuiModalBody>
            </EuiModal>
        </EuiOverlayMask>
  );
  return ( 
    <Fragment>
    {cardTypeModal}
    </Fragment>
 )
}

const mapStateToProps = ({CardsReducer}) => {
  return {
    CardsReducer
  }
}

const actions = {
  hideAddCardTypeModal,
  selectNewCardType
}
const AddCardTypeModal = connect(mapStateToProps, actions)(addCardTypeModal)
export default AddCardTypeModal;