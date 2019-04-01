import {
  SHOW_ADD_CARD_MODAL,
  HIDE_ADD_CARD_MODAL,
  SAVE_USER_GROUP_CARD,
  // EDIT_USER_GROUP_CARD,
  // DELETE_USER_GROUP_CARD,
  CLONE_USER_GROUP_CARD,
  UPDATE_CURRENT_CARD,
  SHOW_ADD_ACTION_MODAL,
  HIDE_ADD_ACTION_MODAL,
  SHOW_EDIT_PAGE,
  HIDE_EDIT_PAGE,
  SHOW_DELETE_MODAL,
  HIDE_DELETE_MODAL,
  SHOW_ADD_CARD_TYPE_MODAL,
  HIDE_ADD_CARD_TYPE_MODAL,
  SET_NEW_CARD_TYPE
} from "../actions/types";

// import React from 'react';

import {addToast} from './toasts-actions';

const showAddCardModal = () => {
  return (dispatch, getState, http) => {
    dispatch({
      type: SHOW_ADD_CARD_MODAL,
    })
  }
}

const hideAddCardModal = () => {
  return (dispatch, getState, http) => {
    dispatch({
      type: HIDE_ADD_CARD_MODAL,
    })
  }
}

const updateCurrentCardValue = (updatedValue) => {
  return (dispatch, getState, http) => {
    dispatch({
      type: UPDATE_CURRENT_CARD,
      payload: updatedValue
    })
  }
}

const addOrEditCard = () => {
  return (dispatch, getState, http) => {
    let {
      currentCard,
      cards
    } = getState().CardsReducer;
    let cardName = currentCard.name;
    let message = 'Card '+cardName +' Saved';
    if (currentCard['created'] === undefined) {
      currentCard['created'] = new Date();
      message = 'UserGroupCard "'+cardName +'" Created.';
    }
    else{
    currentCard['modified'] = new Date();
    message = 'UserGroupCard "'+cardName +'" Updated.';
    }
    cards[cardName] = {
      ...currentCard
    };


    dispatch({
      type: SAVE_USER_GROUP_CARD,
      payload: {
        cards: cards
      }
    })
    
    dispatch(addToast({
      title: message,
      color: 'success'
    }))
  }
}

const saveCardAction = () => {
  return (dispatch, getState, http) => {
    let {
      currentCard,
      cards
    } = getState().CardsReducer;
    let cardName = currentCard.name;
    cards[cardName] = {
      ...currentCard
    };
    cards[cardName]['inUse']=true;

    dispatch({
      type: SAVE_USER_GROUP_CARD,
      payload: {
        cards: cards
      }
    })
    let message = 'Action added to '+cardName+'.';

    dispatch(addToast({
      title: message,
      color: 'success'
    }))
    //window.location.href = "https://www.optikpi.com";
  }
}



const cloneCard = () => {
  return (dispatch, getState, http) => {
    dispatch({
      type: CLONE_USER_GROUP_CARD,
      payload: undefined
    })
  }
}

const showAddActionModal = (cardName) => {
  return (dispatch, getState, http) => {
    let {
      cards
    } = getState().CardsReducer;
    dispatch({
      type: SHOW_ADD_ACTION_MODAL,
      payload: {
        card: cards[cardName]
      }
    })
  }
}

const hideAddActionModal = (cardName) => {
  return (dispatch, getState, http) => {
    dispatch({
      type: HIDE_ADD_ACTION_MODAL
    })
  }
}

const filterUserCards = (searchName) => {

  return (dispatch, getState, http) => {
    let {
      cards
    } = getState().CardsReducer;
    let filterUserCards = {}
    if (searchName === '') {
      filterUserCards = cards;
    } else {
      Object.keys(cards).forEach((name) => {

        if (name.includes(searchName)) {
          filterUserCards[name] = cards[name]
        }
      })
    }

    dispatch({
      type: SAVE_USER_GROUP_CARD,
      payload: {
        cards: filterUserCards
      }
    })
  }
}

const sortCardsByDate = (order) => {
  return (dispatch, getState, http) => {
    let {
      cards
    } = getState().CardsReducer;
    let cardsArray = [];

    Object.keys(cards).forEach((card) => {
      cardsArray.push(cards[card]);
    });

    let sortedCards;
    if (order === 'date-latest-to-oldest') {
      var date_dsc = (arr, dateProp) => {
        return arr.slice().sort(function (a, b) {
          return a[dateProp] > b[dateProp] ? -1 : 1;
        });
      }
      sortedCards = date_dsc(cardsArray, 'created')
    } else if (order === 'date-oldest-to-latest') {
      var date_asc = (arr, dateProp) => {
        return arr.slice().sort(function (a, b) {
          return a[dateProp] < b[dateProp] ? -1 : 1;
        });
      }
      sortedCards = date_asc(cardsArray, 'created')
    }
    let sortedCardsObject = {}
    sortedCards.forEach((card) => {
      sortedCardsObject[card.name] = card;
    })
    dispatch({
      type: SAVE_USER_GROUP_CARD,
      payload: {
        cards: sortedCardsObject
      }
    })
  }

}

const showEditPage=(cardName)=>{
  return (dispatch, getState, http) => {
      let { cards} = getState().CardsReducer;
      let current = cards[cardName];
      dispatch({
        type: SHOW_EDIT_PAGE,
        payload: {card:current}
      })
    }
}
  
  const hideEditPage=()=>{
    return (dispatch, getState, http) => {
      dispatch({
        type: HIDE_EDIT_PAGE
      })
    }
  }

const showDeleteModal=(cardName)=>{
  

  return (dispatch, getState, http) => {
    let { cards} = getState().CardsReducer;
    let current = cards[cardName];
    dispatch({
      type: SHOW_DELETE_MODAL,
      payload: {card:current}
    })
  }

}

const hideDeleteModal=()=>{

  return (dispatch, getState, http) => {
    dispatch({
      type: HIDE_DELETE_MODAL
    })
  }

}

const deleteCard=()=>{

  return (dispatch, getState, http) => {
    let { cards,currentCard} = getState().CardsReducer;
    delete cards[currentCard.name];
    dispatch({
      type: SAVE_USER_GROUP_CARD,
      payload: {
        cards:cards
      }
    })
    let message = currentCard.name+' deleted.'
    dispatch(addToast({
      title: message,
      color: 'success'
    }))
  }
}

const showAddCardTypeModal=()=>{
  return (dispatch, getState, http) => {
    dispatch({
      type: SHOW_ADD_CARD_TYPE_MODAL
    })
  }
}

const hideAddCardTypeModal=()=>{
  return (dispatch, getState, http) => {
    dispatch({
      type: HIDE_ADD_CARD_TYPE_MODAL
    })
  }
}

const selectNewCardType=(cardType)=>{
  return (dispatch, getState, http) => {
    dispatch({
      type: SET_NEW_CARD_TYPE,
      payload:{type:cardType}
    })
  }

}

export {
  showAddCardModal,
  hideAddCardModal,
  addOrEditCard,
  deleteCard,
  cloneCard,
  updateCurrentCardValue,
  showAddActionModal,
  hideAddActionModal,
  filterUserCards,
  saveCardAction,
  sortCardsByDate,
  showEditPage,
  hideEditPage,
  showDeleteModal,
  hideDeleteModal,
  showAddCardTypeModal,
  hideAddCardTypeModal,
  selectNewCardType
}