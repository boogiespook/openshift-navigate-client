import {GET_NEXT_STEPS} from "../actions/action_nextSteps";
import {CREATE_NEXT_STEPS} from "../actions/action_nextSteps";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_NEXT_STEPS: {
      console.log("Next Steps Reducer action payload: ", action.payload);
      return action.payload.data;
    }

    case CREATE_NEXT_STEPS: {

      console.log("Next Steps Reducer action payload: ", action.payload);
      return { ...state, [action.payload.data.id]: action.payload.data};
    }

    default:
      return state;
  }
}