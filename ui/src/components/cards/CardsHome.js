import React,{Fragment} from 'react';
import { connect } from 'react-redux';
import {
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentBody,
    EuiFlexGroup,
    EuiFlexItem,
    EuiCard, EuiIcon,EuiButtonIcon,EuiSpacer
  
  } from '@elastic/eui';
  import CardsSearchSortBar from './CardsSearchSortBar';
  import CardsList from './CardsList';
  import AddCardModal from './AddCardModal'
  import NoCardsFound from './NoCardsFound'
  import AddActionModal from'./AddActionModal'
  import DeleteCardConfirmationModal from './DeleteConfirmationModal'


const cards = (props)=>{
   let {showAddCardModal,showAddActionModal,showDeleteModal,cards} = props.CardsReducer;
   let cardsContent,deleteModal;
   if(Object.keys(cards).length>0){
      cardsContent = (
         <Fragment>
         <CardsSearchSortBar/> {/* --------<CardsSearchSortBar/>--------- */}
                 <EuiSpacer size="l" />
                 <CardsList/>          {/* --------<CardsList/>--------- */}
                 </Fragment>
      )
   }
   else{
      cardsContent = <NoCardsFound/>
   }
   if (showAddCardModal) {
      cardsContent = (<AddCardModal/>)
   }
   if(showAddActionModal){
      cardsContent=<AddActionModal/>
   }
   if(showDeleteModal){
      deleteModal = <DeleteCardConfirmationModal/>
   }
   
      return ( 
      <EuiPage>
        <EuiPageBody>
           <EuiPageContent>
              <EuiPageContentBody>
                 {cardsContent}
                 {deleteModal}
              </EuiPageContentBody>
           </EuiPageContent>
        </EuiPageBody>
     </EuiPage>
     )
}
const mapStateToProps = ({CardsReducer}) => {
    return {
      CardsReducer
    }
}
const actions = {}
const CardsHome = connect(mapStateToProps, actions)(cards)
export default CardsHome;