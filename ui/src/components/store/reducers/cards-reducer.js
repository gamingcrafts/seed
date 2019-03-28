import { 
  SHOW_ADD_CARD_MODAL,
  HIDE_ADD_CARD_MODAL,
  SAVE_USER_GROUP_CARD,
  EDIT_USER_GROUP_CARD,
  DELETE_USER_GROUP_CARD,
  CLONE_USER_GROUP_CARD,
  UPDATE_CURRENT_CARD,
  SHOW_ADD_ACTION_MODAL,
  HIDE_ADD_ACTION_MODAL,
  SAVE_FILTERED_CARDs
} from "../actions/types";
import update from 'react-addons-update';

const INIT_STATE = {
  cards:{},
  filteredCards:{},
  currentCard:{
    name:'',
    description:'',
    action:'',
    inUse:false
  },
  showAddCardModal:false,
  showAddActionModal:false
}

const  EMPTY_CARD = {
  name:'',
  description:'',
  action:'',
  inUse:false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SHOW_ADD_CARD_MODAL:{
      return update(state, {
        showAddCardModal: {
          $set:true
        }
    }) 
    }
    case HIDE_ADD_CARD_MODAL:{
      let emptyCard = {
        name:'',
        description:'',
        action:'',
        inUse:false
      };
      return update(state, {
        showAddCardModal: {
          $set:false
        },
        currentCard:{
          $set:emptyCard
        }
    }) 
    }
    case SAVE_USER_GROUP_CARD:{
      let updatedCards=action.payload.cards;
   
      return update(state, {

          filteredCards:{
            $set:updatedCards
          }
        ,
        showAddCardModal: {
          $set:false
        },
        showAddActionModal: {
          $set:false
        },
        currentCard:{
          $set:EMPTY_CARD
        }
    })
    }
    case SAVE_FILTERED_CARDs:{
      let updatedCards=action.payload.cards;
   
      return update(state, {

          filteredCards:{
            $set:updatedCards
          }
    })
    }
    case UPDATE_CURRENT_CARD:{
      let type = action.payload.type;
      let value=action.payload.value;
      return update(state, {
        currentCard:{
          $merge:{
            [type]:value
        }
      }
    })
    }
    case SHOW_ADD_ACTION_MODAL:{
      return update(state, {
        showAddActionModal: {
          $set:true
        },
        currentCard:{
          $set:action.payload.card
        }
    })
    }
    case HIDE_ADD_ACTION_MODAL:{
      
      return update(state, {
        showAddActionModal: {
          $set:false
        },
        currentCard:{
          $set:EMPTY_CARD
        }
    })
    }
    default:
      return update(state, {})
  }
}