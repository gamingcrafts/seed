import { 
  SHOW_ADD_CARD_MODAL,
  HIDE_ADD_CARD_MODAL,
  SAVE_USER_GROUP_CARD,
  EDIT_USER_GROUP_CARD,
  DELETE_USER_GROUP_CARD,
  CLONE_USER_GROUP_CARD,
  UPDATE_CURRENT_CARD,
  SHOW_ADD_ACTION_MODAL,
  HIDE_ADD_ACTION_MODAL
} from "../actions/types";

const showAddCardModal = ()=>{
  return (dispatch, getState, http) => {
  dispatch({
    type:SHOW_ADD_CARD_MODAL,
  })
}
}

const hideAddCardModal = ()=>{
  return (dispatch, getState, http) => {
  dispatch({
    type:HIDE_ADD_CARD_MODAL,
  })
}
}

const updateCurrentCardValue = (updatedValue)=>{
  return (dispatch, getState, http) => {
  dispatch({
    type:UPDATE_CURRENT_CARD,
    payload:updatedValue
  })
}
}

const addOrEditCard=()=>{
  return (dispatch, getState, http) => {
    let {currentCard,cards}  = getState().CardsReducer;
    let newCard={};
    let cardName = currentCard.name;
    cards[cardName]={...currentCard};
    
    dispatch({
      type:SAVE_USER_GROUP_CARD,
      payload:{cards:cards}
    })
  }
}

const deleteCard=()=>{
  return (dispatch, getState, http) => {
    dispatch({
      type:DELETE_USER_GROUP_CARD,
      payload:undefined
    })
  }
}

const cloneCard=()=>{
  return (dispatch, getState, http) => {
    dispatch({
      type:CLONE_USER_GROUP_CARD,
      payload:undefined
    })
  }
}

const showAddActionModal = (cardName)=>{
  console.log(cardName)
  return (dispatch, getState, http) => {
  let {cards}  = getState().CardsReducer;
  dispatch({
      type:SHOW_ADD_ACTION_MODAL,
      payload:{card:cards[cardName]}
    })
  }
}

const hideAddActionModal = (cardName)=>{
  return (dispatch, getState, http) => {
  dispatch({
      type:HIDE_ADD_ACTION_MODAL
    })
  }
}

const filterUserCards=(searchName)=>{
  
  return (dispatch, getState, http) => {
  let {cards}  = getState().CardsReducer;
  let filterUserCards ={}
  if(searchName===''){
    filterUserCards=cards;
  }
  else{
   Object.keys(cards).forEach((name)=>{
    
     if(name.includes(searchName)){
       filterUserCards[name]=cards[name]
     }
   })
  }
   console.log(filterUserCards);
  dispatch({
      type:SAVE_USER_GROUP_CARD,
      payload:{cards:filterUserCards}
    })
  }
}


export{
  showAddCardModal,
  hideAddCardModal,
  addOrEditCard,
  deleteCard,
  cloneCard,
  updateCurrentCardValue,
  showAddActionModal,
  hideAddActionModal,
  filterUserCards

}