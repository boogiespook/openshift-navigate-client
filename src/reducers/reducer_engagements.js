import { GET_ENGAGEMENTS, CREATE_ENGAGEMENT } from '../actions/action_engagements';

// State argument is not application state, only the state this
// reducer is responsible for
export default function(state = {}, action) {

  const { type, error } = action;

  if (error) {
    return {
      'error' :error
    };
  }

  switch (type) {
    case GET_ENGAGEMENTS:
      return action.payload.data;
    case CREATE_ENGAGEMENT:
      return { ...state, [action.payload.data.guid]: action.payload.data};
    default:
      return state;
  }
}



