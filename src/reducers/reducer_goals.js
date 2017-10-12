import { GET_BUSINESS_GOALS, SET_BUSINESS_GOALS } from '../actions/action_business_goals';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_BUSINESS_GOALS:
      console.log('reducer_goals GET_BUSINESS_GOALS action: ', action);
      console.log('reducer_goals GET_BUSINESS_GOALS state: ', state);
      // var newState = { ...state, 'goals': action.payload.data };
      // console.log('new state');
      // console.log(JSON.stringify(newState));
      // return newState;
      return action.payload.data.goals;
    case SET_BUSINESS_GOALS:
      console.log('reducer_goals SET_BUSINESS_GOALS action: ', action);
      console.log('reducer_goals SET_BUSINESS_GOALS state: ', state);
      //var newState = { ...state, 'goals': action.payload };
      console.log('new state');
      //console.log(JSON.stringify(newState));
      //return newState;
      let newState = action.payload.slice();
      console.log("newState: ", newState);
      console.log("state: ", state);

      return newState;
    default:
      return state;
  }

}



