import React,{Fragment} from 'react';
import { connect } from 'react-redux';
import {
EuiPage,
EuiPageBody,
EuiPageContent,
EuiPageContentBody,
EuiSpacer
} from '@elastic/eui';
import CardsSearchSortBar from './CardsSearchSortBar';
import CardsList from './CardsList';
import AddCardPage from './AddCardPage'
import EditCardPage from './AddCardPage'
import NoCardsFound from './NoCardsFound'
import AddActionPage from'./AddActionPage'
import DeleteCardConfirmationModal from './DeleteConfirmationModal'
import AddCardTypeModal from './AddCardTypeModal'
const cards = (props)=>{
let {showAddCardModal,
   showAddActionModal,showDeleteModal,
   showEditPage,cards,showAddCardTypeModal} = props.CardsReducer;
let cardsContent,deleteModal,addCardTypeModal;
if(Object.keys(cards).length>0){
cardsContent = (
<Fragment>
   <CardsSearchSortBar/>
   {/* --------
   <CardsSearchSortBar/>
   --------- */}
   <EuiSpacer size="l" />
   <CardsList/>
   {/* --------
   <CardsList/>
   --------- */}
</Fragment>
)
}
else{
cardsContent = 
<NoCardsFound/>
}
if (showAddCardModal) {
cardsContent = (
<AddCardPage/>
)
}
if(showAddActionModal){
cardsContent=
<AddActionPage/>
}
if(showEditPage){
cardsContent=
<EditCardPage/>
}
if(showDeleteModal){
deleteModal = 
<DeleteCardConfirmationModal/>
}
if(showAddCardTypeModal){
   addCardTypeModal=<AddCardTypeModal/>
}
return ( 
<EuiPage>
   <EuiPageBody>
      <EuiPageContent>
         <EuiPageContentBody>
            {cardsContent}
            {deleteModal}
            {addCardTypeModal}
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