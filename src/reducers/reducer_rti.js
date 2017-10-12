import { GET_RTI, CREATE_RTI } from '../actions/action_rti';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_RTI:
      return action.payload.data;
    case CREATE_RTI:
      return action.payload.data;
    default:
      return state;
  }
}



