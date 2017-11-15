import { GET_INIT_CONFIG } from '../actions/action_init';

export default function(state = {}, action) {

  switch (action.type) {
    case GET_INIT_CONFIG:
      debugger;
      return action.payload;
    default:
      return state;
  }
}
