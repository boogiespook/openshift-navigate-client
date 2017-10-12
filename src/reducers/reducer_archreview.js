import { GET_ARCH_REVIEW, UPDATE_ARCH_REVIEW } from '../actions/action_archreview';

export default function(state = {}, action) {

  switch (action.type) {
    case GET_ARCH_REVIEW:
      return action.payload.data;
    case UPDATE_ARCH_REVIEW:
      return action.payload.data;
    default:
      return state;
  }
}
