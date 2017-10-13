import { GET_MIND_MAP } from '../actions/action_mindmap';

export default function(state = {}, action) {

  switch (action.type) {
    case GET_MIND_MAP:
      return action.payload.data;
    default:
      return state;
  }
}
