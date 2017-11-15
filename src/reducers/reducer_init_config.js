import { GET_INIT_CONFIG } from '../actions/action_init';

export default function(state = {}, action) {

  console.log('In reducer ' + JSON.stringify(action));

  switch (action.type) {
    case GET_INIT_CONFIG:
      debugger;
      return action.payload;
    default:
      return state;
  }
}
