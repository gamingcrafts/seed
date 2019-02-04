import { SAMPLE_GET_ALL_SUCCESS, SAMPLE_GET_ALL_FAILURE, SAMPLE_CREATE_SUCCESS, SAMPLE_CREATE_FAILURE ,SAMPLE_DELETE_SUCCESS} from "../actions/types";
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

    case SAMPLE_CREATE_SUCCESS:
      return update(state, {
        samples: { $push: [action.payload] }
      })
      case SAMPLE_DELETE_SUCCESS:{
        let updatedSamples = state.samples.filter(sample=>sample.id!==action.payload.id);
      return update(state, {
        samples: { $set: updatedSamples }
      })}
    case SAMPLE_CREATE_FAILURE:
      return update(state, {})

    default:
      return update(state, {})
  }
}