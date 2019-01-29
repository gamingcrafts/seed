import { SAMPLE_GET_ALL_SUCCESS, SAMPLE_GET_ALL_FAILURE } from "../actions/types";
import update from 'react-addons-update';


const INIT_STATE = {
  loading: true,
  loaded: false,
  samples: [],
  sample: {}
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case SAMPLE_GET_ALL_SUCCESS:
      return update(state, {
        samples: { $set: action.payload },
        loading: { $set: false },
        loaded: { $set: false }
      })

    case SAMPLE_GET_ALL_FAILURE:
      return update(state, {
        loading: { $set: false },
        loaded: { $set: false }
      })

    default:
      return update(state, {})
  }
}