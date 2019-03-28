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


const cards = (props)=>{
   let {showAddCardModal,showAddActionModal,cards} = props.CardsReducer;
   let cardsContent;
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
   
      return ( 
      <EuiPage>
        <EuiPageBody>
           <EuiPageContent>
              <EuiPageContentBody>
                 {cardsContent}
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