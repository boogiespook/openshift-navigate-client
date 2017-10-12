import { GET_BUSINESS_REVIEW, UPDATE_BUSINESS_REVIEW } from '../actions/action_business_review';

export default function(state = {}, action) {

  // console.log('action type ' + action.type);
  // console.log('action.payload: ' + action.payload);

  switch (action.type) {
    case GET_BUSINESS_REVIEW:

      return action.payload.data;
    case UPDATE_BUSINESS_REVIEW:
      return action.payload.data;
    default:
      return state;
  }
}
